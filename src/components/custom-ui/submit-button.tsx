'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

function Loader({ text }: { readonly text: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      <p>{text}</p>
    </div>
  )
}

interface SubmitButtonProps {
  text: string
  loadingText: string
  className?: string
  loading?: boolean
}

export function SubmitButton({
  text,
  loadingText,
  loading,
  className,
}: Readonly<SubmitButtonProps>) {
  const { pending } = useFormStatus()
  console.log('pending', pending)
  return (
    <Button
      type="submit"
      aria-disabled={pending || loading}
      disabled={pending || loading}
      className={cn(className)}
    >
      {pending || loading ? <Loader text={loadingText} /> : text}
    </Button>
  )
}
