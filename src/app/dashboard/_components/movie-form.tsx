'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { setMovieAction } from '@/data/actions/movie-actions'
import { ZodErrors } from '@/components/custom-ui/zod-errors'
import { ServerErrors } from '@/components/custom-ui/server-errors'
import { useFormState, useFormStatus } from 'react-dom'
import { SubmitButton } from '@/components/custom-ui/submit-button'

const INITIAL_STATE = {
  zodErrors: null,
  serverErrors: null,
  data: null,
  message: null,
}

export default function MovieForm() {
  const [state, formAction] = useFormState(setMovieAction, INITIAL_STATE)
  return (
    <form action={formAction} className="flex flex-col w-full gap-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" placeholder="Enter title" />
        <ZodErrors error={state?.zodErrors?.title} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter description"
          className="min-h-[100px]"
        />
        <ZodErrors error={state?.zodErrors?.description} />
      </div>
      <SubmitButton className="w-full" text="Submit" loadingText="Loading" />
      <ServerErrors error={state?.serverErrors} />
    </form>
  )
}
