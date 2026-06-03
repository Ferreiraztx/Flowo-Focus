import { isToday, parseISO } from 'date-fns'
import { useMemo } from 'react'
import { useTaskStore } from '@/store/useTaskStore'
import { useUIStore } from '@/store/useUIStore'
import type { FilterState, Task, TaskStatus } from '@/types'
import { TASK_STATUSES } from '@/types'

const PRIORITY_WEIGHT: Record<Task['priority'], number> = {
  high: 3,
  medium: 2,
  low: 1,
}

function sortTasks(tasks: Task[], sortBy: FilterState['sortBy']): Task[] {
  const sorted = [...tasks]
  switch (sortBy) {
    case 'dueDate':
      return sorted.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      })
    case 'priority':
      return sorted.sort(
        (a, b) => PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority],
      )
    case 'createdAt':
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    default:
      return sorted
  }
}

export function useFilteredTasks() {
  const tasks = useTaskStore((s) => s.tasks)
  const filters = useUIStore((s) => s.filters)

  return useMemo(() => {
    let filtered = tasks.filter((task) => {
      const searchLower = filters.search.toLowerCase().trim()
      const matchesSearch =
        !searchLower ||
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
      const matchesCategory =
        filters.category === 'all' || task.category === filters.category
      const matchesPriority =
        filters.priority === 'all' || task.priority === filters.priority
      return matchesSearch && matchesCategory && matchesPriority
    })

    filtered = sortTasks(filtered, filters.sortBy)

    const tasksByStatus = TASK_STATUSES.reduce(
      (acc, status) => {
        acc[status] = filtered
          .filter((t) => t.status === status)
          .sort((a, b) => a.order - b.order)
        return acc
      },
      {} as Record<TaskStatus, Task[]>,
    )

    const totalTasks = filtered.length
    const completedToday = tasks.filter(
      (t) =>
        t.status === 'done' && isToday(parseISO(t.updatedAt)),
    ).length
    const progressPercent =
      tasks.length > 0 ? Math.round((completedToday / tasks.length) * 100) : 0

    return {
      tasks: filtered,
      tasksByStatus,
      totalTasks,
      completedToday,
      progressPercent,
      totalAllTasks: tasks.length,
    }
  }, [tasks, filters])
}
