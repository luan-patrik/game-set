'use client'

import { uploadFile } from '@/app/actions/upload-file-actions'
import { useState } from 'react'
import { useEdgeStore } from '../providers/EdgeStoreProvider'
import { Button } from '../ui/button'
import { MultiFileDropzone, type FileState } from './MultiFileDropzone'

export const UploadForm = () => {
  const [fileStates, setFileStates] = useState<FileState[]>([])
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { edgestore } = useEdgeStore()

  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates)
      const fileState = newFileStates.find((fileState) => fileState.key === key)
      if (fileState) {
        fileState.progress = progress
      }
      return newFileStates
    })
  }

  const handleUpdateTag = (key: string, gameName: string | null) => {
    setFileStates((prevFileStates) => {
      const newFileStates = structuredClone(prevFileStates)
      const fileState = newFileStates.find((fs) => fs.key === key)
      if (fileState) {
        fileState.tag = gameName
      }
      return newFileStates
    })
  }

  const onSubmit = async () => {
    setIsUploading(true)
    setError(null)

    const filesToUpload = fileStates.filter(
      (fileState) => fileState.progress === 'PENDING',
    )

    if (filesToUpload.length === 0) {
      setIsUploading(false)
      return
    }

    const filesWithoutGameTag = filesToUpload.filter(
      (fileState) => !fileState.tag,
    )
    if (filesWithoutGameTag.length > 0) {
      setError(`Selecione uma tag de jogo para todos os arquivos pendentes.`)
      setIsUploading(false)
      setFileStates((prevStates) =>
        prevStates.map((fs) =>
          filesWithoutGameTag.some((fwt) => fwt.key === fs.key)
            ? { ...fs, progress: 'ERROR' }
            : fs,
        ),
      )
      return
    }

    const uploadPromises = filesToUpload.map(async (fileState) => {
      try {
        const response = await edgestore.publicFiles.upload({
          file: fileState.file,
          input: { type: 'post' },
          onProgressChange: async (progress) => {
            updateFileProgress(fileState.key, progress)
            if (progress === 100) {
              await new Promise((resolve) => setTimeout(resolve, 1000))
              updateFileProgress(fileState.key, 'COMPLETE')
            }
          },
        })

        const result = await uploadFile({
          fileUrl: response.url,
          name: fileState.file.name,
          size: fileState.file.size,
          isPrivate: fileState.isPrivate,
          tag: fileState.tag as string,
        })

        if (!result.success) {
          throw new Error(result.error || 'Erro ao fazer upload.')
        }
      } catch (error) {
        updateFileProgress(fileState.key, 'ERROR')
        setError(
          `Erro ao processar o arquivo: ${fileState.file.name}. ${error instanceof Error ? error.message : String(error)}`,
        )
      }
    })

    await Promise.all(uploadPromises)
    setIsUploading(false)
  }

  const pendingFilesCount = fileStates.filter(
    (fileState) => fileState.progress === 'PENDING',
  ).length

  return (
    <div className='py-4'>
      <MultiFileDropzone
        dropzoneOptions={{
          maxFiles: 12,
          accept: { '.blk,.cfg,.ini,.txt': [] },
          minSize: 1, // 1Byte
          maxSize: 1024 * 128, //128KB
        }}
        className='w-full'
        value={fileStates}
        onChange={(files) => {
          setFileStates(files)
        }}
        onFilesAdded={(addedFiles) => {
          setFileStates((prev) => [
            ...prev,
            ...addedFiles.map((fileState) => ({
              ...fileState,
              isPrivate: false,
              tag: null,
            })),
          ])
        }}
        onUpdateTag={handleUpdateTag}
      />
      <Button
        className='mt-2 w-full'
        onClick={onSubmit}
        disabled={isUploading || pendingFilesCount === 0}
      >
        {isUploading ? 'Enviando...' : 'Enviar'}
      </Button>

      {error && <p className='text-destructive mt-2 text-sm'>{error}</p>}
    </div>
  )
}
