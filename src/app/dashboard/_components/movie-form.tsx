'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { setMovieAction } from '@/data/actions/movie-actions'
import { toast } from 'sonner'
// Define the Zod schema for form validation
const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters.' })
    .max(20, { message: 'Title must be less than 20 characters.' }),
  description: z
    .string()
    .min(6, { message: 'Description must be at least 6 characters.' })
    .max(100, { message: 'Description must be less than 100 characters.' }),
})

// Infer the form data type from the Zod schema
type FormData = z.infer<typeof formSchema>

export function MovieForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
    reValidateMode: 'onSubmit',
  })

  const onSubmit = async (data: FormData) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)

    const result = await setMovieAction(formData) // Call server action

    if (result?.serverErrors) {
      toast.error(result.serverErrors || 'Failed to create movie.') // Show error toast
    } else {
      form.reset() // Reset the form after successful submission
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={(
            { field, fieldState } // Destructure fieldState for error handling
          ) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormDescription>
                Title should be between 3 and 20 characters.
              </FormDescription>
              <FormMessage>{fieldState.error?.message}</FormMessage>{' '}
              {/* Display Zod error */}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={(
            { field, fieldState } // Destructure fieldState for error handling
          ) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter description"
                  {...field}
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormDescription>
                Description should be between 6 and 100 characters.
              </FormDescription>
              <FormMessage>{fieldState.error?.message}</FormMessage>{' '}
              {/* Display Zod error */}
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default MovieForm
