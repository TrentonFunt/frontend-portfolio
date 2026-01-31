export interface Project {
  id: string
  slug: string
  title: string
  description: string
  shortDescription: string
  year: number
  technologies: string[]
  image: string
  url?: string
  role?: string
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'gbese',
    title: 'Gbese - Peer-to-Peer Credit Transfer',
    shortDescription: 'Fintech platform for real-time debt transfer workflows',
    description:
      'Engineered core debt-transfer workflows ensuring real-time synchronization of wallet balances, debt records, and credit scores across users. Prevented financial inconsistencies by validating transaction parameters before state mutations and API calls. Collaborated in a 3-person frontend team using feature-based branching, pull-request reviews, and sprint stand-ups. Shipped a production-ready fintech interface used in live capstone demos.',
    year: 2025,
    technologies: ['React', 'Redux', 'Tailwind CSS', 'shadcn/ui', 'TanStack Query'],
    image: '/images/projects/gbese.png',
    url: 'https://gbese-pi.vercel.app',
    role: 'Frontend Developer (Team of 3)',
  },
  {
    id: '2',
    slug: 'multilearn',
    title: 'MultiLearn - E-Learning Platform',
    shortDescription: 'Full-featured learning platform with role-based dashboards',
    description:
      'Designed and built a full-featured learning platform with authentication, role-based dashboards, and instructor approval workflows. Implemented full CRUD functionality for course creation and management. Improved page responsiveness and data fetching efficiency using TanStack Query caching strategies. Created a reusable component system with consistent light/dark theming across the application.',
    year: 2025,
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Firebase', 'TanStack Query'],
    image: '/images/projects/multilearn.png',
    url: 'https://multi-learn-eight.vercel.app',
    role: 'Solo Developer',
  },
  {
    id: '3',
    slug: 'stack-hero',
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
    id: '4',
    slug: 'role-rocket',
    title: 'Role Rocket - Job Board Platform',
    shortDescription: 'Full-stack job board with multi-role auth and job aggregation',
    description:
      'Production-ready job board connecting job seekers with employers. Features multi-role authentication (seeker/employer/admin), job moderation workflows, and aggregated feeds from 3+ external APIs with caching. Built with atomic design patterns, custom hooks, and WCAG 2.1 AA accessibility compliance. Includes application tracking, saved jobs, employer analytics dashboards, and admin content moderation.',
    year: 2025,
    technologies: ['React', 'Firebase', 'Tailwind CSS', 'DaisyUI', 'Framer Motion', 'Axios'],
    image: '/images/projects/role-rocket.png',
    url: 'https://my-job-board-peach.vercel.app',
    role: 'Solo Developer',
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getAllProjects(): Project[] {
  return projects
}
