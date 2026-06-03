import { CATEGORY_COLORS, PRIORITY_COLORS, CATEGORY_LABELS, PRIORITY_LABELS } from '@/constants'
import type { TaskCategory, TaskPriority } from '@/types'

type BadgeProps =
  | { category: TaskCategory; priority?: never }
  | { priority: TaskPriority; category?: never }

export function Badge(props: BadgeProps) {
  if ('category' in props && props.category) {
    const color = CATEGORY_COLORS[props.category]
    return (
      <span
        className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium"
        style={{
          color,
          backgroundColor: `${color}33`,
          border: `1px solid ${color}40`,
        }}
      >
        {CATEGORY_LABELS[props.category]}
      </span>
    )
  }

  const priority = props.priority!
  const color = PRIORITY_COLORS[priority]
  return (
    <span
      className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium"
      style={{
        color,
        backgroundColor: `${color}33`,
        border: `1px solid ${color}40`,
      }}
    >
      {PRIORITY_LABELS[priority]}
    </span>
  )
}
