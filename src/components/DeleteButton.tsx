// components/DeleteAction.tsx
'use client'

import { deleteFile } from '@/app/actions/delete-file-actions'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Trash2Icon } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { useEdgeStore } from './providers/EdgeStoreProvider'
import { Button, buttonVariants } from './ui/button'

export const DeleteButton = ({
  id,
  fileUrl,
}: {
  id: string
  fileUrl: string
}) => {
  const { edgestore } = useEdgeStore()
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await edgestore.publicFiles.delete({ url: fileUrl })
        await deleteFile({ id, fileUrl })
        toast.success('Configuração excluída com sucesso!')
      } catch (error) {
        toast.error('Falha ao excluir a configuração.')
      }
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' size='icon' disabled={isPending}>
          <Trash2Icon className='size-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente sua
            configuração dos nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className={buttonVariants({ variant: 'destructive' })}
          >
            {isPending ? 'Excluindo...' : 'Sim, excluir'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
