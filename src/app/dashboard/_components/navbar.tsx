'use client'

import { LogoutButton } from '@/components/custom-ui/log-out-button'
// import logo from '@/assets/images/logo.png'
import ThemeToggleButton from '@/components/custom-ui/ThemeToggleButton'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
// import { useState } from 'react'

function Navbar() {
  const { theme } = useTheme()
  // const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false)

  return (
    <>
      <div className="p-4 shadow">
        <div className="m-auto flex max-w-7xl items-center justify-between gap-1">
          <Link href={'/notes'} className="flex items-center gap-2">
            {/* <Image
              src={logo}
              alt="david logo"
              style={{
                width: '40px',
                height: 'auto',
              }}
              priority
            /> */}
            <span className="font-bold">Note</span>
          </Link>

          {/*group*/}
          <div className="flex gap-2 items-baseline">
            <ThemeToggleButton />
            <Button onClick={() => {}}>
              <Plus size={20} className="mr-2" />
              Add Note
            </Button>
            <LogoutButton />
          </div>
        </div>
      </div>
      {/* <AddEditNoteDialog
        open={showAddEditNoteDialog}
        setOpen={setShowAddEditNoteDialog}
      /> */}
    </>
  )
}

export default Navbar
