import { backendProjects } from './backend-projects'

export type ProjectCategory = 'frontend' | 'backend' | 'fullstack'

export interface Project {
  id: string
  slug: string
  title: string
  description: string
  shortDescription: string
  year: number
  technologies: string[]
  category: ProjectCategory
  image?: string
  url?: string
  role?: string
  /** One-line production context (e.g. backend fintech case studies) */
  context?: string
  /** Backend case-study fields */
  problem?: string
  built?: string[]
  concepts?: string[]
  impact?: string[]
  /** One-line hook on cards (backend); avoids repeating long "in short" copy */
  cardHook?: string
  featured?: boolean
}

const frontendProjects: Project[] = [
  {
    id: '2',
    slug: 'multilearn',
    category: 'frontend',
    title: 'MultiLearn - E-Learning Platform',
    shortDescription: 'Full-featured learning platform with role-based dashboards',
    description:
      'Full learning platform with authentication, user dashboards, and course management interfaces. Modular, reusable React components for consistent UI across pages. API-driven data fetching and state management for smooth navigation. Responsive design and performance optimization for desktop and mobile.',
    year: 2025,
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Firebase', 'TanStack Query'],
    image: '/images/projects/multilearn.png',
    url: 'https://multi-learn-eight.vercel.app',
    role: 'Solo Developer',
  },
  {
    id: '3',
    slug: 'stack-hero',
    category: 'frontend',
    title: 'Stack Hero - Physics-Based Web Game',
    shortDescription: 'Physics-driven stacking game with collision detection',
    description:
      'Built a physics-driven stacking game with collision detection, gravity simulation, and progressive difficulty scaling. Implemented game state management for scoring, combos, and level progression. Optimized input responsiveness and audiovisual feedback to improve gameplay smoothness.',
    year: 2024,
    technologies: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Web Audio API'],
    image: '/images/projects/stack-hero.png',
    url: 'https://stack-hero-orpin.vercel.app',
    role: 'Solo Developer',
  },
  {
    id: '6',
    slug: 'eanvest',
    category: 'frontend',
    title: 'Eanvest — Investment Platform Website',
    shortDescription: 'Public marketing site for stocks, funds, bonds, and treasury products',
    description:
      'Built the public-facing website for an investment platform, presenting stocks, mutual funds, bonds, and treasury bills. Integrated live Nigerian and US stock prices and charts through Next.js API routes. Built scroll-driven animations with GSAP and Motion, with reduced-motion support for accessibility. Created legal and FAQ pages with MDX, including search and a sticky table of contents. Improved accessibility and SEO with WCAG AA contrast, structured data, a sitemap, and security headers.',
    year: 2026,
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'GSAP',
      'Motion',
      'TanStack Query',
      'MDX',
    ],
    image: '/images/projects/eanvest.png',
    url: 'https://eanvest.com',
    role: 'Fullstack Engineer',
    featured: true,
  },
  {
    id: '1',
    slug: 'gbese',
    category: 'frontend',
    title: 'Gbese - Peer-to-Peer Credit Transfer',
    shortDescription: 'Fintech platform for real-time debt transfer workflows',
    description:
      'User-facing financial interfaces for a peer-to-peer credit transfer platform — manage debts and transfer balances between wallets. Redux Toolkit for consistent transaction flows across multi-step UI. REST APIs with validation, loading states, and error handling for reliable financial behavior. Responsive layouts and clear feedback patterns where accuracy and usability matter. Collaborated with backend developers to align frontend flows with API logic.',
    year: 2025,
    technologies: ['React', 'Redux', 'Tailwind CSS', 'shadcn/ui', 'TanStack Query'],
    image: '/images/projects/gbese.png',
    url: 'https://gbese-pi.vercel.app',
    role: 'Fullstack Developer (Team of 3)',
  },
]

const fullstackProjects: Project[] = [
  {
    id: '4',
    slug: 'role-rocket',
    category: 'fullstack',
    title: 'Role Rocket - Job Board Platform',
    shortDescription: 'Full-stack job board with multi-role auth and job aggregation',
    description:
      'Production-ready job board connecting job seekers with employers. Features multi-role authentication (seeker/employer/admin), job moderation workflows, and aggregated feeds from 3+ external APIs with caching. Built with atomic design patterns, custom hooks, and WCAG 2.1 AA accessibility compliance. Includes application tracking, saved jobs, employer analytics dashboards, and admin content moderation.',
    year: 2025,
    technologies: ['React', 'Firebase', 'Tailwind CSS', 'DaisyUI', 'Framer Motion', 'Axios'],
    image: '/images/projects/role-rocket.png',
    url: 'https://my-job-board-peach.vercel.app',
    role: 'Solo Developer',
    featured: true,
  },
  {
    id: '5',
    slug: 'gooeyspot',
    category: 'fullstack',
    title: 'TheGooeySpot — Bakery Ordering Platform',
    shortDescription: 'Fullstack bakery platform with order management and REST APIs',
    description:
      'Fullstack web application for managing products, orders, and customer interactions. RESTful APIs on ASP.NET Core for order processing and user management. Authentication and role-based access control (JWT, RBAC). PostgreSQL for products, orders, and users. Deployed on a VPS with Docker. Responsive React and Tailwind CSS interfaces, optimized for mobile users.',
    year: 2025,
    technologies: ['ASP.NET Core', 'C#', 'React.js', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'JWT'],
    image: '/images/projects/gooeyspot.png',
    url: 'https://thegooeyspot.com',
    role: 'Fullstack Developer (Owner)',
  },
]

export const projects: Project[] = [
  ...frontendProjects,
  ...fullstackProjects,
  ...backendProjects,
]

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  fullstack: 'Fullstack',
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((project) => project.category === category)
}

export function getProjectCount(): number {
  return projects.length
}
