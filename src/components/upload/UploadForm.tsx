'use client'

import { uploadFile } from '@/app/actions/upload-file-actions'
import { useFileUpload } from '@/hooks/use-file-upload'
import { useState } from 'react'
import { useEdgeStore } from '../providers/EdgeStoreProvider'
import { Button } from '../ui/button'
import { MultiFileDropzone } from './MultiFileDropzone'

export const UploadForm = () => {
  const [{ files, isDragging, errors: globalErrors }, fileActions] =
    useFileUpload({
      multiple: true,
      maxFiles: 5,
      maxSize: 128 * 1024, // 128 KB
      minSize: 1, // 1 Byte
      accept: '.blk,.cfg,.ini,.txt',
    })

  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  const { edgestore } = useEdgeStore()

  const onSubmit = async () => {
    setIsUploading(true)
    setSubmissionError(null)
    fileActions.clearErrors()

    if (files.length === 0) {
      setSubmissionError('Nenhum arquivo para enviar.')
      setIsUploading(false)
      return
    }

    let hasValidationErrors = false

    files.forEach((file) => {
      if (!file.tag) {
        hasValidationErrors = true
        fileActions.updateFile(file.id, {
          error: 'Selecione uma tag para o arquivo.',
        })
      } else {
        fileActions.updateFile(file.id, { error: undefined })
      }
    })

    if (hasValidationErrors) {
      setIsUploading(false)
      return
    }
    const filesToUpload = files.filter((file) => !file.error)

    const uploadPromises = filesToUpload.map(async (fileWithPreview) => {
      try {
        if (!(fileWithPreview.file instanceof File)) return fileWithPreview

        const response = await edgestore.publicFiles.upload({
          file: fileWithPreview.file,
          input: { type: 'post' },
        })

        const result = await uploadFile({
          fileUrl: response.url,
          name: fileWithPreview.file.name,
          size: fileWithPreview.file.size,
          isPrivate: fileWithPreview.isPrivate,
          tag: fileWithPreview.tag as string,
        })

        if (!result.success) {
          throw new Error(result.error || 'Erro ao fazer upload.')
        }

        fileActions.removeFile(fileWithPreview.id)

        return {
          success: true,
          ...fileWithPreview,
          error: undefined,
        }
      } catch (error) {
        const errorMessage = `Erro no upload de "${fileWithPreview.file.name}": ${
          error instanceof Error ? error.message : String(error)
        }`
        fileActions.updateFile(fileWithPreview.id, { error: errorMessage })
        setSubmissionError(
          'Alguns arquivos falharam no upload. Verifique acima.',
        )
        return { ...fileWithPreview, error: errorMessage }
      }
    })

    await Promise.all(uploadPromises)

    setIsUploading(false)
  }

  return (
    <div className='py-4'>
      <MultiFileDropzone
        files={files}
        addFiles={fileActions.addFiles}
        updateFile={fileActions.updateFile}
        removeFile={fileActions.removeFile}
        clearFiles={fileActions.clearFiles}
        handleDragEnter={fileActions.handleDragEnter}
        handleDragLeave={fileActions.handleDragLeave}
        handleDragOver={fileActions.handleDragOver}
        handleDrop={fileActions.handleDrop}
        openFileDialog={fileActions.openFileDialog}
        getInputProps={fileActions.getInputProps}
        isDragging={isDragging}
        errors={globalErrors}
      />
      <Button className='mt-2 w-full' onClick={onSubmit} disabled={isUploading}>
        {isUploading ? 'Enviando...' : 'Enviar'}
      </Button>

      {submissionError && (
        <p className='text-destructive mt-2 text-sm'>{submissionError}</p>
      )}
    </div>
  )
}
