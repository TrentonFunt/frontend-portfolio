import { useEffect, useState } from 'react'
import type { ThemeName } from '@/lib/terminal-constants'
import { applyGuiTheme, getGuiThemeNames, readGuiTheme } from '@/lib/gui-theme'

export function GuiThemePicker() {
  const [theme, setTheme] = useState<ThemeName>(() => readGuiTheme())

  useEffect(() => {
    applyGuiTheme(theme)
  }, [theme])

  const onChange = (next: ThemeName) => {
    setTheme(next)
  }

  return (
    <label className="hidden md:flex items-center gap-2 text-xs text-terminal-fg-muted font-mono">
      theme
      <select
        value={theme}
        onChange={(e) => onChange(e.target.value as ThemeName)}
        className="bg-terminal-bg border border-(--border-terminal) rounded px-2 py-1 text-terminal-fg text-xs focus:outline-none focus:border-terminal-prompt"
        aria-label="Color theme"
      >
        {getGuiThemeNames().map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </label>
  )
}
