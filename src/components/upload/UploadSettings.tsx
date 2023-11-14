'use client'

import { useState } from 'react'
import { useEdgeStore } from '../EdgeStoreProvider'
import { type FileState, MultiFileDropzone } from './MultiFileDropzone'
import { Button } from '../ui/button'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { UploadCreationRequest } from '@/validators/upload'

interface UploadSettingsProps {
  settingsId: string
}

const UploadSettings = ({ settingsId }: UploadSettingsProps) => {
  const [fileStates, setFileStates] = useState<FileState[]>([])
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
      filename,
      settingsId,
    }: UploadCreationRequest) => {
      const payload: UploadCreationRequest = {
        fileUrl,
        filename,
        settingsId: settingsId,
      }
      const { data } = await axios.post(`/api/settings/upload`, payload)
      return data
    },
  })

  return (
    <div className='flex w-full flex-col gap-2'>
      <MultiFileDropzone
        dropzoneOptions={{
          maxFiles: 5,
          accept: { '.blk,.cfg,.ini,.txt': [] },
          minSize: 1, // 1Byte
          maxSize: 1024 * 128, //128KB,
        }}
        className='w-full'
        value={fileStates}
        onChange={setFileStates}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles])
        }}
      />
      <Button
        className='w-full bg-ring text-foreground'
        onClick={async () => {
          await Promise.all(
            fileStates.map(async (fileState) => {
              try {
                if (fileState.progress !== 'PENDING') return
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
                  filename: fileState.file.name,
                  settingsId: settingsId,
                })
              } catch (err) {
                updateFileProgress(fileState.key, 'ERROR')
              }
            }),
          )
        }}
        disabled={
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
