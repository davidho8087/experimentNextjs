import { Button } from '@/components/ui/button'
import MovieForm from '@/app/dashboard/_components/movie-form'
import MovieListing from '@/app/dashboard/_components/movie-listing'

export default function Dashboard() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5 ">
      <span className="text-4xl font-extrabold -tracking-tight lg:text-5xl">
        useFormState
      </span>
      <div className="flex flex-col items-center gap-4 w-full">
        <MovieListing />
        <MovieForm />
      </div>
    </main>
  )
}
