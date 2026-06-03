import { Draggable } from '@hello-pangea/dnd'
import { motion } from 'framer-motion'
import { Calendar, Pencil, Trash2 } from 'lucide-react'
import { memo } from 'react'
import { Badge } from '@/components/ui/Badge'
import { useTaskStore } from '@/store/useTaskStore'
import { useUIStore } from '@/store/useUIStore'
import type { Task } from '@/types'
import { formatDueDate, isDueSoon, isOverdue } from '@/utils/dateUtils'

interface KanbanCardProps {
  task: Task
  index: number
}

function KanbanCardComponent({ task, index }: KanbanCardProps) {
  const deleteTask = useTaskStore((s) => s.deleteTask)
  const openModal = useUIStore((s) => s.openModal)
  const showToast = useUIStore((s) => s.showToast)

  const overdue = isOverdue(task.dueDate)
  const dueSoon = isDueSoon(task.dueDate)
  const dueColor = overdue
    ? 'text-danger'
    : dueSoon
      ? 'text-warning'
      : 'text-success'

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    deleteTask(task.id)
    showToast('Tarefa removida')
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-3"
        >
          <motion.div
            layout
            whileHover={{ y: -2 }}
            className={`group rounded-xl border border-border bg-surface p-4 transition-shadow hover:border-accent/40 hover:shadow-card-hover ${
              snapshot.isDragging ? 'kanban-dragging border-accent/60' : ''
            }`}
          >
          <div className="mb-2 flex items-start justify-between gap-2">
            <h4 className="font-medium text-text-primary">{task.title}</h4>
            <div className="flex shrink-0 gap-1 opacity-0 transition group-hover:opacity-100">
              <button
                type="button"
                onClick={() => openModal(task.id)}
                className="rounded p-1 text-text-secondary hover:bg-surface-elevated hover:text-accent"
                aria-label="Editar"
              >
                <Pencil size={14} />
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded p-1 text-text-secondary hover:bg-surface-elevated hover:text-danger"
                aria-label="Excluir"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          {task.description && (
            <p className="mb-3 line-clamp-2 text-sm text-text-secondary">
              {task.description}
            </p>
          )}
          <div className="mb-3 flex flex-wrap gap-1.5">
            <Badge category={task.category} />
            <Badge priority={task.priority} />
          </div>
          <div className={`flex items-center gap-1.5 text-xs ${dueColor}`}>
            <Calendar size={12} />
            <span>{formatDueDate(task.dueDate)}</span>
          </div>
          </motion.div>
        </div>
      )}
    </Draggable>
  )
}

export const KanbanCard = memo(KanbanCardComponent)
