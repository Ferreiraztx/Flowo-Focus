import type { DropResult } from '@hello-pangea/dnd'
import { useCallback } from 'react'
import { useTaskStore } from '@/store/useTaskStore'
import type { TaskStatus } from '@/types'

export function useDragAndDrop() {
  const moveTask = useTaskStore((s) => s.moveTask)
  const reorderTasks = useTaskStore((s) => s.reorderTasks)

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result
      if (!destination) return
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return
      }

      const sourceStatus = source.droppableId as TaskStatus
      const destStatus = destination.droppableId as TaskStatus

      if (sourceStatus === destStatus) {
        reorderTasks(sourceStatus, source.index, destination.index)
      } else {
        moveTask(draggableId, destStatus, destination.index)
      }
    },
    [moveTask, reorderTasks],
  )

  return { onDragEnd }
}
