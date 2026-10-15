export const DEFAULT_THEME = 'latte' as const

export const LIGHT_THEME_NAMES = ['day', 'snow', 'parchment', 'dawn', 'latte'] as const

export const LIGHT_THEMES = new Set<string>(LIGHT_THEME_NAMES)

/** Five dark + five light */
export const DARK_THEMES = [
  'default',
  'nord',
  'tokyo-night',
  'dracula',
  'gruvbox',
] as const

/** Stable order for GUI picker + CLI help (dark, then light) */
export const THEME_ORDER = [...DARK_THEMES, ...LIGHT_THEME_NAMES] as const

export type ThemeName = (typeof THEME_ORDER)[number]

export function isLightTheme(theme: ThemeName): boolean {
  return (LIGHT_THEMES as ReadonlySet<string>).has(theme)
}

export const THEME_BLURBS: Record<ThemeName, string> = {
  default: 'GitHub-style dark',
  nord: 'Arctic blue-gray',
  'tokyo-night': 'Neon night city',
  dracula: 'Purple and pink',
  gruvbox: 'Retro earthy',
  day: 'Clean paper white',
  snow: 'Nord snow bright',
  parchment: 'Solarized light cream',
  dawn: 'Rosé Pine morning',
  latte: 'Warm café cream (site default)',
}

type ThemeVars = Record<string, string>

function mergeTheme(...layers: ThemeVars[]): ThemeVars {
  return Object.assign({}, ...layers)
}

function shadcnDark(opts: {
  background: string
  foreground: string
  card: string
  muted: string
  mutedForeground: string
  primary: string
  primaryForeground: string
  border: string
  input: string
  ring: string
}): ThemeVars {
  return {
    '--background': opts.background,
    '--foreground': opts.foreground,
    '--card': opts.card,
    '--card-foreground': opts.foreground,
    '--popover': opts.card,
    '--popover-foreground': opts.foreground,
    '--primary': opts.primary,
    '--primary-foreground': opts.primaryForeground,
    '--secondary': opts.card,
    '--secondary-foreground': opts.foreground,
    '--muted': opts.muted,
    '--muted-foreground': opts.mutedForeground,
    '--accent': opts.muted,
    '--accent-foreground': opts.foreground,
    '--destructive': '#f85149',
    '--border': opts.border,
    '--input': opts.input,
    '--ring': opts.ring,
    '--sidebar': opts.card,
    '--sidebar-foreground': opts.foreground,
    '--sidebar-primary': opts.primary,
    '--sidebar-primary-foreground': opts.primaryForeground,
    '--sidebar-accent': opts.muted,
    '--sidebar-accent-foreground': opts.foreground,
    '--sidebar-border': opts.border,
    '--sidebar-ring': opts.ring,
  }
}

function shadcnLight(opts: {
  background: string
  foreground: string
  card: string
  muted: string
  mutedForeground: string
  primary: string
  primaryForeground: string
  border: string
  input: string
  ring: string
}): ThemeVars {
  return shadcnDark(opts)
}

