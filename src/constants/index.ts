import type { Task, TaskCategory, TaskPriority, TaskStatus } from '@/types'

export const CATEGORY_COLORS: Record<TaskCategory, string> = {
  design: '#FF6B9D',
  dev: '#6C63FF',
  marketing: '#FFB347',
  research: '#4ECDC4',
  personal: '#A78BFA',
  other: '#8888AA',
}

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'A Fazer',
  in_progress: 'Em Andamento',
  done: 'Concluído',
}

export const PRIORITY_COLORS: Record<TaskPriority, string> = {
  low: '#8888AA',
  medium: '#FFB347',
  high: '#FF6B6B',
}

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
}

export const CATEGORY_LABELS: Record<TaskCategory, string> = {
  design: 'Design',
  dev: 'Dev',
  marketing: 'Marketing',
  research: 'Research',
  personal: 'Pessoal',
  other: 'Outro',
}

export const COLUMN_ACCENTS: Record<TaskStatus, string> = {
  todo: '#6C63FF',
  in_progress: '#FFB347',
  done: '#4FFFB0',
}

const now = new Date()
const tomorrow = new Date(now)
tomorrow.setDate(tomorrow.getDate() + 1)
const inThreeDays = new Date(now)
inThreeDays.setDate(inThreeDays.getDate() + 3)
const yesterday = new Date(now)
yesterday.setDate(yesterday.getDate() - 1)

export const SAMPLE_TASKS: Task[] = [
  {
    id: '1',
    title: 'Redesign da landing page',
    description: 'Atualizar hero section e CTAs com o novo design system.',
    status: 'todo',
    priority: 'high',
    category: 'design',
    dueDate: tomorrow.toISOString(),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    order: 0,
  },
  {
    id: '2',
    title: 'Implementar drag-and-drop no Kanban',
    description: 'Integrar @hello-pangea/dnd com o store de tarefas.',
    status: 'in_progress',
    priority: 'high',
    category: 'dev',
    dueDate: now.toISOString(),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    order: 0,
  },
  {
    id: '3',
    title: 'Campanha de lançamento Q2',
    description: 'Preparar copy e assets para redes sociais.',
    status: 'todo',
    priority: 'medium',
    category: 'marketing',
    dueDate: inThreeDays.toISOString(),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    order: 1,
  },
  {
    id: '4',
    title: 'Pesquisa de concorrentes',
    description: 'Mapear features dos principais apps de produtividade.',
    status: 'in_progress',
    priority: 'low',
    category: 'research',
    dueDate: inThreeDays.toISOString(),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    order: 1,
  },
  {
    id: '5',
    title: 'Configurar persistência Zustand',
    description: 'Middleware persist com chave flowo-tasks.',
    status: 'done',
    priority: 'medium',
    category: 'dev',
    dueDate: yesterday.toISOString(),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    order: 0,
  },
  {
    id: '6',
    title: 'Organizar backlog pessoal',
    description: 'Revisar tarefas da semana e priorizar.',
    status: 'done',
    priority: 'low',
    category: 'personal',
    dueDate: null,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    order: 1,
  },
  {
    id: '7',
    title: 'Documentar API de filtros',
    description: 'Escrever guia de uso dos hooks de filtragem.',
    status: 'todo',
    priority: 'low',
    category: 'dev',
    dueDate: null,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    order: 2,
  },
]

export const DEFAULT_FILTERS = {
  search: '',
  category: 'all' as const,
  priority: 'all' as const,
  sortBy: 'dueDate' as const,
}
