'use server'
import { getAuthToken } from '@/data/services/get-token'
import { mutateData } from '@/data/services/mutate-data'
import { revalidatePath } from 'next/cache'
import { flattenAttributes } from '@/lib/utils'
import { z } from 'zod'

export async function setMovieAction(formData: FormData) {
  try {
    const authToken = await getAuthToken()
    if (!authToken) throw new Error('No auth token found')

    // Extract fields directly from formData
    const title = formData.get('title')
    const description = formData.get('description')
    // Prepare the payload for the API request
    const payload = {
      data: {
        title,
        description,
        users_permissions_user: 1, // Replace with the actual user ID logic if needed
      },
    }

    // Send the request to the API
    const responseData = await mutateData({
      method: 'POST',
      path: '/api/movies',
      payload,
    })

    // Check for response errors
    if (!responseData || responseData.error) {
      return {
        serverErrors:
          responseData?.error?.message ||
          'An error occurred while creating the movie.',
      }
    }
    revalidatePath('/dashboard')
  } catch (error) {
    return {
      serverErrors:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.',
    }
  }
}

export async function deleteMovieAction(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  try {
    const responseData = await mutateData({
      method: 'DELETE',
      path: `/api/movies/${id}`,
    })

    if (!responseData || responseData.error) {
      console.error('Error responseData:', responseData?.error)
      throw new Error(
        responseData?.error?.message ||
          'Oops! Something went wrong. Please try again.'
      )
    }
    revalidatePath('/dashboard')
  } catch (error) {
    console.error('Error deleting', error)
    throw new Error(
      'Failed to delete the movie. Please try again or contact support.'
    )
  }
}

export async function updateMovieAction(movieId: number, data: unknown) {
  const payload = {
    data,
  }
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    await mutateData({
      method: 'PUT',
      path: '/api/movies/' + movieId,
      payload,
    })

    revalidatePath('/dashboard')
    return {
      message: 'Movie Updated',
    }
  } catch (error: unknown) {
    throw new Error(
      'Failed to update the movie. Please try again or contact support.'
    )
  }
}
