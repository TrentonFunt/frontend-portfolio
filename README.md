# Frontend Developer Portfolio

> A CLI-themed developer portfolio that presents as a terminal interface. Type commands to explore, or switch to GUI mode for a traditional browsing experience.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0050?logo=framer&logoColor=white)

## 🎯 Live Demo

**[View Portfolio →](https://tiwalade-portfolio.vercel.app)** *(replace with your deployment URL)*

---

## ✨ Features

### Terminal Interface (CLI Mode)
- **Interactive command line** — Type `help` to see available commands
- **Auto-complete** — Tab completion for commands
- **Command history** — Arrow keys navigate previous commands
- **Multiple themes** — `theme dracula`, `theme monokai`, `theme nord`, etc.
- **Easter eggs** — Try `sudo hire me`, `sl`, or `rickroll`
- **Resume download** — `cat resume.pdf` downloads my CV

### GUI Mode
- **Smooth transitions** — Framer Motion animations throughout
- **Tilt cards** — Project cards respond to cursor movement
- **Typing animations** — Name types out on load with blinking cursor
- **Gradient accents** — Subtle color pops against the dark theme
- **Responsive design** — Works on all screen sizes

### Toggle Between Modes
- Press **backtick (`)** anywhere to switch modes
- Click the red traffic light or "Switch to GUI/CLI" buttons

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 18, TypeScript (strict mode) |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS v4, CSS custom properties |
| **Components** | shadcn/ui (Button, Card, Badge) |
| **Animations** | Framer Motion 12 |
| **Routing** | React Router 7 |

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) to view in browser.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # SiteLayout with header/footer
│   ├── ui/              # shadcn/ui components
│   ├── Terminal.tsx     # CLI terminal interface
│   ├── FadeInSection.tsx
│   ├── TiltCard.tsx
│   ├── MagneticButton.tsx
│   ├── Typewriter.tsx
│   └── CodeSnippet.tsx
├── routes/
│   ├── Home.tsx         # Main portfolio page (GUI)
│   ├── Project.tsx      # Individual project details
│   └── NotFound.tsx     # 404 page
├── lib/
│   ├── commands.ts      # Terminal command definitions
│   ├── projects.ts      # Project data
│   └── terminal-constants.ts
└── styles/
    └── globals.css      # Design tokens & theme
```

---

## 🎨 Terminal Commands

| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `about` | Learn about me |
| `projects` | List my work |
| `skills` | View technical skills |
| `contact` | Get my contact info |
| `neofetch` | System info (developer style) |
| `theme <name>` | Change terminal theme |
| `cat resume.pdf` | Download my resume |
| `clear` | Clear terminal |
| `gui` | Switch to GUI mode |

---

## 📱 Responsive Design

- **Mobile**: Single column layout, touch-friendly
- **Tablet**: Adaptive grid, optimized spacing
- **Desktop**: Full terminal experience with decorative elements

---

## ♿ Accessibility

- Keyboard navigation (Tab, Enter, Escape)
- ARIA live regions for terminal output
- Reduced motion support (`prefers-reduced-motion`)
- Semantic HTML structure
- Focus indicators on all interactive elements

---

## 📬 Contact

- **Email**: tiwatide23@gmail.com
- **GitHub**: [TrentonFunt](https://github.com/TrentonFunt)
- **LinkedIn**: [tiwalade-adegoke](https://www.linkedin.com/in/tiwalade-adegoke)

---

## 📄 License

MIT © Tiwalade Adegoke
