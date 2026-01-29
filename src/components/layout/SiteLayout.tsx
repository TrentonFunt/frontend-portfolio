import { useState, useEffect, useCallback } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Terminal } from '@/components/Terminal'

export function SiteLayout() {
  const [isTerminalMode, setIsTerminalMode] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMode = useCallback(() => {
    setIsTerminalMode((prev) => !prev)
  }, [])

  // Listen for backtick key to toggle terminal (desktop only)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Backtick key (`) toggles terminal mode - disabled on mobile
      const isMobile = window.innerWidth < 640
      if (isMobile) return
      
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
              className="text-terminal-fg hover:text-terminal-prompt transition-colors font-bold text-sm sm:text-base"
            >
              ~/portfolio
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center gap-6 text-sm">
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

            {/* Mobile Navigation */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={toggleMode}
                className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors border border-(--border-terminal) px-2 py-1 rounded text-xs"
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

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden bg-terminal-bg-alt border-b border-(--border-terminal) sticky top-11 z-190"
            >
              <div className="flex flex-col px-4 py-3 gap-3 text-sm">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors"
                >
                  [work]
                </Link>
                <a
                  href="#about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors"
                >
                  [about]
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors"
                >
                  [contact]
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t border-(--border-terminal) py-6 px-4">
          <div className="max-w-(--terminal-max) mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-terminal-fg-muted text-xs sm:text-sm text-center sm:text-left">
              <span className="text-terminal-prompt">$</span> echo "© {new Date().getFullYear()} • Built with React, Vite & Tailwind"
            </p>
            <button
              onClick={toggleMode}
              className="text-terminal-fg-muted hover:text-terminal-prompt transition-colors text-xs sm:text-sm"
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
