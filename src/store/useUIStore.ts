import { create } from 'zustand'
import { DEFAULT_FILTERS } from '@/constants'
import type { FilterState, ViewMode } from '@/types'

interface UIState {
  viewMode: ViewMode
  filters: FilterState
  isModalOpen: boolean
  editingTaskId: string | null
  isSidebarOpen: boolean
  toast: string | null
  setViewMode: (mode: ViewMode) => void
  setFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void
  openModal: (taskId?: string) => void
  closeModal: () => void
  setSidebarOpen: (open: boolean) => void
  showToast: (message: string) => void
  clearToast: () => void
  clearFilters: () => void
}

export const useUIStore = create<UIState>((set) => ({
  viewMode: 'kanban',
  filters: { ...DEFAULT_FILTERS },
  isModalOpen: false,
  editingTaskId: null,
  isSidebarOpen: false,
  toast: null,

  setViewMode: (mode) => set({ viewMode: mode }),

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  openModal: (taskId) =>
    set({
      isModalOpen: true,
      editingTaskId: taskId ?? null,
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
      editingTaskId: null,
    }),

  setSidebarOpen: (open) => set({ isSidebarOpen: open }),

  showToast: (message) => set({ toast: message }),

  clearToast: () => set({ toast: null }),

  clearFilters: () => set({ filters: { ...DEFAULT_FILTERS } }),
}))
