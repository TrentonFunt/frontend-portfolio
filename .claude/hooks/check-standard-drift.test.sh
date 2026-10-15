#!/usr/bin/env bash
# Fire / no-fire tests for check-standard-drift.sh (L3). Uses a local file:// URL rather than the
# network, so the tests are deterministic and run offline.
#
# Every pass-case asserts OUTPUT as well as exit status. Exit-code-only assertions on the pass cases
# were worthless: a mutant script reduced to nothing but `exit 0` satisfied eight of them, because 0
# is what the script produces by default. The graded fail shape (silent / warn / fail / skip) is the
# contract, and three of its four outcomes are exit 0 — so the exit code alone cannot distinguish
# them, and a checker that silently stopped comparing would have passed the suite.
set -uo pipefail

# Resolve the script under test as a SIBLING of this file, not via a fixed repo layout. This suite
# ships next to the script into consuming repos (.claude/hooks/), where the standard repo's
# scripts/ path does not exist — locating by layout made all 18 tests fail on arrival.
HERE="$(cd "$(dirname "$0")" && pwd)"
SCRIPT="$HERE/check-standard-drift.sh"
pass=0
fail=0
scratch=$(mktemp -d)
trap 'rm -rf "$scratch"' EXIT

out=""
status=0

# invoke <local-version> <published-version|__UNREACHABLE__|__UNSET__> [env-assignments...]
# Sets $status and $out. Each case gets its own REMOTE file so tests cannot inherit a stale body.
invoke() {
  local lv="$1" rv="$2"
  shift 2
  echo -n "$lv" > "$scratch/LOCAL"
  local url remote="$scratch/remote-$$-$pass-$fail"
  case "$rv" in
    __UNSET__) url="" ;;
    # A path that does not exist: curl actually runs and actually fails, which is the branch every
    # CI run takes today (private repo, no token yet). Passing an empty URL instead tests the
    # "env var not set" branch and leaves curl unexercised — the old suite did that twice and
    # labelled one of them "unreachable".
    __UNREACHABLE__) url="file://$scratch/definitely-not-here" ;;
    *) printf '%s' "$rv" > "$remote"; url="file://$remote" ;;
  esac
  out=$(env STANDARD_VERSION_URL="$url" "$@" bash "$SCRIPT" "$scratch/LOCAL" 2>&1)
  status=$?
}

check() { # description expected-status [substring-that-must-appear]
  local desc="$1" want="$2" needle="${3:-}"
  if [ "$status" != "$want" ]; then
    echo "FAIL - $desc (expected exit $want, got $status)"
    fail=$((fail + 1))
    return
  fi
  if [ -n "$needle" ] && ! printf '%s' "$out" | grep -q -- "$needle"; then
    echo "FAIL - $desc (exit $want correct, but output lacked '$needle'; got: $(printf '%s' "$out" | head -1))"
    fail=$((fail + 1))
    return
  fi
  echo "ok - $desc"
  pass=$((pass + 1))
}

check_silent() { # description — must exit 0 AND print nothing at all
  local desc="$1"
  if [ "$status" != 0 ]; then
    echo "FAIL - $desc (expected exit 0, got $status)"
    fail=$((fail + 1))
  elif [ -n "$out" ]; then
    echo "FAIL - $desc (expected NO output, got: $(printf '%s' "$out" | head -1))"
    fail=$((fail + 1))
  else
    echo "ok - $desc"
    pass=$((pass + 1))
  fi
}

# ── The graded fail shape, asserted on output so each outcome is distinguishable ──────────────
invoke 1.13 1.13; check_silent "in sync is silent"
invoke 1.12 1.13; check "1 behind warns but passes" 0 "Warning only at 1 behind"
invoke 1.11 1.13; check "2 behind fails (hits the cap)" 1 "2 versions behind (cap is 2)"
invoke 1.7 1.13; check "6 behind fails" 1 "6 versions behind"
invoke 1.14 1.13; check "ahead of published passes with a notice" 0 "is AHEAD of the published"
invoke 1.11 1.13 MAX_MINOR_DRIFT=3; check "raised cap lets 2 behind through" 0 "Warning only at 2 behind"

# ── Skip vs fail: "cannot reach it" and "reached it, got junk" must not collapse ──────────────
invoke 1.7 __UNSET__; check "no URL configured skips" 0 "STANDARD_VERSION_URL is not set"
invoke 1.7 __UNREACHABLE__; check "curl failure skips, does not fail" 0 "could not fetch"
# Opt-in strict mode: once a token exists, "cannot fetch" must stop reading as a pass — every
# consumer repo sat green for a month behind a fetch that never succeeded.
invoke 1.7 __UNREACHABLE__ DRIFT_REQUIRE_FETCH=1; check "require-fetch turns curl failure into a failure" 1 "DRIFT_REQUIRE_FETCH is on"
invoke 1.7 __UNREACHABLE__ DRIFT_REQUIRE_FETCH=true; check "require-fetch accepts 'true'" 1 "DRIFT_REQUIRE_FETCH is on"
invoke 1.7 __UNREACHABLE__ DRIFT_REQUIRE_FETCH=0; check "require-fetch=0 keeps the skip" 0 "could not fetch"
invoke 1.13 1.13 DRIFT_REQUIRE_FETCH=1; check_silent "require-fetch is silent when fetch works and in sync"
invoke 1.12 1.13 DRIFT_REQUIRE_FETCH=1; check "require-fetch does not change the graded outcomes" 0 "Warning only at 1 behind"
invoke 1.13 1.13 DRIFT_REQUIRE_FETCH=maybe; check "junk require-fetch value fails closed, like MAX_MINOR_DRIFT" 1 "DRIFT_REQUIRE_FETCH must be"
# Reachable-but-empty is a FAIL, not a skip: a truncated published VERSION reported as a network
# problem is how an unknown drift gets read as no drift.
invoke 1.13 ""; check "fetched-but-empty body fails closed" 1 "empty"

