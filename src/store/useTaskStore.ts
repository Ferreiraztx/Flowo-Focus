import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SAMPLE_TASKS } from '@/constants'
import type { Task, TaskStatus } from '@/types'

interface TaskState {
  tasks: Task[]
  addTask: (
    task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'order'>,
  ) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  moveTask: (taskId: string, newStatus: TaskStatus, newOrder: number) => void
  reorderTasks: (
    status: TaskStatus,
    startIndex: number,
    endIndex: number,
  ) => void
}

const getColumnTasks = (tasks: Task[], status: TaskStatus) =>
  tasks
    .filter((t) => t.status === status)
    .sort((a, b) => a.order - b.order)

const reindexColumn = (
  tasks: Task[],
  status: TaskStatus,
  columnTasks: Task[],
): Task[] => {
  const orderMap = new Map(columnTasks.map((t, i) => [t.id, i]))
  return tasks.map((t) =>
    t.status === status && orderMap.has(t.id)
      ? { ...t, order: orderMap.get(t.id)! }
      : t,
  )
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: SAMPLE_TASKS,

      addTask: (taskData) => {
        const now = new Date().toISOString()
        set((state) => {
          const columnTasks = getColumnTasks(state.tasks, taskData.status)
          const maxOrder = columnTasks.reduce(
            (max, t) => Math.max(max, t.order),
            -1,
          )
          const newTask: Task = {
            ...taskData,
            id: crypto.randomUUID(),
            createdAt: now,
            updatedAt: now,
            order: maxOrder + 1,
          }
          return { tasks: [...state.tasks, newTask] }
        })
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? { ...t, ...updates, updatedAt: new Date().toISOString() }
              : t,
          ),
        }))
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        }))
      },

      moveTask: (taskId, newStatus, newOrder) => {
        set((state) => {
          const task = state.tasks.find((t) => t.id === taskId)
          if (!task) return state

          const now = new Date().toISOString()
          const oldStatus = task.status

          const destColumn = getColumnTasks(state.tasks, newStatus).filter(
            (t) => t.id !== taskId,
          )
          const movedTask: Task = {
            ...task,
            status: newStatus,
            updatedAt: now,
          }
          destColumn.splice(newOrder, 0, movedTask)

          let updated = state.tasks.filter((t) => t.id !== taskId)
          updated = reindexColumn(updated, oldStatus, getColumnTasks(updated, oldStatus))
          updated = [
            ...updated.filter((t) => t.status !== newStatus),
            ...destColumn,
          ]
          updated = reindexColumn(
            updated,
            newStatus,
            getColumnTasks(updated, newStatus),
          )

          return { tasks: updated }
        })
      },

      reorderTasks: (status, startIndex, endIndex) => {
        set((state) => {
          const columnTasks = getColumnTasks(state.tasks, status)
          const [removed] = columnTasks.splice(startIndex, 1)
          columnTasks.splice(endIndex, 0, removed)
          return {
            tasks: reindexColumn(state.tasks, status, columnTasks),
          }
        })
      },
    }),
    { name: 'flowo-tasks' },
  ),
)
