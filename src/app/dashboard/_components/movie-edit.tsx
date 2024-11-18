'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { updateMovieAction } from '@/data/actions/movie-actions'
import { useFormState } from 'react-dom'
import { loginUserAction } from '@/data/actions/auth-actions'
import { Movie, movieSchema } from '@/lib/types'
import { Label } from '@/components/ui/label'
import { ZodErrors } from '@/components/custom-ui/zod-errors'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useTransition } from 'react'

type MovieEditProps = {
  isOpen: boolean
  onClose: () => void
  movie: Movie
}

export default function MovieEdit({ isOpen, onClose, movie }: MovieEditProps) {
  const [isPending, startTransition] = useTransition()
  // 1. Define your form.
  const form = useForm<z.infer<typeof movieSchema>>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: movie.title,
      description: movie.description,
    },
  })

  async function onSubmit(values: z.infer<typeof movieSchema>) {
    try {
      // Call the updateMovieAction to update the movie
      const validatedFields = movieSchema.safeParse(values)
      if (!validatedFields.success) {
        return {
          zodErrors: validatedFields.error.flatten().fieldErrors,
        }
      }
      startTransition(async () => {
        const response = await updateMovieAction(movie.id, validatedFields.data)
        onClose()
      })
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Movie</DialogTitle>
          <DialogDescription>
            Make changes to the movie details here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        {/*form*/}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Movie Title" {...field} />
                  </FormControl>
                  <FormDescription>
                    Title should be between 3 and 20 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a brief description of your movie"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Description should be between 6 and 100 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              disabled={isPending}
              aria-disabled={isPending}
            >
              {isPending ? 'Processing...' : 'Submit'}
            </Button>
          </form>
        </Form>
        {/*form end*/}
      </DialogContent>
    </Dialog>
  )
}
