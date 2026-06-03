import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { KanbanBoard } from '@/components/kanban/KanbanBoard'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { ListView } from '@/components/list/ListView'
import { TaskModal } from '@/components/modals/TaskModal'
import { EmptyState } from '@/components/ui/EmptyState'
import { Toast } from '@/components/ui/Toast'
import { useFilteredTasks } from '@/hooks/useFilteredTasks'
import { useUIStore } from '@/store/useUIStore'

export default function App() {
  const viewMode = useUIStore((s) => s.viewMode)
  const filters = useUIStore((s) => s.filters)
  const { totalTasks } = useFilteredTasks()

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  const hasActiveFilters =
    filters.search !== '' ||
    filters.category !== 'all' ||
    filters.priority !== 'all'

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto flex max-w-[1600px] gap-6 px-4 py-6 lg:px-6">
        <Sidebar />
        <main className="min-w-0 flex-1">
          {totalTasks === 0 ? (
            <EmptyState
              title={hasActiveFilters ? 'Nenhum resultado' : 'Sem tarefas ainda'}
              description={
                hasActiveFilters
                  ? 'Tente ajustar os filtros ou a busca para encontrar suas tarefas.'
                  : 'Crie sua primeira tarefa com o botão "Nova Tarefa" e organize seu fluxo.'
              }
            />
          ) : (
            <AnimatePresence mode="wait">
              {viewMode === 'kanban' ? (
                <motion.div
                  key="kanban"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.25 }}
                >
                  <KanbanBoard />
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                >
                  <ListView />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </main>
      </div>
      <TaskModal />
      <Toast />
    </div>
  )
}
