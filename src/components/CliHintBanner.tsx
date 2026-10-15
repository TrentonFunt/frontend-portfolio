import { useState } from 'react'
import { readStoredViewMode } from '@/lib/view-mode'

const DISMISS_KEY = 'portfolio-cli-hint-dismissed'

export function CliHintBanner({ onOpenCli }: { onOpenCli: () => void }) {
  const [visible, setVisible] = useState(() => {
    try {
      return localStorage.getItem(DISMISS_KEY) !== '1'
    } catch {
      return true
    }
  })

  if (!visible) return null

  const dismiss = () => {
    setVisible(false)
    try {
      localStorage.setItem(DISMISS_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  const stored = readStoredViewMode()

  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3 rounded border border-(--border-terminal) bg-terminal-bg-alt px-4 py-3 text-sm">
      <p className="text-terminal-fg-muted flex-1">
        <span className="text-terminal-prompt font-mono">tip:</span> Press{' '}
        <kbd className="px-1.5 py-0.5 rounded border border-(--border-terminal) text-terminal-fg font-mono text-xs">
          `
        </kbd>{' '}
        for the terminal{stored === 'cli' ? ' (your last session opened CLI)' : ''}. Try{' '}
        <span className="text-(--syntax-string) font-mono">projects</span> or{' '}
        <span className="text-(--syntax-string) font-mono">experience</span>.
      </p>
      <div className="flex gap-2 shrink-0">
        <button
          type="button"
          onClick={onOpenCli}
          className="px-3 py-1.5 rounded border border-terminal-prompt text-terminal-prompt hover:bg-terminal-prompt hover:text-terminal-bg transition-colors text-xs font-mono"
        >
          open CLI
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="px-3 py-1.5 rounded text-terminal-fg-muted hover:text-terminal-fg text-xs"
        >
          dismiss
        </button>
      </div>
    </div>
  )
}
