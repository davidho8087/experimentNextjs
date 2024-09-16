'use client'
import { useFormStatus } from 'react-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import { deleteMovieAction } from '@/data/actions/movie-actions'
import { useActionState } from 'react'

function Loader() {
  return (
    <div className="flex items-center">
      <Loader2 className="h-4 w-4 animate-spin" />
    </div>
  )
}

interface DeleteButtonProps {
  className?: string
  id: number
}

export function DeleteButton({ className, id }: DeleteButtonProps) {
  const [state, formAction, isPending] = useActionState(deleteMovieAction, null)
  return (
    <Button
      type="submit"
      aria-disabled={isPending}
      disabled={isPending}
      className={cn(className)}
      onClick={() => {
        formAction(id)
      }}
    >
      {isPending ? <Loader /> : <TrashIcon className="w-4 h-4" />}
    </Button>
  )
}
