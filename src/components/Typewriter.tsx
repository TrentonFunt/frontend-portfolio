import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface TypewriterProps {
  text: string
  className?: string
  speed?: number
  delay?: number
  onComplete?: () => void
  showCursorAfterComplete?: boolean
}

export function Typewriter({
  text,
  className = '',
  speed = 50,
  delay = 0,
  onComplete,
  showCursorAfterComplete = false,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(text)
      setIsComplete(true)
      onComplete?.()
      return
    }

    setDisplayedText('')
    setIsComplete(false)

    let currentIndex = 0
    let intervalId: ReturnType<typeof setInterval> | null = null

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          currentIndex++
          setDisplayedText(text.slice(0, currentIndex))
        } else {
          if (intervalId) clearInterval(intervalId)
          setIsComplete(true)
          onComplete?.()
        }
      }, speed)
    }, delay)

    return () => {
      clearTimeout(startTimeout)
      if (intervalId) clearInterval(intervalId)
    }
  }, [text, speed, delay, prefersReducedMotion, onComplete])

  const showCursor = !isComplete || showCursorAfterComplete

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !prefersReducedMotion && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-0.5 h-[1em] bg-current ml-0.5 align-middle"
        />
      )}
    </span>
  )
}
