'use client'

import useFormatDate from '@/lib/formatDate'
import { cn } from '@/lib/utils'
import { UploadChangeVisibilityRequest } from '@/validators/upload'
import { formatFileSize, getDownloadUrl } from '@edgestore/react/utils'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { debounce } from 'lodash'
import { MoreVertical } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { DeleteFile } from './DeleteFile'
import { buttonVariants } from './ui/button'
import { Card, CardContent } from './ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Label } from './ui/label'

interface DetailUploadedSettingsProps {
  id: string
  name: string
  private: boolean
  authorId: string
  fileUrl: string
  size: number
  createdAt: Date
}

export const DetailUploadedSettings = ({
  id,
  name,
  private: initialIsPrivate,
  authorId,
  fileUrl,
  size,
  createdAt,
}: DetailUploadedSettingsProps) => {
  const [isPrivate, setIsPrivate] = useState<boolean>(initialIsPrivate)
  const { data: session } = useSession()
  const { formatDate } = useFormatDate()

  const { mutate: privateFile } = useMutation({
    mutationFn: async ({ id, isPrivate }: UploadChangeVisibilityRequest) => {
      const payload: UploadChangeVisibilityRequest = {
        id,
        isPrivate,
      }
      const { data } = await axios.put('/api/settings/upload', {
        data: payload,
      })

      return data
    },
  })

  const handlePrivacyChange = useCallback(
    debounce((checked: boolean) => {
      privateFile({ id, isPrivate: checked })
    }, 500),
    [id, privateFile],
  )

  const onCheckedChange = (checked: boolean) => {
    setIsPrivate(checked)
    handlePrivacyChange(checked)
  }

  return (
    <Card
      key={id}
      className='border-ring relative flex w-full max-w-[20rem] flex-col justify-between gap-4 rounded-md border pb-0'
    >
      <Label className='absolute top-1 left-1 text-xs'>
        {formatDate(createdAt)}
      </Label>
      <CardContent className='flex w-full flex-col overflow-hidden p-2 text-center text-ellipsis whitespace-nowrap'>
        <span className='inline-block overflow-hidden p-5 text-base font-semibold text-ellipsis whitespace-nowrap sm:text-lg'>
          {name}
        </span>
        <span className='text-xs'>{formatFileSize(size)}</span>
        {authorId === session?.user.id && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='absolute top-2 right-2'>
                <MoreVertical className='h-[1.2rem] w-[1.2rem]' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DeleteFile id={id} fileUrl={fileUrl} />
              <DropdownMenuCheckboxItem
                className='gap-x-0.5 font-bold'
                onSelect={(e) => e.preventDefault()}
                onCheckedChange={onCheckedChange}
                checked={isPrivate}
              >
                Privado
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
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
