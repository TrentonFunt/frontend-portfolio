import { useState, useEffect, useCallback } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Terminal } from '@/components/Terminal'

export function SiteLayout() {
  const [isTerminalMode, setIsTerminalMode] = useState(true)

  const toggleMode = useCallback(() => {
    setIsTerminalMode((prev) => !prev)
  }, [])

  // Listen for backtick key to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Backtick key (`) toggles terminal mode
      if (e.key === '`' && !e.ctrlKey && !e.altKey && !e.metaKey) {
        // Don't toggle if user is typing in an input
        const target = e.target as HTMLElement
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          return
        }
        e.preventDefault()
        toggleMode()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleMode])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Terminal Mode */}
      <AnimatePresence>
        {isTerminalMode && <Terminal onToggleMode={toggleMode} />}
      </AnimatePresence>

      {/* GUI Mode - conditionally rendered so components mount fresh */}
      {!isTerminalMode && (
        <>
        {/* Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Terminal Header */}
        <header className="terminal-header sticky top-0 z-200">
          <div className="terminal-lights">
            <button
              onClick={toggleMode}
              className="terminal-light terminal-light--close"
              aria-label="Open terminal"
              title="Press ` to toggle terminal"
            />
            <span className="terminal-light terminal-light--minimize" />
            <span className="terminal-light terminal-light--maximize" />
          </div>
          <nav className="flex-1 flex items-center justify-between ml-4">
            <Link
              to="/"
              className="text-terminal-fg hover:text-terminal-prompt transition-colors font-bold"
            >
              ~/portfolio
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link
                to="/"
                className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors"
              >
                [work]
              </Link>
              <a
                href="#about"
                className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors"
              >
                [about]
              </a>
              <a
                href="#contact"
                className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors"
              >
                [contact]
              </a>
              <button
                onClick={toggleMode}
                className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors border border-(--border-terminal) px-2 py-1 rounded text-xs"
                title="Press ` to toggle"
              >
                [CLI]
              </button>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t border-(--border-terminal) py-6 px-4">
          <div className="max-w-(--terminal-max) mx-auto flex items-center justify-between">
            <p className="text-terminal-fg-muted text-sm">
              <span className="text-terminal-prompt">$</span> echo "© {new Date().getFullYear()} • Built with React, Vite & Tailwind"
            </p>
            <button
              onClick={toggleMode}
              className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors text-sm"
              title="Press ` to toggle"
            >
              Switch to CLI →
            </button>
          </div>
        </footer>
        </>
      )}
    </div>
  )
}
