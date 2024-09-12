import qs from 'qs'
import { getAuthToken } from './get-token'
import { getStrapiURL } from '@/lib/utils'

type MutateDataOptions = {
  method: 'POST' | 'GET' | 'PUT' | 'DELETE'
  path: string
  payload?: Record<string, any>
}

export async function mutateData({ method, path, payload }: MutateDataOptions) {
  const baseUrl = getStrapiURL()
  const authToken = await getAuthToken()
  const url = new URL(path, baseUrl)

  if (!authToken) throw new Error('No auth token found')

  console.log('mutateData', method, path, payload)
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: payload ? JSON.stringify(payload) : undefined,
    })

    // Check for HTTP errors
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create data.')
    }

    return await response.json()
  } catch (error) {
    throw error instanceof Error ? error : new Error('Unknown error')
  }
}
