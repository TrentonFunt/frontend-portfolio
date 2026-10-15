import { useState } from 'react'
import { profile } from '@/lib/portfolio-content'

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 border border-(--border-terminal) text-terminal-fg-muted rounded hover:border-terminal-fg hover:text-terminal-fg transition-colors text-sm sm:text-base font-mono"
    >
      {copied ? 'copied ✓' : 'copy email'}
    </button>
  )
}
