import { animate, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ProgressBarProps {
  percent: number
  completed: number
  total: number
}

export function ProgressBar({ percent, completed, total }: ProgressBarProps) {
  const [animatedPercent, setAnimatedPercent] = useState(0)

  useEffect(() => {
    const controls = animate(0, percent, {
      duration: 0.8,
      ease: 'easeOut',
      onUpdate: (v) => setAnimatedPercent(v),
    })
    return controls.stop
  }, [percent])

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-text-secondary">
          {completed} de {total} tarefas concluídas hoje
        </span>
        <span className="font-medium text-accent">{Math.round(animatedPercent)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-elevated">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent to-success"
          style={{ width: `${animatedPercent}%` }}
        />
      </div>
    </div>
  )
}
