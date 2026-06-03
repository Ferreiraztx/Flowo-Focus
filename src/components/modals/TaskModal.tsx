import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Textarea } from '@/components/ui/Textarea'
import {
  CATEGORY_LABELS,
  PRIORITY_LABELS,
} from '@/constants'
import { useTaskStore } from '@/store/useTaskStore'
import { useUIStore } from '@/store/useUIStore'
import type { TaskCategory, TaskPriority, TaskStatus } from '@/types'
import { TASK_CATEGORIES, TASK_PRIORITIES } from '@/types'

const fieldVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

interface FormState {
  title: string
  description: string
  category: TaskCategory
  priority: TaskPriority
  dueDate: string
  status: TaskStatus
}

const defaultForm: FormState = {
  title: '',
  description: '',
  category: 'dev',
  priority: 'medium',
  dueDate: '',
  status: 'todo',
}

export function TaskModal() {
  const isOpen = useUIStore((s) => s.isModalOpen)
  const editingTaskId = useUIStore((s) => s.editingTaskId)
  const closeModal = useUIStore((s) => s.closeModal)
  const showToast = useUIStore((s) => s.showToast)
  const addTask = useTaskStore((s) => s.addTask)
  const updateTask = useTaskStore((s) => s.updateTask)
  const tasks = useTaskStore((s) => s.tasks)

  const [form, setForm] = useState<FormState>(defaultForm)
  const [error, setError] = useState('')

  const isEditing = Boolean(editingTaskId)

  useEffect(() => {
    if (!isOpen) return
    if (editingTaskId) {
      const task = tasks.find((t) => t.id === editingTaskId)
      if (task) {
        setForm({
          title: task.title,
          description: task.description,
          category: task.category,
          priority: task.priority,
          dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
          status: task.status,
        })
      }
    } else {
      setForm(defaultForm)
    }
    setError('')
  }, [isOpen, editingTaskId, tasks])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('O título é obrigatório')
      return
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      priority: form.priority,
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
      status: form.status,
    }

    if (isEditing && editingTaskId) {
      updateTask(editingTaskId, payload)
      showToast('Tarefa atualizada')
    } else {
      addTask(payload)
      showToast('Tarefa criada')
    }
    closeModal()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={isEditing ? 'Editar tarefa' : 'Nova tarefa'}
    >
      <form onSubmit={handleSubmit}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4"
        >
          <motion.div variants={fieldVariants}>
            <Input
              label="Título *"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="O que precisa ser feito?"
              error={error}
            />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <Textarea
              label="Descrição"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Detalhes adicionais..."
            />
          </motion.div>

          <motion.div variants={fieldVariants} className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-text-secondary">Categoria</label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    category: e.target.value as TaskCategory,
                  }))
                }
                className="rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/50"
              >
                {TASK_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {CATEGORY_LABELS[c]}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-text-secondary">Prioridade</label>
              <select
                value={form.priority}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    priority: e.target.value as TaskPriority,
                  }))
                }
                className="rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/50"
              >
                {TASK_PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {PRIORITY_LABELS[p]}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          <motion.div variants={fieldVariants}>
            <Input
              label="Prazo"
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
            />
          </motion.div>

          <motion.div variants={fieldVariants} className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={closeModal}>
              Cancelar
            </Button>
            <Button type="submit">
              {isEditing ? 'Salvar' : 'Criar tarefa'}
            </Button>
          </motion.div>
        </motion.div>
      </form>
    </Modal>
  )
}
