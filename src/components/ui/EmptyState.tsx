import { motion } from 'framer-motion'

interface EmptyStateProps {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <svg
        width="160"
        height="120"
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-6 opacity-80"
        aria-hidden
      >
        <rect
          x="20"
          y="30"
          width="120"
          height="70"
          rx="12"
          fill="#1A1A26"
          stroke="#2A2A3D"
          strokeWidth="2"
        />
        <rect x="36" y="48" width="60" height="8" rx="4" fill="#6C63FF" opacity="0.6" />
        <rect x="36" y="64" width="88" height="6" rx="3" fill="#2A2A3D" />
        <rect x="36" y="76" width="72" height="6" rx="3" fill="#2A2A3D" />
        <circle cx="120" cy="24" r="16" fill="#6C63FF" opacity="0.2" />
        <path
          d="M112 24L118 30L128 18"
          stroke="#4FFFB0"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h3 className="font-heading text-lg font-semibold text-text-primary">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-text-secondary">{description}</p>
    </motion.div>
  )
}