# A missing marker is a real failure: a repo that records nothing cannot be checked at all.
out=$(env STANDARD_VERSION_URL="" bash "$SCRIPT" "$scratch/DOES_NOT_EXIST" 2>&1); status=$?
check "missing STANDARD_VERSION file fails" 1 "not found"

# ── Malformed input must fail CLOSED ──────────────────────────────────────────────────────────
# `set -u` without `-e` makes an arithmetic error non-fatal, so anything reaching the comparison as a
# non-integer used to fall through to exit 0 — garbage served with HTTP 200 read as "no drift".
invoke 1.13 abc; check "non-numeric published version fails" 1 "not MAJOR.MINOR"
invoke 1.13 1.x; check "partly-numeric published version fails" 1 "not MAJOR.MINOR"
invoke 1.13 '<html>404</html>'; check "HTML body instead of a version fails" 1 "not MAJOR.MINOR"
invoke 1.13 1.13.1; check "three-component published version fails" 1 "not MAJOR.MINOR"
invoke 1.13 '1.13:junk'; check "trailing junk after a colon fails" 1 "not MAJOR.MINOR"
invoke oops 1.13; check "non-numeric LOCAL version fails" 1 "not MAJOR.MINOR"
invoke 1 1.13; check "local version with no minor fails" 1 "not MAJOR.MINOR"
# Leading zeros parse as octal in $(( )), which died with a raw bash error instead of a FAIL — and
# bash 3.2 and 5 surface it in different places, so local and CI disagreed.
invoke 1.08 1.09; check "leading-zero versions fail with a real message" 1 "not MAJOR.MINOR"
# An overlong digit string passed the old format check, then overflowed the comparison. The
# comparison error was non-fatal, so the major-bump check was skipped and the script exited 0.
invoke 1.13 99999999999999999999.0; check "overlong published major fails" 1 "not MAJOR.MINOR"
# CRLF is normal for a file edited on Windows and must not be treated as junk.
invoke 1.13 '1.13
'; check_silent "CRLF/newline in the published body is tolerated"

# ── Major versions must not be invisible ──────────────────────────────────────────────────────
# Only the minor was compared before, so 1.13 vs 2.0 read as "ahead" and 1.13 vs 2.13 as "in sync".
invoke 1.13 2.13; check "major bump fails even when minor matches" 1 "new major version"
invoke 1.13 2.0; check "major bump fails when minor is lower" 1 "new major version"
invoke 2.0 1.13; check "lower published major is treated as ahead" 0 "is AHEAD"

# ── The cap itself must not be a way to disable the check ─────────────────────────────────────
# A non-numeric cap left the `[ -ge ]` comparison erroring and non-fatal, so six versions behind
# exited 0. The one knob that can neuter this check was also the easiest to typo.
invoke 1.7 1.13 MAX_MINOR_DRIFT=x; check "non-numeric cap fails closed" 1 "MAX_MINOR_DRIFT"
# An empty cap resolves to the default via `${MAX_MINOR_DRIFT:-2}`, so it degrades to the STRICTEST
# setting rather than to no setting. Asserted explicitly because "unset variable in CI" is the most
# likely way this is reached, and falling back to a strict default is the safe direction.
invoke 1.7 1.13 MAX_MINOR_DRIFT=; check "empty cap falls back to the default of 2" 1 "6 versions behind (cap is 2)"
invoke 1.7 1.13 MAX_MINOR_DRIFT=0; check "zero cap fails closed" 1 "MAX_MINOR_DRIFT"
invoke 1.7 1.13 MAX_MINOR_DRIFT=99999; check "absurd cap fails closed" 1 "MAX_MINOR_DRIFT"

# ── The authenticated branch is the one CI will take the moment the secret exists ─────────────
# It had no coverage at all, and a prior version of it was silently broken (empty-array expansion
# under `set -u` in bash 3.2 made curl fail, sending every drift down the skip path).
invoke 1.12 1.13 STANDARD_TOKEN=fake-token; check "token branch still compares correctly" 0 "Warning only at 1 behind"
invoke 1.13 1.13 STANDARD_TOKEN=fake-token; check_silent "token branch is silent when in sync"

echo ""
if [ "$fail" -gt 0 ]; then
  echo "$fail test(s) failed, $pass passed"
  exit 1
fi
echo "all $pass drift-check tests passed"
