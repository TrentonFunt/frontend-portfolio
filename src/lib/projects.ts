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
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    url: 'https://stack-hero-orpin.vercel.app',
    role: 'Solo Developer',
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getAllProjects(): Project[] {
  return projects
}
