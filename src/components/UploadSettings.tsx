'use client'

import { useState } from 'react'
import { useEdgeStore } from './EdgeStoreProvider'
import { type FileState, MultiFileDropzone } from './MultiFileDropzone'
import { Button } from './ui/button'

const UploadSettings = () => {
  const [fileStates, setFileStates] = useState<FileState[]>([])
  const [uploadRes, setUploadRes] = useState<
    {
      url: string
      filename: string
    }[]
  >([])
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

  return (
    <div className='flex w-full flex-col gap-2'>
      <MultiFileDropzone
        dropzoneOptions={{
          maxFiles: 5,
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
                  onProgressChange: async (progress) => {
                    updateFileProgress(fileState.key, progress)
                    if (progress === 100) {
                      // wait 1 second to set it to complete
                      // so that the user can see the progress bar
                      await new Promise((resolve) => setTimeout(resolve, 1000))
                      updateFileProgress(fileState.key, 'COMPLETE')
                    }
                  },
                })
                setUploadRes((uploadRes) => [
                  ...uploadRes,
                  {
                    url: res.url,
                    filename: fileState.file.name,
                  },
                ])
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
      {uploadRes.length > 0 && (
        <div className='mt-2'>
          {uploadRes.map((res) => (
            <a
              key={res.url}
              className='mt-2 block underline'
              href={res.url}
              target='_blank'
              rel='noopener noreferrer'
            >
              {res.filename}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default UploadSettings
