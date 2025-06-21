'use client'

import { uploadFile } from '@/app/actions/upload-file-actions'
import { useState } from 'react'
import { useEdgeStore } from '../providers/EdgeStoreProvider'
import { Button } from '../ui/button'
import { MultiFileDropzone, type FileState } from './MultiFileDropzone'

interface UploadFormProps {
  onUploadSuccess?: () => void
}

export const UploadForm = ({ onUploadSuccess }: UploadFormProps) => {
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

    const uploadPromises = filesToUpload.map(async (fileState) => {
      try {
        const response = await edgestore.publicFiles.upload({
          file: fileState.file,
          input: { type: 'post' },
          onProgressChange: async (progress) => {
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
          private: false,
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

    if (onUploadSuccess && filesToUpload.length > 0 && !error) {
      onUploadSuccess()
    }
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
          setFileStates((prev) => [...prev, ...addedFiles])
        }}
      />
      <Button
        className='w-full'
        onClick={onSubmit}
        disabled={isUploading || pendingFilesCount === 0}
      >
        {isUploading ? 'Enviando...' : 'Enviar'}
      </Button>

      {error && <p className='text-destructive mt-2 text-sm'>{error}</p>}
    </div>
  )
}
