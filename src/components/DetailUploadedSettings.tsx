'use client'

import { formatFileSize, getDownloadUrl } from '@edgestore/react/utils'
import { Card, CardContent } from './ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'
import { MoreVertical } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEdgeStore } from './EdgeStoreProvider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { UploadDeleteRequest } from '@/validators/upload'

interface DetailUploadedSettingsProps {
  id: string
  name: string
  authorId: string
  fileUrl: string
  size: number
  settingsId: string
}

const DetailUploadedSettings = ({
  id,
  name,
  authorId,
  fileUrl,
  size,
  settingsId,
}: DetailUploadedSettingsProps) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const { edgestore } = useEdgeStore()

  const { mutate: deleteFile } = useMutation({
    mutationFn: async ({ id, fileUrl }: UploadDeleteRequest) => {
      const payload: UploadDeleteRequest = {
        id,
        fileUrl,
      }

      const { data } = await axios.delete('/api/settings/upload', {
        data: payload,
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })

  const onDelete = async () => {
    try {
      // await edgestore.publicFiles.delete({
      //   url: fileUrl,
      // })

      deleteFile({
        id,
        fileUrl,
      })

      console.log('Arquivo excluído com sucesso.')
    } catch (error) {
      console.error('Erro ao excluir o arquivo:', error)
    }
  }

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
              <DropdownMenuItem className='font-bold text-destructive' asChild>
                <button className='w-full cursor-pointer' onClick={onDelete}>
                  Deletar
                </button>
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

export default DetailUploadedSettings
