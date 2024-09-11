import { getStrapiURL } from '@/lib/utils'

interface RegisterUserProps {
  title: string
  description: string
}

interface LoginUserProps {
  identifier: string
  password: string
}

const baseUrl = getStrapiURL()

export async function registerUserService(userData: RegisterUserProps) {
  const url = new URL('/api/auth/local/register', baseUrl)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userData }),
      cache: 'no-cache',
    })

    return response.json()
  } catch (error) {
    console.error('Registration Service Error:', error)
  }
}
