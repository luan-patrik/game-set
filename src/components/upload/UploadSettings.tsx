'use client'

import { useState } from 'react'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UploadCreationRequest } from '@/validators/upload'
import { useEdgeStore } from '../EdgeStoreProvider'
import { type FileState, MultiFileDropzone } from './MultiFileDropzone'
import { Button } from '../ui/button'

interface UploadSettingsProps {
  settingsId: string
}

const UploadSettings = ({ settingsId }: UploadSettingsProps) => {
  const queryClient = useQueryClient()
  const [fileStates, setFileStates] = useState<FileState[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
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

  const { mutate: create } = useMutation({
    mutationFn: async ({
      fileUrl,
      name,
      size,
      settingsId,
    }: UploadCreationRequest) => {
      const payload: UploadCreationRequest = {
        fileUrl,
        name,
        size,
        settingsId: settingsId,
      }
      const { data } = await axios.post(`/api/settings/upload`, payload)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })

  const onSubmit = async () => {
    setIsLoading(true)
    await Promise.all(
      fileStates.map(async (fileState) => {
        if (fileState.progress !== 'PENDING') return
        try {
          const res = await edgestore.publicFiles.upload({
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
          create({
            fileUrl: res.url,
            name: fileState.file.name,
            size: fileState.file.size,
            settingsId: settingsId,
          })
        } catch (error) {
          updateFileProgress(fileState.key, 'ERROR')
        } finally {
          setIsLoading(false)
        }
      }),
    )
  }

  return (
    <div className='flex w-full flex-col gap-2'>
      <MultiFileDropzone
        dropzoneOptions={{
          maxFiles: 12,
          accept: { '.blk,.cfg,.ini,.txt': [] },
          minSize: 1, // 1Byte
          maxSize: 1024 * 128, //128KB,
        }}
        className='w-full'
        value={fileStates}
        onChange={setFileStates}
        onFilesAdded={(addedFiles) => {
          setFileStates([...fileStates, ...addedFiles])
        }}
      />
      <Button
        className='w-full bg-ring text-foreground'
        onClick={onSubmit}
        disabled={
          isLoading ||
          !fileStates.filter((fileState) => fileState.progress === 'PENDING')
            .length
        }
      >
        Upload
      </Button>
    </div>
  )
}

export default UploadSettings
