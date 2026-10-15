import { useState } from 'react'
import { skillGroups } from '@/lib/skills-groups'

export function SkillsAccordion() {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(['frontend', 'backend']))

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-2">
      {skillGroups.map((group) => {
        const isOpen = openIds.has(group.id)
        return (
          <div key={group.id} className="border border-(--border-terminal) rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggle(group.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left bg-terminal-bg hover:bg-terminal-bg-alt transition-colors"
              aria-expanded={isOpen}
            >
              <span className="text-(--syntax-function) text-sm font-semibold font-mono">
                {group.title}
              </span>
              <span className="text-terminal-fg-muted text-xs font-mono">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-1 flex flex-wrap gap-2 border-t border-(--border-terminal)">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm border border-(--border-terminal) rounded text-(--syntax-variable) hover:border-terminal-prompt hover:text-terminal-prompt transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
