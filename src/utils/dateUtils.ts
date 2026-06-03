import {
  differenceInCalendarDays,
  format,
  isPast,
  isToday,
  isTomorrow,
  parseISO,
  startOfDay,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDueDate(date: string | null): string {
  if (!date) return 'Sem prazo'

  const parsed = parseISO(date)

  if (isToday(parsed)) return 'Hoje'
  if (isTomorrow(parsed)) return 'Amanhã'

  const days = differenceInCalendarDays(startOfDay(parsed), startOfDay(new Date()))
  if (days > 0 && days <= 7) return `${days} dias`

  return format(parsed, "d 'de' MMM", { locale: ptBR })
}

export function isDueSoon(date: string | null): boolean {
  if (!date) return false
  const parsed = parseISO(date)
  if (isPast(startOfDay(parsed)) && !isToday(parsed)) return false
  const days = differenceInCalendarDays(startOfDay(parsed), startOfDay(new Date()))
  return days >= 0 && days <= 2
}

export function isOverdue(date: string | null): boolean {
  if (!date) return false
  const parsed = parseISO(date)
  return isPast(startOfDay(parsed)) && !isToday(parsed)
}

export function isDueToday(date: string | null): boolean {
  if (!date) return false
  return isToday(parseISO(date))
}

export function isDueThisWeek(date: string | null): boolean {
  if (!date) return false
  const days = differenceInCalendarDays(
    startOfDay(parseISO(date)),
    startOfDay(new Date()),
  )
  return days > 0 && days <= 7
}
