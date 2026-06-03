import { LayoutGrid, List, Plus, Search, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useUIStore } from '@/store/useUIStore'

export function Header() {
  const viewMode = useUIStore((s) => s.viewMode)
  const setViewMode = useUIStore((s) => s.setViewMode)
  const filters = useUIStore((s) => s.filters)
  const setFilter = useUIStore((s) => s.setFilter)
  const openModal = useUIStore((s) => s.openModal)
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:gap-6 lg:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/20 text-accent">
              <Zap size={20} />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight">
              Flowo
            </span>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg border border-border px-3 py-2 text-sm text-text-secondary"
            >
              Filtros
            </button>
            <Button className="!px-3" onClick={() => openModal()}>
              <Plus size={18} />
            </Button>
          </div>
        </div>

        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
          />
          <Input
            className="pl-10"
            placeholder="Buscar tarefas..."
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
          />
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex rounded-lg border border-border p-1">
            <button
              type="button"
              onClick={() => setViewMode('kanban')}
              className={`rounded-md p-2 transition ${
                viewMode === 'kanban'
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              aria-label="Visualização Kanban"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`rounded-md p-2 transition ${
                viewMode === 'list'
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              aria-label="Visualização Lista"
            >
              <List size={18} />
            </button>
          </div>
          <Button onClick={() => openModal()}>
            <Plus size={18} />
            Nova Tarefa
          </Button>
        </div>

        <div className="flex items-center justify-between gap-2 lg:hidden">
          <div className="flex flex-1 rounded-lg border border-border p-1">
            <button
              type="button"
              onClick={() => setViewMode('kanban')}
              className={`flex-1 rounded-md p-2 transition ${
                viewMode === 'kanban' ? 'bg-accent text-white' : 'text-text-secondary'
              }`}
            >
              <LayoutGrid size={18} className="mx-auto" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`flex-1 rounded-md p-2 transition ${
                viewMode === 'list' ? 'bg-accent text-white' : 'text-text-secondary'
              }`}
            >
              <List size={18} className="mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
