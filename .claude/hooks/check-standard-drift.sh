#!/usr/bin/env bash
# Consumer-side drift check. Copy this into a repo that follows the standard; it compares that
# repo's .claude/STANDARD_VERSION against the published one and reports how far behind it is.
#
# Fail shape is deliberate (A6 — a guard that blocks legitimate work more than it catches mistakes
# is a defect):
#   in sync            -> exit 0, silent
#   1 minor behind     -> exit 0 with a warning; someone else bumping a doc must not block your PR
#   >= 2 minors behind -> exit 1; advisory debt needs a cap or it accumulates forever (v1.10's
#                         Skip Ledger reasoning, applied to version drift)
#   cannot fetch       -> exit 0 with a notice; a missing token or offline runner is not a code
#                         defect, and failing closed here would block every PR in a repo that
#                         hasn't been given the secret yet
#   fetched but junk   -> exit 1; distinct from "cannot fetch" on purpose. A reachable endpoint
#                         serving something unparseable means drift is UNKNOWN, not zero.
#
# Usage: check-standard-drift.sh [path-to-STANDARD_VERSION]
# Env:   STANDARD_VERSION_URL  (required) raw URL of the standard's VERSION file
#        STANDARD_TOKEN        (optional) token, if the standard repo is private
#        MAX_MINOR_DRIFT       (optional, default 2) minors behind before this fails. Validated:
#                              a non-numeric value used to disable the gate silently, which made the
#                              one knob that can neuter this check also the easiest to typo.
#        DRIFT_REQUIRE_FETCH   (optional, default off) "1"/"true" turns "cannot fetch" from a skip
#                              into a failure. Off by default because an offline runner or a
#                              missing token is not a defect in the PR (A6); turn it on in CI once
#                              STANDARD_TOKEN exists, so a check that can never fetch stops passing
#                              green forever — every consumer repo did exactly that for a month.
set -uo pipefail

local_file="${1:-.claude/STANDARD_VERSION}"
url="${STANDARD_VERSION_URL:-}"
max_minor_drift="${MAX_MINOR_DRIFT:-2}"
require_fetch="${DRIFT_REQUIRE_FETCH:-}"

fail() {
  printf 'FAIL: %s\n' "$1"
  shift
  for line in "$@"; do printf '      %s\n' "$line"; done
  exit 1
}

notice() {
  printf 'NOTICE: %s\n' "$1"
  shift
  for line in "$@"; do printf '        %s\n' "$line"; done
}

# A version is exactly MAJOR.MINOR, each component 1-4 digits with no leading zeros. Every clause is
# load-bearing because this script runs under `set -u` WITHOUT `-e`: an arithmetic error is therefore
# non-fatal, execution falls through to the end, and the end used to be `exit 0`. So any value that
# reaches the comparison without being a plain integer is a silent pass, which is the single outcome
# this check must never produce. Rejected here rather than survived downstream:
#   non-numeric / extra components  — `abc`, `1.x`, `1.13.1`, an HTML error body served with HTTP 200
#   leading zeros                   — `$(( 09 ))` is an octal parse error, and bash 3.2 and 5 differ
#                                     on where it surfaces, so local and CI would disagree
#   overlong digit strings          — `99999999999999999999.0` overflows the comparison, skipping the
#                                     major-bump check entirely
valid_version() {
  printf '%s' "$1" | grep -Eq '^(0|[1-9][0-9]{0,3})\.(0|[1-9][0-9]{0,3})$'
}

require_version() { # label value origin
  valid_version "$2" && return 0
  fail "$1 version is not MAJOR.MINOR — got '$2' from $3." \
    "Each component must be 1-4 digits with no leading zeros." \
    "Failing closed: an unparseable version means drift is unknown, not zero."
}

case "$max_minor_drift" in
  "" | *[!0-9]*) fail "MAX_MINOR_DRIFT must be a positive integer — got '$max_minor_drift'." \
    "An unusable cap previously left the comparison non-fatal, so the check passed at any drift." ;;
esac
if [ "${#max_minor_drift}" -gt 3 ] || [ "$max_minor_drift" -lt 1 ]; then
  fail "MAX_MINOR_DRIFT must be between 1 and 999 — got '$max_minor_drift'."
fi

# Same fail-closed rule as MAX_MINOR_DRIFT: a typo in the one flag that hardens the check must not
# silently mean "off".
case "$require_fetch" in
  "" | 0 | false | no) require_fetch="" ;;
  1 | true | yes) require_fetch="1" ;;
  *) fail "DRIFT_REQUIRE_FETCH must be 1/true or 0/false — got '$require_fetch'." ;;
