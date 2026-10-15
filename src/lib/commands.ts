import {
  formatExperienceTerminal,
  profile,
  summaryAbout,
} from './portfolio-content'
import { getAllProjects, type Project } from './projects'

export interface CommandOutput {
  type: 'text' | 'html' | 'error' | 'clear' | 'navigate' | 'download' | 'confetti' | 'theme' | 'animation'
  content: string
  navigateTo?: string
  theme?: string
  animationType?: 'sl' | 'rickroll' | 'matrix'
}

export interface Command {
  name: string
  description: string
  usage?: string
  execute: (args: string[]) => CommandOutput | CommandOutput[]
}

function formatProjectList(projects: Project[]): string {
  const lines = projects.map((p) => {
    const name = p.slug.padEnd(20)
    const year = String(p.year).padEnd(6)
    return `  ${name} ${year} ${p.shortDescription}`
  })
  return ['', 'NAME                 YEAR   DESCRIPTION', ...lines, ''].join('\n')
}

function formatProjectDetail(project: Project): string {
  return [
    '',
    `# ${project.title}`,
    '',
    project.description,
    '',
    `Year: ${project.year}`,
    `Tech: ${project.technologies.join(', ')}`,
    project.url ? `URL:  ${project.url}` : '',
    '',
  ]
    .filter(Boolean)
    .join('\n')
}

