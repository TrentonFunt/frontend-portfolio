export {
  DEFAULT_THEME,
  THEMES,
  type ThemeName,
} from './portfolio-themes'

export const BOOT_SEQUENCE = [
  { text: 'PORTFOLIO BIOS v2.0.26', delay: 0 },
  { text: 'Copyright (c) 2026 Fullstack Engineer Portfolio Systems', delay: 100 },
  { text: '', delay: 200 },
  { text: 'Initializing creative modules...', delay: 600 },
  { text: '  [OK] React 19 runtime loaded', delay: 800 },
  { text: '  [OK] TypeScript compiler ready', delay: 950 },
  { text: '  [OK] Tailwind CSS engine started', delay: 1100 },
  { text: '  [OK] Animation subsystem online', delay: 1250 },
  { text: '', delay: 1350 },
  { text: 'Loading portfolio data...', delay: 1500 },
  { text: '  → 11 projects indexed (frontend · fullstack · backend)', delay: 1650 },
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
