'use client'

import { cn } from '@/lib/utils'
import { UploadChangeVisibilityRequest } from '@/validators/upload'
import { formatFileSize, getDownloadUrl } from '@edgestore/react/utils'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { MoreVertical } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { MouseEvent } from 'react'
import { DeleteFile } from './DeleteFile'
import { buttonVariants } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Checkbox } from './ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface DetailUploadedSettingsProps {
  id: string
  name: string
  authorId: string
  fileUrl: string
  size: number
}

export const DetailUploadedSettings = ({
  id,
  name,
  authorId,
  fileUrl,
  size,
}: DetailUploadedSettingsProps) => {
  const { data: session } = useSession()

  const { mutate: privateFile } = useMutation({
    mutationFn: async ({ id }: UploadChangeVisibilityRequest) => {
      const payload: UploadChangeVisibilityRequest = {
        id,
        isPrivate: true,
      }

      const { data } = await axios.put('/api/settings/upload', {
        data: payload,
      })
      return data
    },
  })

  return (
    <Card
      key={id}
      className='relative flex w-full max-w-[20rem] flex-col justify-between gap-4 rounded-md border border-ring'
    >
      <CardContent className='flex w-full flex-col overflow-hidden text-ellipsis whitespace-nowrap p-2 text-center'>
        <span className='inline-block overflow-hidden text-ellipsis whitespace-nowrap p-5 text-base font-semibold sm:text-lg'>
          {name}
        </span>
        <span className='text-xs'>{formatFileSize(size)}</span>
        {authorId === session?.user.id ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='absolute right-2 top-2'>
                <MoreVertical className='h-[1.2rem]  w-[1.2rem]' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DeleteFile id={id} fileUrl={fileUrl} />
              <DropdownMenuItem className='gap-x-0.5 font-bold' asChild>
                <div>
                  <Checkbox
                    onClick={(e: MouseEvent) => {
                      e.preventDefault()
                      privateFile({
                        id,
                        isPrivate: true,
                      })
                    }}
                  />
                  Privado
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </CardContent>
      <Link
        className={cn(buttonVariants({ variant: 'outline' }), 'rounded-t-none')}
        href={getDownloadUrl(fileUrl, name)}
      >
        Baixar
      </Link>
    </Card>
  )
}
