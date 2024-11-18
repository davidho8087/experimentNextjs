'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { deleteMovieAction } from '@/data/actions/movie-actions'
import { useState } from 'react'
import MovieEdit from '@/app/dashboard/_components/movie-edit'
import { toast } from 'sonner'

export default function ActionListing({ movie }: { movie: any }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteMovieAction(movie.id)
      setIsDeleteDialogOpen(false)
    } catch (error) {
      setIsDeleteDialogOpen(false)
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete movie'
      )
    } finally {
      setIsDeleting(false)
    }
  }
  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (isDeleting) {
      setIsDeleteDialogOpen(true)
    } else {
      setIsDeleteDialogOpen(open)
    }
  }

  return (
    <div className="p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsDeleteDialogOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <MovieEdit
        isOpen={isEditDialogOpen}
        onClose={handleEditDialogClose}
        movie={movie}
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
