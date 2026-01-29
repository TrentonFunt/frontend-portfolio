import { useState, useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const CODE_LINES = [
  'const developer = {',
  '  name: "Tiwalade",',
  '  role: "Frontend Developer",',
  '  skills: ["React", "TypeScript"],',
  '  passion: "Building great UX",',
  '};',
  '',
  'export default developer;',
]

interface CodeSnippetProps {
  className?: string
  delay?: number
}

export function CodeSnippet({ className = '', delay = 1500 }: CodeSnippetProps) {
  const prefersReducedMotion = useReducedMotion()
  const [lines, setLines] = useState<string[]>(() => 
    prefersReducedMotion ? CODE_LINES : []
  )
  const currentLineRef = useRef(0)
  const currentCharRef = useRef(0)

  useEffect(() => {
    // Skip animation for reduced motion - already initialized with full content
    if (prefersReducedMotion) return

    let intervalId: ReturnType<typeof setInterval> | null = null

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        const lineIndex = currentLineRef.current
        const charIndex = currentCharRef.current
        const line = CODE_LINES[lineIndex]

        // Check if we're done
        if (lineIndex >= CODE_LINES.length) {
          if (intervalId) clearInterval(intervalId)
          return
        }

        // Handle empty line
        if (line === '') {
          setLines((prev) => {
            const newLines = [...prev]
            newLines[lineIndex] = ''
            return newLines
          })
          currentLineRef.current += 1
          currentCharRef.current = 0
          return
        }

        // Type next character
        if (charIndex < line.length) {
          setLines((prev) => {
            const newLines = [...prev]
            newLines[lineIndex] = line.slice(0, charIndex + 1)
            return newLines
          })
          currentCharRef.current += 1
        } else {
          // Line complete, move to next
          currentLineRef.current += 1
          currentCharRef.current = 0
        }
      }, 40)
    }, delay)

    return () => {
      clearTimeout(startTimeout)
      if (intervalId) clearInterval(intervalId)
    }
  }, [prefersReducedMotion, delay])

  return (
    <div className={`font-mono text-xs leading-relaxed ${className}`}>
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span className="text-terminal-fg-muted/30 select-none w-6 text-right mr-3">
            {i + 1}
          </span>
          <span>
            {line.split(/(\s+|[{}[\](),;:"'=])/g).map((token, j) => {
              // Syntax highlighting
              if (['const', 'export', 'default'].includes(token)) {
                return <span key={j} className="text-(--syntax-keyword)/60">{token}</span>
              }
              if (token.startsWith('"') || token.startsWith("'")) {
                return <span key={j} className="text-(--syntax-string)/60">{token}</span>
              }
              if (['developer', 'name', 'role', 'skills', 'passion'].includes(token)) {
                return <span key={j} className="text-(--syntax-variable)/60">{token}</span>
              }
              if (['{', '}', '[', ']', '(', ')', ',', ';', ':'].includes(token)) {
                return <span key={j} className="text-terminal-fg-muted/40">{token}</span>
              }
              return <span key={j} className="text-terminal-fg/50">{token}</span>
            })}
          </span>
        </div>
      ))}
    </div>
  )
}
