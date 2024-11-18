import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getMovies } from '@/data/services/movie-service'
import { DisplayNoRecords } from '@/components/custom-ui/display-no-record'
import { Fragment } from 'react'
import ActionListing from '@/app/dashboard/_components/action-listing'

export default async function MovieListing() {
  const { data: movies } = await getMovies('1')

  if (!movies || movies.length === 0) {
    return (
      <Fragment>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <DisplayNoRecords label="No records found." />
      </Fragment>
    )
  }

  return (
    <div className="container mx-auto py-20">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies.map((movie: MovieItem) => (
            <TableRow key={movie.id}>
              <TableCell className="font-medium">{movie.title}</TableCell>
              <TableCell>{movie.description}</TableCell>
              <TableCell className="text-right">
                <ActionListing movie={movie} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
