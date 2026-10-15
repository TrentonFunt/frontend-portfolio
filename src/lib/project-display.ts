import type { Project, ProjectCategory } from './projects'

export type ProjectStatusLabel = 'Live demo' | 'Case study' | 'Shipped'

export function getProjectStatusLabel(project: Project): ProjectStatusLabel {
  if (project.category === 'backend') return 'Case study'
  if (project.url) return 'Live demo'
  return 'Shipped'
}

export const PROJECT_CATEGORY_ACCENT: Record<
  ProjectCategory,
  { border: string; badge: string; label: string }
> = {
  frontend: {
    border: 'border-l-(--syntax-variable)',
    badge: 'text-(--syntax-variable) border-(--syntax-variable)/40',
    label: 'Frontend',
  },
  fullstack: {
    border: 'border-l-(--syntax-success)',
    badge: 'text-(--syntax-success) border-(--syntax-success)/40',
    label: 'Fullstack',
  },
  backend: {
    border: 'border-l-(--syntax-function)',
    badge: 'text-(--syntax-function) border-(--syntax-function)/40',
    label: 'Backend',
  },
}

export function projectCardBlurb(project: Project): string {
  return project.cardHook ?? project.shortDescription
}
