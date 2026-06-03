import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'danger'

interface ButtonProps {
  variant?: ButtonVariant
  children: ReactNode
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent/90 shadow-[0_0_12px_rgba(108,99,255,0.35)]',
  ghost:
    'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-elevated border border-border',
  danger: 'bg-danger/20 text-danger hover:bg-danger/30 border border-danger/40',
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  disabled,
  type = 'button',
  onClick,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </motion.button>
  )
}
