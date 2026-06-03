export type TaskStatus = 'todo' | 'in_progress' | 'done'

export type TaskPriority = 'low' | 'medium' | 'high'

export type TaskCategory =
  | 'design'
  | 'dev'
  | 'marketing'
  | 'research'
  | 'personal'
  | 'other'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  category: TaskCategory
  dueDate: string | null
  createdAt: string
  updatedAt: string
  order: number
}

export type ViewMode = 'kanban' | 'list'

export interface FilterState {
  search: string
  category: TaskCategory | 'all'
  priority: TaskPriority | 'all'
  sortBy: 'dueDate' | 'priority' | 'createdAt'
}

export const TASK_STATUSES = ['todo', 'in_progress', 'done'] as const

export const TASK_PRIORITIES = ['low', 'medium', 'high'] as const

export const TASK_CATEGORIES = [
  'design',
  'dev',
  'marketing',
  'research',
  'personal',
  'other',
] as const
