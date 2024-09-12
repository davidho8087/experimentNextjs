'use server'
import { z } from 'zod'
import { getAuthToken } from '@/data/services/get-token'
import { mutateData } from '@/data/services/mutate-data'
import { revalidatePath } from 'next/cache'

const schemaSetMovie = z.object({
  title: z.string().min(3).max(20, {
    message: 'Title must be between 3 and 20 characters',
  }),
  description: z.string().min(6).max(100, {
    message: 'description must be between 6 and 100 characters',
  }),
})

export async function setMovieAction(prevState: any, formData: FormData) {
  try {
    console.log('prevState', prevState)
    const authToken = await getAuthToken()
    if (!authToken) throw new Error('No auth token found')

    const validatedFields = schemaSetMovie.safeParse({
      title: formData.get('title'),
      description: formData.get('description'),
    })

    if (!validatedFields.success) {
      return {
        ...prevState,
        serverErrors: null,
        zodErrors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Movie.',
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const payload = {
      data: {
        title: validatedFields.data.title,
        description: validatedFields.data.description,
        users_permissions_user: 1,
      },
    }

    const responseData = await mutateData({
      method: 'POST',
      path: '/api/movies',
      payload, // Passing validatedFields.data directly
    })

    // Handle cases where no response data or an error occurs
    if (!responseData || responseData.error) {
      console.error('Error responseData:', responseData?.error)
      throw new Error(
        responseData?.error?.message ||
          'Ops! Something went wrong. Please try again.'
      )
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      ...prevState,
      serverErrors:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.',
      zodErrors: null,
      message: 'Failed to create movie.',
    }
  }
  revalidatePath('/dashboard')
}

export async function deleteMovieAction(id: number) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const responseData = await mutateData({
      method: 'DELETE',
      path: `/api/movies/${id}`,
    })

    if (!responseData || responseData.error) {
      console.error('Error responseData:', responseData?.error)
      throw new Error(
        responseData?.error?.message ||
          'Ops! Something went wrong. Please try again.'
      )
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      serverErrors:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.',
      message: 'Failed to delete movie.',
    }
  }
  revalidatePath('/dashboard')
}