export const THEMES: Record<ThemeName, ThemeVars> = {
  default: mergeTheme(
    {
      '--terminal-bg': '#0d1117',
      '--terminal-bg-alt': '#161b22',
      '--terminal-fg': '#e6edf3',
      '--terminal-fg-muted': '#8b949e',
      '--terminal-prompt': '#58a6ff',
      '--terminal-cursor': '#79c0ff',
      '--terminal-selection': 'rgba(56, 139, 253, 0.4)',
      '--syntax-string': '#a5d6ff',
      '--syntax-function': '#d2a8ff',
      '--syntax-variable': '#79c0ff',
      '--syntax-error': '#f85149',
      '--border-terminal': 'rgba(48, 54, 61, 0.85)',
      '--portfolio-grid-line': 'rgba(48, 54, 61, 0.35)',
      '--shadow-glow': '0 0 20px rgba(88, 166, 255, 0.15)',
    },
    shadcnDark({
      background: '#0d1117',
      foreground: '#e6edf3',
      card: '#161b22',
      muted: '#21262d',
      mutedForeground: '#8b949e',
      primary: '#58a6ff',
      primaryForeground: '#0d1117',
      border: 'rgba(48, 54, 61, 0.9)',
      input: 'rgba(48, 54, 61, 0.9)',
      ring: '#58a6ff',
    }),
  ),
  dracula: mergeTheme(
    {
      '--terminal-bg': '#282a36',
      '--terminal-bg-alt': '#21222c',
      '--terminal-fg': '#f8f8f2',
      '--terminal-fg-muted': '#6272a4',
      '--terminal-prompt': '#bd93f9',
      '--terminal-cursor': '#8be9fd',
      '--terminal-selection': 'rgba(189, 147, 249, 0.35)',
      '--syntax-string': '#f1fa8c',
      '--syntax-function': '#ff79c6',
      '--syntax-variable': '#8be9fd',
      '--syntax-error': '#ff5555',
      '--border-terminal': 'rgba(98, 114, 164, 0.55)',
      '--portfolio-grid-line': 'rgba(98, 114, 164, 0.22)',
      '--shadow-glow': '0 0 20px rgba(189, 147, 249, 0.18)',
    },
    shadcnDark({
      background: '#282a36',
      foreground: '#f8f8f2',
      card: '#21222c',
      muted: '#343746',
      mutedForeground: '#6272a4',
      primary: '#bd93f9',
      primaryForeground: '#282a36',
      border: 'rgba(98, 114, 164, 0.5)',
      input: 'rgba(98, 114, 164, 0.45)',
      ring: '#bd93f9',
    }),
  ),
  gruvbox: mergeTheme(
    {
      '--terminal-bg': '#282828',
      '--terminal-bg-alt': '#1d2021',
      '--terminal-fg': '#ebdbb2',
      '--terminal-fg-muted': '#928374',
      '--terminal-prompt': '#b8bb26',
      '--terminal-cursor': '#83a598',
      '--terminal-selection': 'rgba(184, 187, 38, 0.22)',
      '--syntax-string': '#fabd2f',
      '--syntax-function': '#fb4934',
      '--syntax-variable': '#83a598',
      '--syntax-error': '#fb4934',
      '--border-terminal': 'rgba(146, 131, 116, 0.55)',
      '--portfolio-grid-line': 'rgba(146, 131, 116, 0.28)',
      '--shadow-glow': '0 0 20px rgba(184, 187, 38, 0.12)',
    },
    shadcnDark({
      background: '#282828',
      foreground: '#ebdbb2',
      card: '#1d2021',
      muted: '#3c3836',
      mutedForeground: '#928374',
      primary: '#b8bb26',
      primaryForeground: '#1d2021',
      border: 'rgba(146, 131, 116, 0.55)',
      input: 'rgba(146, 131, 116, 0.5)',
      ring: '#b8bb26',
    }),
  ),
  latte: mergeTheme(
    {
      '--terminal-bg': '#f5f0e8',
      '--terminal-bg-alt': '#ebe5dc',
      '--terminal-fg': '#4a4238',
      '--terminal-fg-muted': '#7c7264',
      '--terminal-prompt': '#8b5a3c',
      '--terminal-cursor': '#5a7a8c',
      '--terminal-selection': 'rgba(139, 90, 60, 0.2)',
      '--syntax-string': '#6b7c3f',
      '--syntax-function': '#9c4f5c',
      '--syntax-variable': '#5a7a8c',
      '--syntax-error': '#c5594a',
      '--border-terminal': 'rgba(124, 114, 100, 0.45)',
      '--portfolio-grid-line': 'rgba(124, 114, 100, 0.2)',
      '--shadow-glow': '0 0 20px rgba(139, 90, 60, 0.12)',
    },
    shadcnLight({
      background: '#f5f0e8',
      foreground: '#4a4238',
      card: '#ebe5dc',
      muted: '#e3ddd3',
      mutedForeground: '#7c7264',
      primary: '#8b5a3c',
      primaryForeground: '#f5f0e8',
      border: 'rgba(124, 114, 100, 0.35)',
      input: 'rgba(124, 114, 100, 0.35)',
      ring: '#8b5a3c',
    }),
  ),
  nord: mergeTheme(
    {
      '--terminal-bg': '#2e3440',
      '--terminal-bg-alt': '#3b4252',
      '--terminal-fg': '#eceff4',
      '--terminal-fg-muted': '#616e88',
      '--terminal-prompt': '#88c0d0',
      '--terminal-cursor': '#8fbcbb',
      '--terminal-selection': 'rgba(136, 192, 208, 0.28)',
      '--syntax-string': '#a3be8c',
      '--syntax-function': '#81a1c1',
      '--syntax-variable': '#88c0d0',
      '--syntax-error': '#bf616a',
      '--border-terminal': 'rgba(97, 110, 136, 0.55)',
      '--portfolio-grid-line': 'rgba(97, 110, 136, 0.25)',
      '--shadow-glow': '0 0 20px rgba(136, 192, 208, 0.14)',
    },
    shadcnDark({
      background: '#2e3440',
      foreground: '#eceff4',
      card: '#3b4252',
      muted: '#434c5e',
      mutedForeground: '#616e88',
      primary: '#88c0d0',
      primaryForeground: '#2e3440',
      border: 'rgba(97, 110, 136, 0.55)',
      input: 'rgba(97, 110, 136, 0.5)',
      ring: '#88c0d0',
    }),
  ),
  'tokyo-night': mergeTheme(
    {
      '--terminal-bg': '#1a1b26',
      '--terminal-bg-alt': '#16161e',
      '--terminal-fg': '#c0caf5',
      '--terminal-fg-muted': '#565f89',
      '--terminal-prompt': '#7aa2f7',
      '--terminal-cursor': '#7dcfff',
      '--terminal-selection': 'rgba(122, 162, 247, 0.28)',
      '--syntax-string': '#9ece6a',
      '--syntax-function': '#bb9af7',
      '--syntax-variable': '#7dcfff',
      '--syntax-error': '#f7768e',
      '--border-terminal': 'rgba(86, 95, 137, 0.55)',
      '--portfolio-grid-line': 'rgba(86, 95, 137, 0.22)',
      '--shadow-glow': '0 0 20px rgba(122, 162, 247, 0.16)',
    },
    shadcnDark({
      background: '#1a1b26',
      foreground: '#c0caf5',
      card: '#16161e',
      muted: '#24283b',
      mutedForeground: '#565f89',
      primary: '#7aa2f7',
      primaryForeground: '#1a1b26',
      border: 'rgba(86, 95, 137, 0.55)',
      input: 'rgba(86, 95, 137, 0.5)',
      ring: '#7aa2f7',
    }),
  ),
  day: mergeTheme(
    {
      '--terminal-bg': '#ffffff',
      '--terminal-bg-alt': '#f6f8fa',
      '--terminal-fg': '#1f2328',
      '--terminal-fg-muted': '#656d76',
      '--terminal-prompt': '#0969da',
      '--terminal-cursor': '#0550ae',
      '--terminal-selection': 'rgba(9, 105, 218, 0.2)',
      '--syntax-string': '#0a3069',
      '--syntax-function': '#8250df',
      '--syntax-variable': '#0550ae',
      '--syntax-error': '#cf222e',
      '--border-terminal': 'rgba(208, 215, 222, 0.9)',
      '--portfolio-grid-line': 'rgba(208, 215, 222, 0.65)',
      '--shadow-glow': '0 0 20px rgba(9, 105, 218, 0.1)',
    },
    shadcnLight({
      background: '#ffffff',
      foreground: '#1f2328',
      card: '#f6f8fa',
      muted: '#eef1f4',
      mutedForeground: '#656d76',
      primary: '#0969da',
      primaryForeground: '#ffffff',
      border: 'rgba(208, 215, 222, 0.95)',
      input: 'rgba(208, 215, 222, 0.95)',
      ring: '#0969da',
    }),
  ),
  snow: mergeTheme(
    {
      '--terminal-bg': '#eceff4',
      '--terminal-bg-alt': '#e5e9f0',
      '--terminal-fg': '#2e3440',
      '--terminal-fg-muted': '#4c566a',
      '--terminal-prompt': '#5e81ac',
      '--terminal-cursor': '#88c0d0',
      '--terminal-selection': 'rgba(94, 129, 172, 0.22)',
      '--syntax-string': '#a3be8c',
      '--syntax-function': '#b48ead',
      '--syntax-variable': '#5e81ac',
      '--syntax-error': '#bf616a',
      '--border-terminal': 'rgba(76, 86, 106, 0.35)',
      '--portfolio-grid-line': 'rgba(76, 86, 106, 0.18)',
      '--shadow-glow': '0 0 20px rgba(136, 192, 208, 0.12)',
    },
    shadcnLight({
      background: '#eceff4',
      foreground: '#2e3440',
      card: '#e5e9f0',
      muted: '#d8dee9',
      mutedForeground: '#4c566a',
      primary: '#5e81ac',
      primaryForeground: '#eceff4',
      border: 'rgba(76, 86, 106, 0.3)',
      input: 'rgba(76, 86, 106, 0.28)',
      ring: '#5e81ac',
    }),
  ),
  parchment: mergeTheme(
    {
      '--terminal-bg': '#fdf6e3',
      '--terminal-bg-alt': '#eee8d5',
      '--terminal-fg': '#586e75',
      '--terminal-fg-muted': '#839496',
      '--terminal-prompt': '#268bd2',
      '--terminal-cursor': '#2aa198',
      '--terminal-selection': 'rgba(38, 139, 210, 0.18)',
      '--syntax-string': '#2aa198',
      '--syntax-function': '#d33682',
      '--syntax-variable': '#b58900',
      '--syntax-error': '#dc322f',
      '--border-terminal': 'rgba(101, 123, 131, 0.4)',
      '--portfolio-grid-line': 'rgba(101, 123, 131, 0.22)',
      '--shadow-glow': '0 0 20px rgba(38, 139, 210, 0.1)',
    },
    shadcnLight({
      background: '#fdf6e3',
      foreground: '#586e75',
      card: '#eee8d5',
      muted: '#e4ddc8',
      mutedForeground: '#839496',
      primary: '#268bd2',
      primaryForeground: '#fdf6e3',
      border: 'rgba(101, 123, 131, 0.35)',
      input: 'rgba(101, 123, 131, 0.32)',
      ring: '#268bd2',
    }),
  ),
  dawn: mergeTheme(
    {
      '--terminal-bg': '#faf4ed',
      '--terminal-bg-alt': '#f2e9e1',
      '--terminal-fg': '#575279',
      '--terminal-fg-muted': '#797593',
      '--terminal-prompt': '#286983',
      '--terminal-cursor': '#56949f',
      '--terminal-selection': 'rgba(40, 105, 131, 0.18)',
      '--syntax-string': '#56949f',
      '--syntax-function': '#907aa9',
      '--syntax-variable': '#286983',
      '--syntax-error': '#b4637a',
      '--border-terminal': 'rgba(121, 117, 147, 0.38)',
      '--portfolio-grid-line': 'rgba(121, 117, 147, 0.2)',
      '--shadow-glow': '0 0 20px rgba(40, 105, 131, 0.1)',
    },
    shadcnLight({
      background: '#faf4ed',
      foreground: '#575279',
      card: '#f2e9e1',
      muted: '#ebe3da',
      mutedForeground: '#797593',
      primary: '#286983',
      primaryForeground: '#faf4ed',
      border: 'rgba(121, 117, 147, 0.32)',
      input: 'rgba(121, 117, 147, 0.3)',
      ring: '#286983',
    }),
  ),
}

export const THEME_CHANGE_EVENT = 'portfolio-theme-change'
