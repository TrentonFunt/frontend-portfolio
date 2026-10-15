import { useEffect, useState } from 'react'
import type { ProjectCategory } from '@/lib/projects'
import { PROJECT_CATEGORY_LABELS } from '@/lib/projects'

const SECTIONS: { category: ProjectCategory; id: string }[] = [
  { category: 'frontend', id: 'projects-frontend' },
  { category: 'fullstack', id: 'projects-fullstack' },
  { category: 'backend', id: 'projects-backend' },
]

export function ProjectSectionNav() {
  const [active, setActive] = useState<ProjectCategory>('frontend')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ category, id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(category)
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const jump = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    el.classList.add('section-flash')
    window.setTimeout(() => el.classList.remove('section-flash'), 900)
  }

  return (
    <nav
      aria-label="Project categories"
      className="sticky z-180 -mx-4 px-4 py-2 sm:py-3 mb-6 sm:mb-8 bg-terminal-bg/95 backdrop-blur-sm border-y border-(--border-terminal)"
      style={{ top: 'calc(var(--site-header-height) + env(safe-area-inset-top, 0px))' }}
    >
      <div className="flex gap-2 text-sm font-mono overflow-x-auto pb-1 -mx-1 px-1 snap-x snap-mandatory [scrollbar-width:thin]">
        {SECTIONS.map(({ category, id }) => (
          <button
            key={category}
            type="button"
            onClick={() => jump(id)}
            className={`shrink-0 snap-start min-h-11 px-4 py-2 rounded border transition-colors ${
              active === category
                ? 'border-terminal-prompt text-terminal-prompt bg-terminal-prompt/10'
                : 'border-(--border-terminal) text-terminal-fg-muted hover:border-terminal-fg hover:text-terminal-fg'
            }`}
          >
            {PROJECT_CATEGORY_LABELS[category]}
          </button>
        ))}
      </div>
    </nav>
  )
}
