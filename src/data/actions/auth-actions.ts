'use server'
import { env } from '@/env'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import {
  loginUserService,
  registerUserService,
} from '@/data/services/auth-service'
import { getErrorMessage } from '@/lib/utils'

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
  domain: env.HOST ?? 'localhost',
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
}

const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: 'Username must be between 3 and 20 characters',
  }),
  password: z.string().min(6).max(100, {
    message: 'Password must be between 6 and 100 characters',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
})

export async function registerUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaRegister.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
    email: formData.get('email'),
  })

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      serverErrors: null,
      message: 'Missing Fields. Failed to Register.',
    }
  }

  const responseData = await registerUserService(validatedFields.data)

  console.log('responseData', responseData)

  if (!responseData) {
    return {
      ...prevState,
      zodErrors: null,
      serverErrors: null,
      message: 'Ops! Something went wrong. Please try again.',
    }
  }

  if (responseData.error) {
    return {
      ...prevState,
      serverErrors: responseData.error,
      zodErrors: null,
      message: 'Failed to Register.',
    }
  }

  cookies().set('jwt', responseData.jwt, config)
  redirect('/dashboard')
}

const schemaLogin = z.object({
  identifier: z
    .string()
    .min(3, {
      message: 'Identifier must have at least 3 or more characters',
    })
    .max(20, {
      message: 'Please enter a valid username or email address',
    }),
  password: z
    .string()
    .min(6, {
      message: 'Password must have at least 6 or more characters',
    })
    .max(100, {
      message: 'Password must be between 6 and 100 characters',
    }),
})

export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaLogin.safeParse({
    identifier: formData.get('identifier'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Login.',
    }
  }
  let responseData = null
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    responseData = await loginUserService(validatedFields.data)

    if (!responseData) {
      return {
        ...prevState,
        serverErrors: responseData?.error || 'Unknown error',
        zodErrors: null,
      }
    }
    if (responseData.error) {
      return {
        ...prevState,
        serverErrors: responseData.error,
        zodErrors: null,
        message: 'Failed to Login.',
      }
    }
  } catch (error) {
    return {
      ...prevState,
      serverErrors: {
        status: 500,
        name: 'Server Error',
        message: getErrorMessage(error),
      },
      zodErrors: null,
    }
  }

  cookies().set('jwt', responseData.jwt)
  redirect('/dashboard')
}

export async function logoutAction() {
  cookies().set('jwt', '', { ...config, maxAge: 0 })
  redirect('/')
}
