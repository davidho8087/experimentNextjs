'use client'

import { loginUserAction } from '@/data/actions/auth-actions'
import Link from 'next/link'
import { useFormState } from 'react-dom'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { ServerErrors } from '@/components/custom-ui/server-errors'
import { SubmitButton } from '@/components/custom-ui/submit-button'
import { ZodErrors } from '@/components/custom-ui/zod-errors'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const INITIAL_STATE = {
  zodErrors: null,
  serverErrors: null,
  data: null,
  message: null,
}

export function SigninForm() {
  const [state, formAction, isPending] = useFormState(
    loginUserAction,
    INITIAL_STATE
  )
  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Enter your details to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="username or email"
              />
              <ZodErrors error={state?.zodErrors?.identifier} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
              <ZodErrors error={state?.zodErrors?.password} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <SubmitButton
              className="w-full"
              text="Sign In"
              loadingText="Loading"
            />
            <ServerErrors error={state?.serverErrors} />
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Do not have an account?
          <Link className="underline ml-2" href="signup">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  )
}
