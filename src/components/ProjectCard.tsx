import { TiltCard } from '@/components/TiltCard'
import { TechStackBadges } from '@/components/TechStackBadges'
import type { Project } from '@/lib/projects'
import { PROJECT_CATEGORY_ACCENT, projectCardBlurb } from '@/lib/project-display'

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const showImage = Boolean(project.image)
  const accent = PROJECT_CATEGORY_ACCENT[project.category]

  return (
    <TiltCard
      onClick={onClick}
      className={`group cursor-pointer p-6 rounded-lg border border-(--border-terminal) border-l-4 ${accent.border} bg-terminal-bg-alt hover:border-terminal-prompt transition-colors h-full flex flex-col`}
    >
      {showImage ? (
        <div className="relative w-full h-40 mb-4 overflow-hidden rounded bg-terminal-bg">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {(project.concepts ?? []).slice(0, 3).map((concept) => (
            <span
              key={concept}
              className="text-xs px-2 py-1 rounded border border-(--border-terminal) text-terminal-fg-muted font-mono"
            >
              {concept}
            </span>
          ))}
        </div>
      )}

      <p
        className={`text-xs uppercase tracking-wider mb-2 font-mono inline-block w-fit px-2 py-0.5 rounded border ${accent.badge}`}
      >
        {accent.label}
      </p>

      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="text-terminal-fg group-hover:text-terminal-prompt transition-colors">
          {project.title}
        </h3>
        {project.category !== 'backend' && (
          <span className="text-sm text-terminal-fg-muted whitespace-nowrap font-mono">
            {project.year}
          </span>
        )}
      </div>

      <p className="text-terminal-fg-muted text-sm mb-4 line-clamp-2 flex-grow">
        {projectCardBlurb(project)}
      </p>

      <TechStackBadges technologies={project.technologies} className="mt-auto" />
    </TiltCard>
  )
}
