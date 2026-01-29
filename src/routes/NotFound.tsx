import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Seo } from '@/components/seo/Seo'

export function NotFound() {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <Seo title="Page Not Found" description="The page you're looking for doesn't exist." />

      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-terminal-bg px-6"
      >
        <div className="text-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4"
          >
            <span className="text-terminal-prompt">$</span>
            <span className="text-terminal-fg ml-2">cd /page-not-found</span>
          </motion.div>

          <motion.h1
            initial={prefersReducedMotion ? {} : { scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-8xl md:text-9xl font-black text-(--syntax-error) mb-4"
          >
            404
          </motion.h1>

          <motion.div
            initial={prefersReducedMotion ? {} : { y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-terminal-fg mb-4">
              bash: page: command not found
            </h2>
            <p className="text-lg text-terminal-fg-muted max-w-md mx-auto mb-12">
              The path you're looking for doesn't exist in this directory.
              Let's get you back to a valid route.
            </p>

            <motion.div
              initial={prefersReducedMotion ? {} : { scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                onClick={() => navigate('/')}
                className="text-lg px-8 py-6 h-auto font-bold rounded-lg bg-terminal-prompt text-terminal-bg hover:bg-terminal-fg hover:text-terminal-bg transition-colors"
              >
                cd ~ (Go Home)
              </Button>
            </motion.div>
          </motion.div>

          {/* Terminal-style blinking cursor */}
          {!prefersReducedMotion && (
            <motion.div
              className="mt-12 text-terminal-prompt text-2xl"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            >
              █
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  )
}
