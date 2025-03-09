import { deleteFile } from '@/services/deleteFileSettings'
import { useEdgeStore } from './providers/EdgeStoreProvider'
import { DropdownMenuItem } from './ui/dropdown-menu'

interface DeleteFileProps {
  id: string
  fileUrl: string
}

export const DeleteFile = ({ id, fileUrl }: DeleteFileProps) => {
  const { edgestore } = useEdgeStore()

  const handleDelete = async () => {
    try {
      await edgestore.publicFiles.delete({ url: fileUrl })
      await deleteFile(id, fileUrl)
    } catch (error) {
      console.error('Erro ao deletar arquivo:', error)
    }
  }

  return (
    <DropdownMenuItem className='text-destructive font-bold' asChild>
      <button className='w-full cursor-pointer' onClick={handleDelete}>
        Deletar
      </button>
    </DropdownMenuItem>
  )
}