export const commands: Command[] = [
  {
    name: 'help',
    description: 'Show available commands',
    execute: () => {
      const lines = commands
        .filter((cmd) => !cmd.name.startsWith('sudo'))
        .map((cmd) => {
          const name = cmd.name.padEnd(16)
          return `  ${name} ${cmd.description}`
        })
      return {
        type: 'text',
        content: [
          '',
          'Available commands:',
          '',
          ...lines,
          '',
          'Tips:',
          '  - Use Tab for auto-complete',
          '  - Use ↑/↓ to navigate history',
          '  - Press ` (backtick) to toggle GUI mode',
          '',
        ].join('\n'),
      }
    },
  },
  {
    name: 'projects',
    description: 'List all projects',
    usage: 'projects [slug]',
    execute: (args) => {
      const projects = getAllProjects()

      if (args.length > 0) {
        const slug = args[0]
        const project = projects.find((p) => p.slug === slug)
        if (project) {
          return { type: 'text', content: formatProjectDetail(project) }
        }
        return {
          type: 'error',
          content: `Project not found: ${slug}\nRun 'projects' to see available projects.`,
        }
      }

      return { type: 'text', content: formatProjectList(projects) }
    },
  },
  {
    name: 'about',
    description: 'Learn more about me',
    execute: () => ({
      type: 'text',
      content: [
        '',
        `# ${profile.name}`,
        '',
        summaryAbout,
        '',
        `Status: ${profile.availability}`,
        '',
        "Run 'experience' for work history, 'projects' for builds, 'contact' to reach out.",
        '',
      ].join('\n'),
    }),
  },
  {
    name: 'experience',
    description: 'Work history and highlights',
    execute: () => ({
      type: 'text',
      content: ['', '# Experience', '', formatExperienceTerminal(), ''].join('\n'),
    }),
  },
  {
    name: 'contact',
    description: 'Get in touch',
    execute: () => ({
      type: 'text',
      content: [
        '',
        '# Contact',
        '',
        `  Email:    ${profile.email}`,
        '  GitHub:   github.com/TrentonFunt',
        '  LinkedIn: linkedin.com/in/tiwalade-adegoke',
        `  Location: ${profile.location} (${profile.availability})`,
        '',
        "Feel free to reach out, I'd love to hear from you!",
        '',
      ].join('\n'),
    }),
  },
  {
    name: 'skills',
    description: 'List technical skills',
    execute: () => ({
      type: 'text',
      content: [
        '',
        '# Technical Skills',
        '',
        '  Frontend     React.js, Next.js, TypeScript, Tailwind CSS, Ant Design, GSAP',
        '  Backend      C# ASP.NET Core, EF Core, Node.js, PHP (Laravel), PostgreSQL, Redis',
        '  Architecture REST APIs, SOLID, microservices patterns, JWT, RBAC, MFA',
        '  State        Redux Toolkit, Zustand, TanStack Query',
        '  Tools        Git, GitHub Actions, Docker, Sentry, Firebase, Figma, Vercel, Vite',
        '  Testing      Jest, Vitest, RTL, Cypress, NUnit, xUnit',
        '',
        '  Concepts     Performance, Accessibility, Secure auth flows, CI quality gates',
        '',
      ].join('\n'),
    }),
  },
  {
    name: 'clear',
    description: 'Clear the terminal',
    execute: () => ({ type: 'clear', content: '' }),
  },
  {
    name: 'echo',
    description: 'Print text to the terminal',
    usage: 'echo [text]',
    execute: (args) => ({
      type: 'text',
      content: args.join(' '),
    }),
  },
  {
    name: 'whoami',
    description: 'Display current user',
    execute: () => ({
      type: 'text',
      content: 'visitor',
    }),
  },
  {
    name: 'date',
    description: 'Display current date',
    execute: () => ({
      type: 'text',
      content: new Date().toString(),
    }),
  },
  {
    name: 'pwd',
    description: 'Print working directory',
    execute: () => ({
      type: 'text',
      content: '/home/visitor/portfolio',
    }),
  },
  {
    name: 'ls',
    description: 'List directory contents',
    execute: () => ({
      type: 'text',
      content: [
        '',
        'drwxr-xr-x  about.md',
        '-rw-r--r--  experience.md',
        'drwxr-xr-x  projects/',
        '-rw-r--r--  resume.pdf',
        'drwxr-xr-x  contact.md',
        '',
      ].join('\n'),
    }),
  },
  {
    name: 'cat',
    description: 'Display file contents',
    usage: 'cat [filename]',
    execute: (args) => {
      if (args.length === 0) {
        return { type: 'error', content: 'Usage: cat [filename]' }
      }

      const filename = args[0].toLowerCase()

      if (filename === 'resume.pdf' || filename === './resume.pdf') {
        return {
          type: 'download',
          content: 'Downloading Tiwalade-Adegoke-Resume.pdf...',
        }
      }

      if (filename === 'about.md' || filename === './about.md') {
        return commands.find((c) => c.name === 'about')!.execute([])
      }

      if (filename === 'experience.md' || filename === './experience.md') {
        return commands.find((c) => c.name === 'experience')!.execute([])
      }

      if (filename === 'contact.md' || filename === './contact.md') {
        return commands.find((c) => c.name === 'contact')!.execute([])
      }

      return { type: 'error', content: `cat: ${args[0]}: No such file or directory` }
    },
  },
  {
    name: 'cd',
    description: 'Change directory',
    usage: 'cd [directory]',
    execute: (args) => {
      if (args.length === 0 || args[0] === '~' || args[0] === '/') {
        return { type: 'text', content: '' }
      }

      if (args[0] === 'projects' || args[0] === './projects') {
        return { type: 'navigate', content: 'Navigating to projects...', navigateTo: '/#projects' }
      }

      return { type: 'error', content: `cd: ${args[0]}: No such directory` }
    },
  },
  {
    name: 'open',
    description: 'Open a project or link',
    usage: 'open [project-slug]',
    execute: (args) => {
      if (args.length === 0) {
        return { type: 'error', content: 'Usage: open [project-slug]' }
      }

      const projects = getAllProjects()
      const project = projects.find((p) => p.slug === args[0])

      if (project) {
        return {
          type: 'navigate',
          content: `Opening ${project.title}...`,
          navigateTo: `/projects/${project.slug}`,
        }
      }

      return { type: 'error', content: `Project not found: ${args[0]}` }
    },
  },
  {
    name: 'sudo',
    description: 'Execute with elevated privileges',
    execute: (args) => {
      const subcommand = args.join(' ').toLowerCase()

      if (subcommand === 'hire me' || subcommand === 'hire-me') {
        return {
          type: 'confetti',
          content: [
            '',
            '🎉 Congratulations! You found the easter egg!',
            '',
            "I'm always open to exciting opportunities.",
            "Let's chat: hello@example.com",
            '',
          ].join('\n'),
        }
      }

      if (subcommand.includes('rm -rf')) {
        return {
          type: 'text',
          content: [
            '',
            '😱 Nice try! But this portfolio is read-only.',
            '',
            "If you're looking to hire someone who won't accidentally",
            "delete production, I might be your person.",
            '',
          ].join('\n'),
        }
      }

      return { type: 'error', content: 'Permission denied. Nice try though! 😉' }
    },
  },
  {
    name: 'history',
    description: 'Show command history',
    execute: () => ({
      type: 'text',
      content: 'Use ↑/↓ arrow keys to navigate through command history.',
    }),
  },
  {
    name: 'theme',
    description: 'Change terminal theme',
    usage: 'theme [dracula|monokai|gruvbox|latte|default]',
    execute: (args) => {
      const validThemes = ['dracula', 'monokai', 'gruvbox', 'latte', 'default']
      
      if (args.length === 0) {
        return {
          type: 'text',
          content: [
            '',
            'Available themes:',
            '  dracula   - Purple and pink hues',
            '  monokai   - Classic warm tones',
            '  gruvbox   - Retro earthy colors',
            '  latte     - Light cream theme',
            '  default   - Original terminal theme',
            '',
            'Usage: theme [name]',
            '',
          ].join('\n'),
        }
      }

      const themeName = args[0].toLowerCase()
      
      if (!validThemes.includes(themeName)) {
        return {
          type: 'error',
          content: `Unknown theme: ${themeName}\nAvailable: ${validThemes.join(', ')}`,
        }
      }

      return {
        type: 'theme',
        content: `Theme changed to ${themeName}`,
        theme: themeName,
      }
    },
  },
  {
    name: 'neofetch',
    description: 'Display system info',
    execute: () => ({
      type: 'text',
      content: [
        '',
        '        .--.         tiwalade@portfolio',
        '       |o_o |        -----------------',
        '       |:_/ |        Name: Tiwalade Adegoke',
        '      //   \\ \\       Role: Junior Frontend Developer',
        '     (|     | )      Stack: React + TypeScript',
        '    /\'\\_   _/`\\      State: Redux, Zustand, TanStack Query',
        '    \\___)=(___/      Style: Tailwind CSS',
        '                     Tools: Git, Firebase, Vercel',
        '                     Location: Nigeria',
        '                     Status: Open to opportunities',
        '',
        '    React • TypeScript • Tailwind • Redux',
        '',
      ].join('\n'),
    }),
  },
  {
    name: 'sl',
    description: 'Steam locomotive',
    execute: () => ({
      type: 'animation',
      content: '',
      animationType: 'sl',
    }),
  },
  {
    name: 'rickroll',
    description: '???',
    execute: () => ({
      type: 'animation',
      content: '',
      animationType: 'rickroll',
    }),
  },
  {
    name: 'exit',
    description: 'Exit terminal mode',
    execute: () => ({
      type: 'navigate',
      content: 'Switching to GUI mode...',
      navigateTo: 'gui',
    }),
  },
  {
    name: 'banner',
    description: 'Display welcome banner',
    execute: () => ({
      type: 'text',
      content: [
        '',
        '╔════════════════════════════════════════════════════╗',
        '║                                                    ║',
        '║     ████████╗██╗██╗    ██╗ █████╗ ██╗      █████╗ ║',
        '║     ╚══██╔══╝██║██║    ██║██╔══██╗██║     ██╔══██╗║',
        '║        ██║   ██║██║ █╗ ██║███████║██║     ███████║║',
        '║        ██║   ██║██║███╗██║██╔══██║██║     ██╔══██║║',
        '║        ██║   ██║╚███╔███╔╝██║  ██║███████╗██║  ██║║',
        '║        ╚═╝   ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝║',
        '║                                                    ║',
        '║             Frontend Developer Portfolio           ║',
        '║            React • TypeScript • Tailwind           ║',
        '║                                                    ║',
        '╚════════════════════════════════════════════════════╝',
        '',
        '  Type "help" to see available commands',
        '',
      ].join('\n'),
    }),
  },
  {
    name: 'weather',
    description: 'Check the weather (spoiler: always coding)',
    execute: () => ({
      type: 'text',
      content: [
        '',
        '🌤️  Current Conditions',
        '   ━━━━━━━━━━━━━━━━━',
        '',
        '   Location:    Developer\'s Desk',
        '   Temperature: 72°F (Perfect for coding)',
        '   Conditions:  100% chance of bug fixes',
        '   Humidity:    Coffee at optimal levels',
        '   Wind:        Fans running smoothly',
        '',
        '   Forecast: Continuous integration expected',
        '',
      ].join('\n'),
    }),
  },
  {
    name: 'fortune',
    description: 'Get a random developer quote',
    execute: () => {
      const fortunes = [
        '"Code is like humor. When you have to explain it, it\'s bad." – Cory House',
        '"First, solve the problem. Then, write the code." – John Johnson',
        '"Experience is the name everyone gives to their mistakes." – Oscar Wilde',
        '"In order to be irreplaceable, one must always be different." – Coco Chanel',
        '"Java is to JavaScript what car is to carpet." – Chris Heilmann',
        '"Before software can be reusable, it first has to be usable." – Ralph Johnson',
        '"Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away." – Antoine de Saint-Exupéry',
        '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." – Martin Fowler'
      ]
      const random = fortunes[Math.floor(Math.random() * fortunes.length)]
      return {
        type: 'text',
        content: `\n${random}\n`,
      }
    },
  },
  {
    name: 'ping',
    description: 'Ping a server',
    usage: 'ping [hostname]',
    execute: (args) => {
      const host = args[0] || 'localhost'
      return {
        type: 'text',
        content: [
          '',
          `PING ${host} (127.0.0.1): 56 data bytes`,
          `64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms`,
          `64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.037 ms`,
          `64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.041 ms`,
          '',
          `--- ${host} ping statistics ---`,
          `3 packets transmitted, 3 packets received, 0.0% packet loss`,
          '',
        ].join('\n'),
      }
    },
  },
  {
    name: 'tree',
    description: 'Display directory tree',
    execute: () => ({
      type: 'text',
      content: [
        '',
        '~/portfolio',
        '├── about.md',
        '├── contact.md',
        '├── resume.pdf',
        '└── projects/',
        '    ├── eanvest/',
        '    ├── gooeyspot/',
        '    ├── gbese/',
        '    ├── multilearn/',
        '    ├── stack-hero/',
        '    └── role-rocket/',
        '',
      ].join('\n'),
    }),
  },
  {
    name: 'cowsay',
    description: 'Make a cow say something',
    usage: 'cowsay [message]',
    execute: (args) => {
      const message = args.join(' ') || 'Hire me!'
      const length = message.length + 2
      const border = '-'.repeat(length)
      
      return {
        type: 'text',
        content: [
          '',
          ` ${border}`,
          `< ${message} >`,
          ` ${border}`,
          '        \\   ^__^',
          '         \\  (oo)\\_______',
          '            (__)\\       )\\/\\',
          '                ||----w |',
          '                ||     ||',
          '',
        ].join('\n'),
      }
    },
  },
  {
    name: 'matrix',
    description: 'Enter the Matrix (Easter Egg)',
    execute: () => ({
      type: 'text',
      content: [
        '',
        '▓█████▄ ▓█████  ▄████▄   ▒█████  ▓█████▄ ▓█████ ',
        '▒██▀ ██▌▓█   ▀ ▒██▀ ▀█  ▒██▒  ██▒▒██▀ ██▌▓█   ▀ ',
        '░██   █▌▒███   ▒▓█    ▄ ▒██░  ██▒░██   █▌▒███   ',
        '░▓█▄   ▌▒▓█  ▄ ▒▓▓▄ ▄██▒▒██   ██░░▓█▄   ▌▒▓█  ▄ ',
        '░▒████▓ ░▒████▒▒ ▓███▀ ░░ ████▓▒░░▒████▓ ░▒████▒',
        ' ▒▒▓  ▒ ░░ ▒░ ░░ ░▒ ▒  ░░ ▒░▒░▒░  ▒▒▓  ▒ ░░ ▒░ ░',
        ' ░ ▒  ▒  ░ ░  ░  ░  ▒     ░ ▒ ▒░  ░ ▒  ▒  ░ ░  ░',
        ' ░ ░  ░    ░   ░        ░ ░ ░ ▒   ░ ░  ░    ░   ',
        '   ░       ░  ░░ ░          ░ ░     ░       ░  ░',
        ' ░             ░                  ░              ',
        '',
        '  Wake up, Neo... The portfolio has you...',
        '  Follow the white rabbit... to tiwatide23@gmail.com',
        '',
        '  🐰 💊 🔴 🔵',
        '',
      ].join('\n'),
    }),
  },
]

