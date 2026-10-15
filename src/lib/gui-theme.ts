import { THEMES, type ThemeName } from './terminal-constants'

const STORAGE_KEY = 'portfolio-gui-theme'

export function readGuiTheme(): ThemeName {
  try {
    const value = localStorage.getItem(STORAGE_KEY) as ThemeName | null
    if (value && value in THEMES) return value
  } catch {
    /* ignore */
  }
  return 'default'
}

export function applyGuiTheme(theme: ThemeName): void {
  const vars = THEMES[theme]
  Object.entries(vars).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
  })
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* ignore */
  }
}

export function getGuiThemeNames(): ThemeName[] {
  return Object.keys(THEMES) as ThemeName[]
}
