/** Physical backtick key (US/ISO) — more reliable than e.key across layouts. */
export function isBacktickToggleKey(e: KeyboardEvent): boolean {
  if (e.ctrlKey || e.altKey || e.metaKey) return false
  if (e.code === 'Backquote') return true
  return e.key === '`'
}
