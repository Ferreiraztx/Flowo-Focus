import { AnimatePresence } from 'framer-motion'
import { useMemo } from 'react'
import { useFilteredTasks } from '@/hooks/useFilteredTasks'
import type { Task } from '@/types'
import { isDueToday, isDueThisWeek } from '@/utils/dateUtils'
import { ListItem } from './ListItem'

type ListGroup = 'today' | 'week' | 'later'

const GROUP_LABELS: Record<ListGroup, string> = {
  today: 'Hoje',
  week: 'Esta semana',
  later: 'Depois',
}

function getGroup(task: Task): ListGroup {
  if (isDueToday(task.dueDate)) return 'today'
  if (isDueThisWeek(task.dueDate)) return 'week'
  return 'later'
}

export function ListView() {
  const { tasks } = useFilteredTasks()

  const sortedTasks = useMemo(
    () =>
      [...tasks].sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      }),
    [tasks],
  )

  const grouped = useMemo(() => {
    const groups: Record<ListGroup, Task[]> = {
      today: [],
      week: [],
      later: [],
    }
    for (const task of sortedTasks) {
      groups[getGroup(task)].push(task)
    }
    return groups
  }, [sortedTasks])

  const order: ListGroup[] = ['today', 'week', 'later']

  return (
    <div className="space-y-8">
      {order.map((group) => {
        const groupTasks = grouped[group]
        if (groupTasks.length === 0) return null
        return (
          <section key={group}>
            <h3 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-text-secondary">
              {GROUP_LABELS[group]}
            </h3>
            <ul className="space-y-2">
              <AnimatePresence mode="popLayout">
                {groupTasks.map((task) => (
                  <ListItem key={task.id} task={task} />
                ))}
              </AnimatePresence>
            </ul>
          </section>
        )
      })}
    </div>
  )
}
