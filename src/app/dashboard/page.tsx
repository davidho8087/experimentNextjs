import { Button } from '@/components/ui/button'

export default function Dashboard() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-4">
        {/*<Image src={logo} alt="logo" width={100} height={100} />*/}
        <span className="text-4xl font-extrabold -tracking-tight lg:text-5xl">
          useFormState
        </span>
      </div>
      <p className="max-w-prose text-center">This is Dashboard page</p>

      <Button size="lg" asChild>
        {/* <Link href="/dashboard">Let&apos;s get started</Link> */}
      </Button>
    </main>
  )
}
