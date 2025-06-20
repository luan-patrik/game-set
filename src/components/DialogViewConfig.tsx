'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { EyeIcon } from 'lucide-react'

interface DialogViewConfigProps {
  fileName: string
  content: string
  author?: {
    name: string
    image: string | undefined
  }
}

export const DialogViewConfig = ({
  fileName,
  content,
  author,
}: DialogViewConfigProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' size='sm' className='cursor-pointer'>
          <EyeIcon className='mr-1 size-4' />
          Ver
        </Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5'>
        <DialogHeader className='contents space-y-0 text-left'>
          <DialogTitle className='border-b px-6 py-4 text-base'>
            {fileName}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className='p-6'>
            <div className='bg-muted overflow-hidden rounded-md border-2'>
              <div className='max-h-[450px] overflow-auto p-3'>
                <pre className='text-foreground font-mono text-sm whitespace-pre'>
                  {content}
                </pre>
              </div>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
