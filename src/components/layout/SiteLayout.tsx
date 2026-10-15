import { useState, useEffect, useCallback } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Terminal } from '@/components/Terminal'
import { GuiThemePicker } from '@/components/GuiThemePicker'
import { applyGuiTheme, readGuiTheme } from '@/lib/gui-theme'
import { resolveInitialTerminalMode, writeStoredViewMode } from '@/lib/view-mode'

export interface SiteOutletContext {
  openCli: () => void
}

export function SiteLayout() {
  const location = useLocation()
  const [wantTerminal, setWantTerminal] = useState(() =>
    resolveInitialTerminalMode(location.pathname, location.search),
  )
  const isProjectRoute = location.pathname.startsWith('/projects/')
  const isTerminalMode = wantTerminal && !isProjectRoute
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    applyGuiTheme(readGuiTheme())
  }, [])

  const openCli = useCallback(() => {
    setWantTerminal(true)
    writeStoredViewMode('cli')
  }, [])

  const toggleMode = useCallback(() => {
    setWantTerminal((prev) => {
      const next = !prev
      writeStoredViewMode(next ? 'cli' : 'gui')
      return next
    })
  }, [])

  // Listen for backtick key to toggle terminal (desktop only)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMobile = window.innerWidth < 640
      if (isMobile) return

      if (e.key === '`' && !e.ctrlKey && !e.altKey && !e.metaKey) {
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
    <div className="min-h-screen flex flex-col portfolio-shell">
      <AnimatePresence>
        {isTerminalMode && <Terminal onToggleMode={toggleMode} />}
      </AnimatePresence>

      {!isTerminalMode && (
        <>
          <ScrollProgress />

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
                className="text-terminal-fg hover:text-terminal-prompt transition-colors font-bold text-sm sm:text-base"
              >
                ~/portfolio
              </Link>

              <div className="hidden sm:flex items-center gap-6 text-sm">
                <Link
                  to="/#projects"
                  className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors font-mono"
                >
                  [work]
                </Link>
                <a
                  href="#about"
                  className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors font-mono"
                >
                  [about]
                </a>
                <a
                  href="#experience"
                  className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors font-mono"
                >
                  [experience]
                </a>
                <a
                  href="#contact"
                  className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors font-mono"
                >
                  [contact]
                </a>
                <GuiThemePicker />
                <button
                  onClick={toggleMode}
                  className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors border border-(--border-terminal) px-2 py-1 rounded text-xs font-mono"
                  title="Press ` to toggle"
                >
                  [CLI]
                </button>
              </div>

              <div className="flex sm:hidden items-center gap-2">
                <button
                  onClick={toggleMode}
                  className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors border border-(--border-terminal) px-2 py-1 rounded text-xs font-mono"
                  title="Press ` to toggle"
                >
                  [CLI]
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors p-1"
                  aria-label="Toggle menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    )}
                  </svg>
                </button>
              </div>
            </nav>
          </header>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="sm:hidden bg-terminal-bg-alt border-b border-(--border-terminal) sticky top-11 z-190"
              >
                <div className="flex flex-col px-4 py-3 gap-3 text-sm font-mono">
                  <Link to="/#projects" onClick={() => setIsMobileMenuOpen(false)} className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors">
                    [work]
                  </Link>
                  <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors">
                    [about]
                  </a>
                  <a href="#experience" onClick={() => setIsMobileMenuOpen(false)} className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors">
                    [experience]
                  </a>
                  <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors">
                    [contact]
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <main className="flex-1">
            <Outlet context={{ openCli } satisfies SiteOutletContext} />
          </main>

          <footer className="border-t border-(--border-terminal) py-6 px-4">
            <div className="max-w-(--terminal-max) mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-terminal-fg-muted text-xs sm:text-sm text-center sm:text-left font-mono">
                <span className="text-terminal-prompt">$</span> echo &quot;© {new Date().getFullYear()} • hand-built, not generated&quot;
              </p>
              <button
                onClick={toggleMode}
                className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors text-xs sm:text-sm font-mono"
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
