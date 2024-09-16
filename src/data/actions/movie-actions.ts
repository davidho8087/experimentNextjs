'use server'
import { getAuthToken } from '@/data/services/get-token'
import { mutateData } from '@/data/services/mutate-data'
import { revalidatePath } from 'next/cache'

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

    // Revalidate the relevant path after a successful operation
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
