import { Droppable } from '@hello-pangea/dnd'
import { AnimatePresence } from 'framer-motion'
import { Inbox } from 'lucide-react'
import { COLUMN_ACCENTS, STATUS_LABELS } from '@/constants'
import type { Task, TaskStatus } from '@/types'
import { KanbanCard } from './KanbanCard'

const EMPTY_MESSAGES: Record<TaskStatus, string> = {
  todo: 'Nenhuma tarefa pendente. Adicione algo novo!',
  in_progress: 'Arraste uma tarefa para começar o fluxo.',
  done: 'Conclua tarefas para vê-las aqui.',
}

interface KanbanColumnProps {
  status: TaskStatus
  tasks: Task[]
}

export function KanbanColumn({ status, tasks }: KanbanColumnProps) {
  const accent = COLUMN_ACCENTS[status]

  return (
    <div className="flex min-w-[280px] flex-col rounded-xl border border-border bg-background/50 md:min-w-0">
      <div
        className="flex items-center justify-between border-b border-t-[3px] border-border px-4 py-3"
        style={{ borderTopColor: accent }}
      >
        <h3 className="font-heading font-semibold" style={{ color: accent }}>
          {STATUS_LABELS[status]}
        </h3>
        <span
          className="rounded-full px-2 py-0.5 text-xs font-medium"
          style={{ backgroundColor: `${accent}22`, color: accent }}
        >
          {tasks.length}
        </span>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[200px] flex-1 p-3 transition-colors ${
              snapshot.isDraggingOver ? 'bg-accent/5' : ''
            }`}
          >
            <AnimatePresence mode="popLayout">
              {tasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-text-secondary">
                  <Inbox size={32} className="mb-3 opacity-40" />
                  <p className="text-sm">{EMPTY_MESSAGES[status]}</p>
                </div>
              ) : (
                tasks.map((task, index) => (
                  <KanbanCard key={task.id} task={task} index={index} />
                ))
              )}
            </AnimatePresence>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
