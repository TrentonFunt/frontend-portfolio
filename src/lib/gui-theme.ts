import {
  DEFAULT_THEME,
  isLightTheme,
  THEMES,
  THEME_CHANGE_EVENT,
  THEME_ORDER,
  type ThemeName,
} from './portfolio-themes'

const STORAGE_KEY = 'portfolio-gui-theme'
/** One-time: old site default was the theme id `default` (GitHub dark); site default is now latte. */
const LEGACY_GITHUB_DEFAULT_MIGRATION = 'portfolio-theme-latte-default-v1'

export { DEFAULT_THEME, type ThemeName }

export function readGuiTheme(): ThemeName {
  try {
    const value = localStorage.getItem(STORAGE_KEY) as ThemeName | null
    if (value && value in THEMES) {
      const migrated = localStorage.getItem(LEGACY_GITHUB_DEFAULT_MIGRATION)
      if (value === 'default' && !migrated) {
        localStorage.setItem(STORAGE_KEY, DEFAULT_THEME)
        localStorage.setItem(LEGACY_GITHUB_DEFAULT_MIGRATION, '1')
        return DEFAULT_THEME
      }
      return value
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_THEME
}

export function applyGuiTheme(theme: ThemeName, options?: { persist?: boolean }): void {
  const persist = options?.persist !== false
  const vars = THEMES[theme]
  const root = document.documentElement

  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })

  root.dataset.portfolioTheme = theme
  root.classList.toggle('portfolio-theme-light', isLightTheme(theme))

  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* ignore */
    }
  }

  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: theme }))
}

export function getGuiThemeNames(): ThemeName[] {
  return [...THEME_ORDER]
}

export function subscribeGuiTheme(onChange: (theme: ThemeName) => void): () => void {
  const handler = (event: Event) => {
    const detail = (event as CustomEvent<ThemeName>).detail
    if (detail && detail in THEMES) onChange(detail)
  }
  window.addEventListener(THEME_CHANGE_EVENT, handler)
  return () => window.removeEventListener(THEME_CHANGE_EVENT, handler)
}