export function getCommandNames(): string[] {
  return commands.map((c) => c.name)
}

export function findCommand(name: string): Command | undefined {
  return commands.find((c) => c.name === name.toLowerCase())
}

export function executeCommand(input: string): CommandOutput | CommandOutput[] {
  const trimmed = input.trim()

  if (!trimmed) {
    return { type: 'text', content: '' }
  }

  const parts = trimmed.split(/\s+/)
  const commandName = parts[0].toLowerCase()
  const args = parts.slice(1)

  const command = findCommand(commandName)

  if (!command) {
    return {
      type: 'error',
      content: `Command not found: ${commandName}\nType 'help' for available commands.`,
    }
  }

  return command.execute(args)
}

export function getAutocompleteSuggestions(input: string): string[] {
  const trimmed = input.toLowerCase().trim()

  if (!trimmed) {
    return []
  }

  const parts = trimmed.split(/\s+/)

  // If typing first word, suggest commands
  if (parts.length === 1) {
    return commands
      .map((c) => c.name)
      .filter((name) => name.startsWith(trimmed))
      .slice(0, 5)
  }

  // If typing arguments, suggest based on command
  const commandName = parts[0]
  const partial = parts[parts.length - 1]

  if (commandName === 'projects' || commandName === 'open') {
    const projects = getAllProjects()
    return projects
      .map((p) => p.slug)
      .filter((slug) => slug.startsWith(partial))
      .slice(0, 5)
  }

  if (commandName === 'cat' || commandName === 'cd') {
    const files = ['about.md', 'experience.md', 'contact.md', 'resume.pdf', 'projects/']
    return files.filter((f) => f.startsWith(partial)).slice(0, 5)
  }

  if (commandName === 'sudo') {
    const suggestions = ['hire me']
    return suggestions.filter((s) => s.startsWith(parts.slice(1).join(' '))).slice(0, 5)
  }

  if (commandName === 'theme') {
    const themes = ['dracula', 'monokai', 'gruvbox', 'latte', 'default']
    return themes.filter((t) => t.startsWith(partial)).slice(0, 5)
  }

  return []
}
