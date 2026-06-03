import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { useUIStore } from '@/store/useUIStore'

export function Toast() {
  const toast = useUIStore((s) => s.toast)
  const clearToast = useUIStore((s) => s.clearToast)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(clearToast, 2800)
    return () => clearTimeout(timer)
  }, [toast, clearToast])

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="pointer-events-auto rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm text-text-primary shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
