import { experienceEntries } from '@/lib/portfolio-content'

export function ExperienceTimeline() {
  return (
    <div className="space-y-8">
      {experienceEntries.map((job) => (
        <article
          key={`${job.org}-${job.period}`}
          className="relative pl-6 border-l-2 border-(--border-terminal) hover:border-terminal-prompt/60 transition-colors"
        >
          <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-terminal-bg border-2 border-terminal-prompt" />
          <header className="mb-2">
            <h3 className="text-terminal-fg font-semibold text-base sm:text-lg">{job.title}</h3>
            <p className="text-terminal-prompt text-sm font-mono break-words">
              {job.org} · {job.period}
            </p>
            <p className="text-terminal-fg-muted text-xs mt-0.5">{job.location}</p>
          </header>
          <ul className="space-y-1.5 text-terminal-fg-muted text-sm leading-relaxed list-disc pl-4">
            {job.highlights.slice(0, 4).map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}
