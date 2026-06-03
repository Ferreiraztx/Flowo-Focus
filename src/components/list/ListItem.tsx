import { motion } from 'framer-motion'
import { Calendar, Check } from 'lucide-react'
import { memo } from 'react'
import { Badge } from '@/components/ui/Badge'
import { useTaskStore } from '@/store/useTaskStore'
import { useUIStore } from '@/store/useUIStore'
import type { Task } from '@/types'
import { formatDueDate, isDueSoon, isOverdue } from '@/utils/dateUtils'

interface ListItemProps {
  task: Task
}

function ListItemComponent({ task }: ListItemProps) {
  const updateTask = useTaskStore((s) => s.updateTask)
  const openModal = useUIStore((s) => s.openModal)
  const isDone = task.status === 'done'

  const overdue = isOverdue(task.dueDate)
  const dueSoon = isDueSoon(task.dueDate)
  const dueColor = overdue
    ? 'text-danger'
    : dueSoon
      ? 'text-warning'
      : 'text-success'

  const toggleDone = () => {
    updateTask(task.id, {
      status: isDone ? 'todo' : 'done',
    })
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      className="flex cursor-pointer items-center gap-4 rounded-xl border border-border bg-surface px-4 py-3 transition hover:border-accent/30 hover:shadow-card-hover"
      onClick={() => openModal(task.id)}
    >
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          toggleDone()
        }}
        whileTap={{ scale: 0.9 }}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition ${
          isDone
            ? 'border-success bg-success/20 text-success'
            : 'border-border hover:border-accent'
        }`}
        aria-label={isDone ? 'Marcar como pendente' : 'Marcar como concluída'}
      >
        {isDone && <Check size={14} />}
      </motion.button>

      <div className="min-w-0 flex-1">
        <motion.p
          className="font-medium text-text-primary"
          animate={{
            textDecoration: isDone ? 'line-through' : 'none',
            opacity: isDone ? 0.6 : 1,
          }}
        >
          {task.title}
        </motion.p>
        {task.description && (
          <p className="truncate text-sm text-text-secondary">{task.description}</p>
        )}
      </div>

      <div className="hidden shrink-0 flex-wrap items-center justify-end gap-2 sm:flex">
        <Badge category={task.category} />
        <Badge priority={task.priority} />
        <div className={`flex items-center gap-1 text-xs ${dueColor}`}>
          <Calendar size={12} />
          {formatDueDate(task.dueDate)}
        </div>
      </div>
    </motion.li>
  )
}

export const ListItem = memo(ListItemComponent)
