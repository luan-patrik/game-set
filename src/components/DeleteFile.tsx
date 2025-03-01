import { UploadDeleteRequest } from '@/validators/upload'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useEdgeStore } from './providers/EdgeStoreProvider'
import { DropdownMenuItem } from './ui/dropdown-menu'

interface DeleteFileProps {
  id: string
  fileUrl: string
}

export const DeleteFile = ({ id, fileUrl }: DeleteFileProps) => {
  const { edgestore } = useEdgeStore()

  const queryClient = useQueryClient()

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
    onSettled: () => {
      console.log('OnSettled')
    },
  })

  const onDelete = async () => {
    try {
      await Promise.all([
        await edgestore.publicFiles.delete({
          url: fileUrl,
        }),
        deleteFile({
          id,
          fileUrl,
        }),
      ])
    } catch (error) {}
  }

  return (
    <DropdownMenuItem className='font-bold text-destructive' asChild>
      <button className='w-full cursor-pointer' onClick={onDelete}>
        Deletar
      </button>
    </DropdownMenuItem>
  )
}
