import { z } from 'zod'

export type Movie = {
  id: number
  title: string
  description: string
}

export const movieSchema = z.object({
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
export type movie = z.infer<typeof movieSchema>
