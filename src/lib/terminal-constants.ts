export type ThemeName = 'default' | 'dracula' | 'monokai' | 'gruvbox' | 'latte'

export const THEMES: Record<ThemeName, Record<string, string>> = {
  default: {
    '--terminal-bg': '#0d1117',
    '--terminal-bg-alt': '#161b22',
    '--terminal-fg': '#e6edf3',
    '--terminal-fg-muted': '#8b949e',
    '--terminal-prompt': '#58a6ff',
    '--syntax-string': '#a5d6ff',
    '--syntax-function': '#d2a8ff',
    '--syntax-variable': '#79c0ff',
    '--syntax-error': '#f85149',
  },
  dracula: {
    '--terminal-bg': '#282a36',
    '--terminal-bg-alt': '#21222c',
    '--terminal-fg': '#f8f8f2',
    '--terminal-fg-muted': '#6272a4',
    '--terminal-prompt': '#bd93f9',
    '--syntax-string': '#f1fa8c',
    '--syntax-function': '#ff79c6',
    '--syntax-variable': '#8be9fd',
    '--syntax-error': '#ff5555',
  },
  monokai: {
    '--terminal-bg': '#272822',
    '--terminal-bg-alt': '#1e1f1c',
    '--terminal-fg': '#f8f8f2',
    '--terminal-fg-muted': '#75715e',
    '--terminal-prompt': '#a6e22e',
    '--syntax-string': '#e6db74',
    '--syntax-function': '#f92672',
    '--syntax-variable': '#66d9ef',
    '--syntax-error': '#f92672',
  },
  gruvbox: {
    '--terminal-bg': '#282828',
    '--terminal-bg-alt': '#1d2021',
    '--terminal-fg': '#ebdbb2',
    '--terminal-fg-muted': '#928374',
    '--terminal-prompt': '#b8bb26',
    '--syntax-string': '#fabd2f',
    '--syntax-function': '#fb4934',
    '--syntax-variable': '#83a598',
    '--syntax-error': '#fb4934',
  },
  latte: {
    '--terminal-bg': '#f5f0e8',
    '--terminal-bg-alt': '#ebe5dc',
    '--terminal-fg': '#4a4238',
    '--terminal-fg-muted': '#7c7264',
    '--terminal-prompt': '#8b5a3c',
    '--syntax-string': '#6b7c3f',
    '--syntax-function': '#9c4f5c',
    '--syntax-variable': '#5a7a8c',
    '--syntax-error': '#c5594a',
  },
}

export const BOOT_SEQUENCE = [
  { text: 'PORTFOLIO BIOS v2.0.26', delay: 0 },
  { text: 'Copyright (c) 2026 Developer Portfolio Systems', delay: 100 },
  { text: '', delay: 200 },
  { text: 'Initializing creative modules...', delay: 600 },
  { text: '  [OK] React 19 runtime loaded', delay: 800 },
  { text: '  [OK] TypeScript compiler ready', delay: 950 },
  { text: '  [OK] Tailwind CSS engine started', delay: 1100 },
  { text: '  [OK] Animation subsystem online', delay: 1250 },
  { text: '', delay: 1350 },
  { text: 'Loading portfolio data...', delay: 1500 },
  { text: '  → 4 projects indexed', delay: 1650 },
  { text: '  → Skills database connected', delay: 1800 },
  { text: '  → Contact endpoints ready', delay: 1950 },
  { text: '', delay: 2050 },
  { text: 'System ready. Welcome, visitor.', delay: 2200 },
]

export const TRAIN_ASCII = `
      ====        ________                ___________
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ |   |        =|___ ___|
   /     |  |   H  |  |     |   |         ||_| |_||
  |      |  |   H  |__--------------------| [___] |
  | ________|___H__/__|_____/[][]~\\_______|       |
  |/ |   |-----------I_____I [][] []  D   |=======|__
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__
 |/-=|___|=    ||    ||    ||    |_____/~\\___/
  \\_/      \\O=====O=====O=====O_/      \\_/
`

// Pre-generated confetti particles to avoid Math.random during render
export const CONFETTI_PARTICLES = Array.from({ length: 50 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  rotate: Math.random() * 720,
  duration: 2 + Math.random(),
  color: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181'][Math.floor(Math.random() * 5)],
}))
