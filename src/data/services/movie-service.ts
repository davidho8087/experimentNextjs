import 'server-only'
import qs from 'qs'
import { flattenAttributes, getStrapiURL } from '@/lib/utils'
import { getAuthToken } from '@/data/services/get-token'
import { MovieItem } from '@/lib/types'

type GetMoviesResponse = {
  ok?: boolean
  data: MovieItem[] | [] | null
  error?: { message: string } | null
}

export async function getMovies(userId: string): Promise<GetMoviesResponse> {
  const query = qs.stringify({
    filters: {
      users_permissions_user: {
        id: { $eq: userId },
      },
    },
  })
  const baseUrl = getStrapiURL()
  const url = new URL('/api/movies', baseUrl)
  url.search = query

  const authToken = await getAuthToken()
  if (!authToken) return { ok: false, data: null, error: null }

  try {
    const response = await fetch(url.href, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      cache: 'no-cache',
    })

    const result = await response.json()
    return flattenAttributes(result)
  } catch (error) {
    console.error('Failed to get movie:', error)
    if (error instanceof Error) throw error
    return { data: null, error: { message: 'Unknown error' } }
  }
}
