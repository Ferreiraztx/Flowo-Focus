import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { CATEGORY_COLORS, CATEGORY_LABELS, PRIORITY_COLORS, PRIORITY_LABELS } from '@/constants'
import { useFilteredTasks } from '@/hooks/useFilteredTasks'
import { useUIStore } from '@/store/useUIStore'
import { ProgressBar } from '@/components/ui/ProgressBar'
import type { TaskCategory, TaskPriority } from '@/types'
import { TASK_CATEGORIES, TASK_PRIORITIES } from '@/types'

function SidebarContent() {
  const filters = useUIStore((s) => s.filters)
  const setFilter = useUIStore((s) => s.setFilter)
  const clearFilters = useUIStore((s) => s.clearFilters)
  const { completedToday, totalAllTasks, progressPercent } = useFilteredTasks()

  return (
    <div className="flex h-full flex-col gap-6 p-4 lg:p-0">
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Categoria
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter('category', 'all')}
            className={`rounded-lg px-3 py-1.5 text-xs transition ${
              filters.category === 'all'
                ? 'bg-accent text-white'
                : 'border border-border text-text-secondary hover:border-accent/50'
            }`}
          >
            Todas
          </button>
          {TASK_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter('category', cat)}
              className="rounded-lg px-3 py-1.5 text-xs transition"
              style={{
                backgroundColor:
                  filters.category === cat
                    ? `${CATEGORY_COLORS[cat]}44`
                    : `${CATEGORY_COLORS[cat]}22`,
                color: CATEGORY_COLORS[cat],
                border: `1px solid ${CATEGORY_COLORS[cat]}55`,
              }}
            >
              {CATEGORY_LABELS[cat as TaskCategory]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Prioridade
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter('priority', 'all')}
            className={`rounded-lg px-3 py-1.5 text-xs transition ${
              filters.priority === 'all'
                ? 'bg-accent text-white'
                : 'border border-border text-text-secondary'
            }`}
          >
            Todas
          </button>
          {TASK_PRIORITIES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setFilter('priority', p)}
              className="rounded-lg px-3 py-1.5 text-xs"
              style={{
                backgroundColor:
                  filters.priority === p
                    ? `${PRIORITY_COLORS[p]}44`
                    : `${PRIORITY_COLORS[p]}22`,
                color: PRIORITY_COLORS[p],
                border: `1px solid ${PRIORITY_COLORS[p]}55`,
              }}
            >
              {PRIORITY_LABELS[p as TaskPriority]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Ordenar por
        </h3>
        <select
          value={filters.sortBy}
          onChange={(e) =>
            setFilter(
              'sortBy',
              e.target.value as 'dueDate' | 'priority' | 'createdAt',
            )
          }
          className="w-full rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/50"
        >
          <option value="dueDate">Prazo</option>
          <option value="priority">Prioridade</option>
          <option value="createdAt">Data de criação</option>
        </select>
      </div>

      <ProgressBar
        percent={progressPercent}
        completed={completedToday}
        total={totalAllTasks}
      />

      <button
        type="button"
        onClick={clearFilters}
        className="text-sm text-text-secondary transition hover:text-accent"
      >
        Limpar filtros
      </button>
    </div>
  )
}

export function Sidebar() {
  const isSidebarOpen = useUIStore((s) => s.isSidebarOpen)
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen)

  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-2xl border border-border bg-surface p-4 lg:hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-heading font-semibold">Filtros</h2>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-lg p-1 text-text-secondary hover:bg-surface-elevated"
                  aria-label="Fechar filtros"
                >
                  <X size={20} />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
