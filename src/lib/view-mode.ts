const STORAGE_KEY = 'portfolio-view-mode'

export type ViewMode = 'cli' | 'gui'

export function readStoredViewMode(): ViewMode | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value === 'cli' || value === 'gui') return value
  } catch {
    /* private mode */
  }
  return null
}

export function writeStoredViewMode(mode: ViewMode): void {
  try {
    localStorage.setItem(STORAGE_KEY, mode)
  } catch {
    /* ignore */
  }
}

/** CLI when true. Default GUI; project routes and ?mode= override. */
export function resolveInitialTerminalMode(pathname: string, search: string): boolean {
  const params = new URLSearchParams(search)
  const mode = params.get('mode')
  if (mode === 'cli') return true
  if (mode === 'gui') return false
  if (pathname.startsWith('/projects/')) return false

  const stored = readStoredViewMode()
  if (stored === 'cli') return true
  if (stored === 'gui') return false

  return false
}
