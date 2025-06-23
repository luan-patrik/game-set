'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { EyeIcon, User2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback } from './ui/avatar'
import { formatFileSize } from '@edgestore/react/utils'
import useFormatDate from '@/hooks/format-date'

interface DialogViewConfigProps {
  authorId: string
  fileName: string
  size: number
  createdAt: Date
  content: string
  author: {
    name: string | null
    image: string | null
  }
}

export const DialogViewConfig = ({
  authorId,
  fileName,
  size,
  createdAt,
  content,
  author,
}: DialogViewConfigProps) => {
    const { formatDate } = useFormatDate()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' size='sm' className='cursor-pointer'>
          <EyeIcon className='mr-1 size-4' />
          Ver
        </Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col gap-6 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5'>
        <DialogHeader className='contents space-y-0 text-left'>
          <DialogTitle className='border-b px-6 py-4 text-base'>
            {fileName}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className='px-6'>
            <div className='bg-muted overflow-hidden rounded-md border-2'>
              <div className='max-h-[450px] overflow-auto p-3'>
                <pre className='text-foreground font-mono text-sm whitespace-pre'>
                  {content}
                </pre>
              </div>
            </div>
          </div>
        </DialogDescription>
        <DialogFooter className='flex-row items-center justify-between border-t px-6 py-4 text-base font-semibold sm:justify-between'>
          <Link
            href={`/${author?.name}/${authorId}`}
            className='flex items-center gap-2'
          >
            <Avatar className='size-8'>
              {author.image ? (
                <Image
                  src={author.image}
                  alt={author.name || 'Avatar'}
                  width={32}
                  height={32}
                  className='rounded-full'
                  priority={false}
                />
              ) : (
                <AvatarFallback>
                  <User2Icon />
                </AvatarFallback>
              )}
            </Avatar>
            <span>{author?.name}</span>
          </Link>
          <span className='text-xs'>{formatFileSize(size)} • {formatDate(createdAt)}</span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
