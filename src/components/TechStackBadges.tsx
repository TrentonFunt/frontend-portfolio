import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface TechStackBadgesProps {
  technologies: string[]
  previewCount?: number
  className?: string
}

export function TechStackBadges({
  technologies,
  previewCount = 3,
  className = '',
}: TechStackBadgesProps) {
  const [expanded, setExpanded] = useState(false)
  const hasMore = technologies.length > previewCount
  const visible = expanded ? technologies : technologies.slice(0, previewCount)

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {visible.map((tech) => (
        <Badge
          key={tech}
          variant="outline"
          className="border-(--border-terminal) bg-transparent text-terminal-fg-muted rounded-sm px-2 py-0.5 text-xs"
        >
          {tech}
        </Badge>
      ))}
      {hasMore && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setExpanded((v) => !v)
          }}
          className="text-xs min-h-11 sm:min-h-0 px-3 sm:px-2 py-2 sm:py-0.5 rounded-sm border border-dashed border-(--border-terminal) text-terminal-fg-muted hover:text-terminal-prompt hover:border-terminal-prompt transition-colors"
        >
          {expanded ? '− less' : `+${technologies.length - previewCount} more`}
        </button>
      )}
    </div>
  )
}
