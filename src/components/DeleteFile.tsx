import { deleteFile } from '@/app/actions/delete-file-actions'
import { useEdgeStore } from './providers/EdgeStoreProvider'
import { DropdownMenuItem } from './ui/dropdown-menu'

export const DeleteFile = (data: { id: string; fileUrl: string }) => {
  const { edgestore } = useEdgeStore()

  const handleDelete = async () => {
    try {
      await edgestore.publicFiles.delete({ url: data.fileUrl })
      await deleteFile(data)
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