esac

if [ ! -f "$local_file" ]; then
  fail "$local_file not found." \
    "This repo does not record which version of the workflow standard it is synced to," \
    "so drift cannot be detected at all."
fi
local_version=$(tr -d '[:space:]' < "$local_file")
require_version "local" "$local_version" "$local_file"

if [ -z "$url" ]; then
  notice "STANDARD_VERSION_URL is not set — skipping drift check. Local version: $local_version"
  exit 0
fi

# Two explicit branches rather than an array of curl args: expanding an empty array under `set -u`
# is an unbound-variable error in bash 3.2 (still the default on macOS), which made curl fail
# silently and every drift land in the "cannot fetch" skip path — the check passing for the one
# reason it must never pass. Caught by the cap tests in check-standard-drift.test.sh (which ships
# alongside this file and must stay alongside it), not by reading the code.
#
# curl's exit status is captured separately from the body, because "could not reach it" and "reached
# it and got nothing" are different verdicts and collapsing them hides a truncated VERSION file
# behind a network-problem message. --max-filesize guards against a large body being served: the
# validation below is cheap per byte but there is no reason to read megabytes to learn it is junk.
if [ -n "${STANDARD_TOKEN:-}" ]; then
  remote_body=$(curl -fsSL --max-time 15 --max-filesize 64 \
    -H "Authorization: Bearer ${STANDARD_TOKEN}" "$url" 2>/dev/null)
  fetch_status=$?
else
  remote_body=$(curl -fsSL --max-time 15 --max-filesize 64 "$url" 2>/dev/null)
  fetch_status=$?
fi

if [ "$fetch_status" -ne 0 ]; then
  if [ -n "$require_fetch" ]; then
    fail "could not fetch the published standard version and DRIFT_REQUIRE_FETCH is on." \
      "Check STANDARD_VERSION_URL / STANDARD_TOKEN — a check that cannot fetch is not checking." \
      "Local version: $local_version"
  fi
  notice "could not fetch the published standard version (private repo without a token, or" \
    "offline). Skipping rather than failing — this is not a defect in your change." \
    "Set DRIFT_REQUIRE_FETCH=1 in CI once the token exists to make this a failure." \
    "Local version: $local_version"
  exit 0
fi

remote_version=$(printf '%s' "$remote_body" | tr -d '[:space:]')
if [ -z "$remote_version" ]; then
  fail "fetched $url successfully but it is empty." \
    "That is not a network problem, so it is not skipped: a published VERSION file that has been" \
    "truncated or replaced means drift is unknown."
fi
require_version "published" "$remote_version" "$url"

local_major=${local_version%%.*}
local_minor=${local_version#*.}
remote_major=${remote_version%%.*}
remote_minor=${remote_version#*.}

# Major first. Comparing only the minor reported 1.13 vs 2.0 as "ahead" and 1.13 vs 2.13 as "in
# sync" — a whole major bump was invisible. The standard has only ever been 1.x, which is exactly
# why this went unnoticed; the failure mode when it changes is a silent pass.
if [ "$remote_major" -gt "$local_major" ]; then
  fail "the published standard has moved to a new major version ($local_version -> $remote_version)." \
    "A major bump means the mechanics changed, not just the content. Re-run Part B for this" \
    "repo rather than editing $local_file to match."
fi

if [ "$remote_major" -lt "$local_major" ] ||
  { [ "$remote_major" -eq "$local_major" ] && [ "$remote_minor" -lt "$local_minor" ]; }; then
  notice "this repo ($local_version) is AHEAD of the published standard ($remote_version)." \
    "Expected while a standard change is in flight; publish it to resolve."
  exit 0
fi

drift=$((remote_minor - local_minor))
if [ "$drift" -eq 0 ]; then
  exit 0 # in sync: silent, so the check is invisible until it has something to say
fi

echo "Workflow standard drift: this repo is synced to $local_version, published is $remote_version"
echo "  ($drift version(s) behind)"

if [ "$drift" -ge "$max_minor_drift" ]; then
  echo ""
  fail "$drift versions behind (cap is $max_minor_drift). Re-run the standard's Part B sync" \
    "for this repo, then update $local_file. Deliberately a hard failure: an advisory" \
    "nobody is forced to act on is how six versions of drift went unnoticed before."
fi

echo "  Warning only at $drift behind. Schedule the sync before it reaches $max_minor_drift."
exit 0
