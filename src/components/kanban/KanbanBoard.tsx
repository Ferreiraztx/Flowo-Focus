import { DragDropContext } from '@hello-pangea/dnd'
import { useFilteredTasks } from '@/hooks/useFilteredTasks'
import { useDragAndDrop } from '@/hooks/useDragAndDrop'
import { TASK_STATUSES } from '@/types'
import { KanbanColumn } from './KanbanColumn'

export function KanbanBoard() {
  const { tasksByStatus } = useFilteredTasks()
  const { onDragEnd } = useDragAndDrop()

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible">
        {TASK_STATUSES.map((status) => (
          <div key={status} className="w-[85vw] shrink-0 snap-center md:w-auto">
            <KanbanColumn status={status} tasks={tasksByStatus[status]} />
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}
