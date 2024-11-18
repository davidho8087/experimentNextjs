import { toast } from 'sonner'

interface ServerErrorsProps {
  message: string | null
  name: string
  status: string | null
}

export function ServerErrors({ error }: { readonly error: ServerErrorsProps }) {
  if (!error) return null
  toast.error(error.message)
  return (
    <div className="text-pink-500 text-md italic py-2">{error.message}</div>
  )
}
