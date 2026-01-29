import { motion } from 'framer-motion'
import { CONFETTI_PARTICLES, TRAIN_ASCII } from '@/lib/terminal-constants'

export function Confetti() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 pointer-events-none z-50"
    >
      {CONFETTI_PARTICLES.map((particle, i) => (
        <motion.div
          key={i}
          initial={{
            x: '50vw',
            y: '50vh',
            scale: 0,
          }}
          animate={{
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
            scale: [0, 1, 1, 0],
            rotate: particle.rotate,
          }}
          transition={{
            duration: particle.duration,
            ease: 'easeOut',
          }}
          className="absolute w-3 h-3 rounded-sm"
          style={{ backgroundColor: particle.color }}
        />
      ))}
    </motion.div>
  )
}

export function TrainAnimation() {
  return (
    <motion.div
      initial={{ x: '100vw' }}
      animate={{ x: '-100vw' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 4, ease: 'linear' }}
      className="fixed top-1/2 -translate-y-1/2 z-50 pointer-events-none"
    >
      <pre className="text-terminal-fg text-xs whitespace-pre font-mono">
        {TRAIN_ASCII}
      </pre>
    </motion.div>
  )
}

export function RickrollAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 pointer-events-none"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          🕺
        </motion.div>
        <div className="text-terminal-fg text-xl font-mono space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Never gonna give you up
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Never gonna let you down
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            Never gonna run around
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="text-(--syntax-function)"
          >
            ...and desert you 🎵
          </motion.p>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-terminal-fg-muted mt-6 text-sm"
        >
          You just got rickrolled in a terminal. Nice.
        </motion.p>
      </div>
    </motion.div>
  )
}
