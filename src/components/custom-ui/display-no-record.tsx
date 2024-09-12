import { cn } from '@/lib/utils' // Utility function for conditional class names

interface NoRecordsProps {
  label: string
  className?: string
}

export function DisplayNoRecords({ label, className }: NoRecordsProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-10 px-4',
        'text-gray-700 dark:text-gray-300', // Light and dark mode text colors
        className // Allow custom styling through className prop
      )}
    >
      <p className="text-lg font-semibold">{label}</p>
    </div>
  )
}
