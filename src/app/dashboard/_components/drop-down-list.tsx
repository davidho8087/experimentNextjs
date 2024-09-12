'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Fragment } from 'react'
import { deleteMovieAction } from '@/data/actions/movie-actions'

export default function LetDropDown({ id }: { id: number }) {
  return (
    <Fragment>
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuItem
        onClick={async () => {
          await deleteMovieAction(id)
        }}
      >
        Delete
      </DropdownMenuItem>
    </Fragment>
  )
}
