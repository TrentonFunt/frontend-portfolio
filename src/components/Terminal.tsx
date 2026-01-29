import { useState, useRef, useEffect, useCallback, type KeyboardEvent, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  executeCommand,
  getAutocompleteSuggestions,
  type CommandOutput,
} from '@/lib/commands'
import { THEMES, BOOT_SEQUENCE, type ThemeName } from '@/lib/terminal-constants'
import { Confetti, TrainAnimation, RickrollAnimation } from '@/components/TerminalAnimations'

interface HistoryEntry {
  id: number
  command: string
  output: CommandOutput | CommandOutput[]
}

interface TerminalProps {
  onToggleMode: () => void
}

export function Terminal({ onToggleMode }: TerminalProps) {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [selectedSuggestion, setSelectedSuggestion] = useState(0)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [theme, setTheme] = useState<ThemeName>('default')
  const [isBooting, setIsBooting] = useState(() => !prefersReducedMotion)
  const [bootLines, setBootLines] = useState<string[]>(() => 
    prefersReducedMotion ? ['System ready. Welcome, visitor.'] : []
  )
  const [showTrain, setShowTrain] = useState(false)
  const [showRickroll, setShowRickroll] = useState(false)

  // Boot sequence effect
  useEffect(() => {
    if (prefersReducedMotion || !isBooting) return

    const timers: ReturnType<typeof setTimeout>[] = []

    BOOT_SEQUENCE.forEach(({ text, delay }) => {
      const timer = setTimeout(() => {
        setBootLines((prev) => [...prev, text])
      }, delay)
      timers.push(timer)
    })

    const endTimer = setTimeout(() => {
      setIsBooting(false)
    }, 2500)
    timers.push(endTimer)

    return () => timers.forEach(clearTimeout)
  }, [prefersReducedMotion, isBooting])

  // Apply theme to terminal
  useEffect(() => {
    const themeVars = THEMES[theme]
    Object.entries(themeVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }, [theme])

  // Focus input on mount and when clicking terminal
  useEffect(() => {
    if (!isBooting) {
      inputRef.current?.focus()
    }
  }, [isBooting])

  const focusInput = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  // Scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Compute suggestions from input (derived state, not effect)
  const suggestions = getAutocompleteSuggestions(input)

  const processOutput = useCallback(
    (output: CommandOutput | CommandOutput[]) => {
      const outputs = Array.isArray(output) ? output : [output]

      for (const out of outputs) {
        if (out.type === 'clear') {
          setHistory([])
          return
        }

        if (out.type === 'navigate') {
          if (out.navigateTo === 'gui') {
            onToggleMode()
          } else if (out.navigateTo?.startsWith('/')) {
            navigate(out.navigateTo)
          } else if (out.navigateTo?.startsWith('#')) {
            onToggleMode()
            setTimeout(() => {
              document.querySelector(out.navigateTo!)?.scrollIntoView({ behavior: 'smooth' })
            }, 100)
          }
        }

        if (out.type === 'download') {
          const link = document.createElement('a')
          link.href = '/TIWALADE-ADEGOKE-Resume.pdf'
          link.download = 'Tiwalade-Adegoke-Resume.pdf'
          link.click()
        }

        if (out.type === 'confetti') {
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 3000)
        }

        if (out.type === 'theme' && out.theme) {
          setTheme(out.theme as ThemeName)
        }

        if (out.type === 'animation') {
          if (out.animationType === 'sl') {
            setShowTrain(true)
            setTimeout(() => setShowTrain(false), 4000)
          }
          if (out.animationType === 'rickroll') {
            setShowRickroll(true)
            setTimeout(() => setShowRickroll(false), 5000)
          }
        }
      }
    },
    [navigate, onToggleMode]
  )

  const handleSubmit = useCallback(() => {
    if (!input.trim()) return

    const output = executeCommand(input)

    setHistory((prev) => [
      ...prev,
      { id: Date.now(), command: input, output },
    ])

    setCommandHistory((prev) => [input, ...prev].slice(0, 50))
    setHistoryIndex(-1)
    setInput('')
    setShowSuggestions(false)

    processOutput(output)
  }, [input, processOutput])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === '`') {
        e.preventDefault()
        onToggleMode()
        return
      }

      if (e.key === 'Tab') {
        e.preventDefault()
        if (suggestions.length > 0 && showSuggestions) {
          const parts = input.split(/\s+/)
          if (parts.length === 1) {
            setInput(suggestions[selectedSuggestion] + ' ')
          } else {
            parts[parts.length - 1] = suggestions[selectedSuggestion]
            setInput(parts.join(' ') + ' ')
          }
          setShowSuggestions(false)
        }
        return
      }

      if (e.key === 'Enter') {
        e.preventDefault()
        handleSubmit()
        return
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (suggestions.length > 0) {
          setSelectedSuggestion((prev) => Math.max(0, prev - 1))
        } else if (historyIndex < commandHistory.length - 1) {
          const newIndex = historyIndex + 1
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
        return
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (suggestions.length > 0) {
          setSelectedSuggestion((prev) => Math.min(suggestions.length - 1, prev + 1))
        } else if (historyIndex > 0) {
          const newIndex = historyIndex - 1
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        } else if (historyIndex === 0) {
          setHistoryIndex(-1)
          setInput('')
        }
        return
      }

      if (e.key === 'Escape') {
        setShowSuggestions(false)
        return
      }
    },
    [input, suggestions, showSuggestions, selectedSuggestion, historyIndex, commandHistory, handleSubmit, onToggleMode]
  )

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setHistoryIndex(-1)
    setShowSuggestions(true)
    setSelectedSuggestion(0)
  }, [])

  const renderOutput = (output: CommandOutput | CommandOutput[]) => {
    const outputs = Array.isArray(output) ? output : [output]
    return outputs.map((out, i) => (
      <div
        key={i}
        className={`whitespace-pre-wrap ${out.type === 'error' ? 'text-(--syntax-error)' : 'text-terminal-fg-muted'}`}
      >
        {out.content}
      </div>
    ))
  }

  return (
    <div className="fixed inset-0 bg-terminal-bg z-40 flex flex-col font-mono" onClick={focusInput}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-(--border-terminal) bg-terminal-bg-alt">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <button
              onClick={onToggleMode}
              className="w-3 h-3 rounded-full bg-(--traffic-red) hover:brightness-110 transition-all"
              aria-label="Close terminal"
            />
            <div className="w-3 h-3 rounded-full bg-(--traffic-yellow)" />
            <div className="w-3 h-3 rounded-full bg-(--traffic-green)" />
          </div>
          <span className="ml-4 text-terminal-fg-muted text-sm">visitor@portfolio:~</span>
        </div>
        <button onClick={onToggleMode} className="text-terminal-fg-muted text-sm hover:text-terminal-fg transition-colors">
          Switch to GUI →
        </button>
      </div>

      {/* Terminal Body */}
      <div ref={terminalRef} className="flex-1 overflow-y-auto p-4 text-sm leading-relaxed" role="log" aria-live="polite">
        {isBooting ? (
          <div className="text-terminal-fg-muted font-mono">
            {bootLines.map((line, i) => (
              <div key={i} className={line.includes('[OK]') ? 'text-(--syntax-variable)' : ''}>{line}</div>
            ))}
            <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="inline-block w-2 h-4 bg-terminal-prompt ml-1" />
          </div>
        ) : (
          <>
            <div className="text-terminal-fg-muted mb-4">
              <div className="text-terminal-prompt mb-2">Welcome to my portfolio terminal!</div>
              <div>Type <span className="text-(--syntax-string)">'help'</span> to see available commands.</div>
              <div>Press <span className="text-(--syntax-string)">'`'</span> (backtick) or click "Switch to GUI" to exit.</div>
              <div className="mt-2 text-xs">Try: <span className="text-(--syntax-function)">neofetch</span>, <span className="text-(--syntax-function)">theme dracula</span>, <span className="text-(--syntax-function)">sl</span></div>
            </div>

            {history.map((entry) => (
              <div key={entry.id} className="mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-terminal-prompt">visitor@portfolio</span>
                  <span className="text-terminal-fg-muted">:</span>
                  <span className="text-(--syntax-function)">~</span>
                  <span className="text-terminal-fg-muted">$</span>
                  <span className="text-terminal-fg ml-1">{entry.command}</span>
                </div>
                {renderOutput(entry.output)}
              </div>
            ))}

            <div className="flex items-center gap-2">
              <span className="text-terminal-prompt">visitor@portfolio</span>
              <span className="text-terminal-fg-muted">:</span>
              <span className="text-(--syntax-function)">~</span>
              <span className="text-terminal-fg-muted">$</span>
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-terminal-fg outline-none ml-1 caret-terminal-prompt"
                  spellCheck={false}
                  autoCapitalize="off"
                  autoCorrect="off"
                  autoComplete="off"
                  aria-label="Terminal input"
                />
                <AnimatePresence>
                  {suggestions.length > 0 && showSuggestions && (
                    <motion.div
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
                      className="absolute left-0 top-full mt-1 bg-terminal-bg-alt border border-(--border-terminal) rounded overflow-hidden z-10"
                    >
                      {suggestions.map((suggestion, i) => (
                        <button
                          key={suggestion}
                          onClick={() => {
                            const parts = input.split(/\s+/)
                            if (parts.length === 1) {
                              setInput(suggestion + ' ')
                            } else {
                              parts[parts.length - 1] = suggestion
                              setInput(parts.join(' ') + ' ')
                            }
                            setShowSuggestions(false)
                            inputRef.current?.focus()
                          }}
                          className={`block w-full text-left px-3 py-1 text-sm ${
                            i === selectedSuggestion ? 'bg-terminal-prompt text-terminal-bg' : 'text-terminal-fg-muted hover:bg-terminal-bg'
                          }`}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </>
        )}
      </div>

      <AnimatePresence>{showConfetti && <Confetti />}</AnimatePresence>
      <AnimatePresence>{showTrain && <TrainAnimation />}</AnimatePresence>
      <AnimatePresence>{showRickroll && <RickrollAnimation />}</AnimatePresence>
    </div>
  )
}
