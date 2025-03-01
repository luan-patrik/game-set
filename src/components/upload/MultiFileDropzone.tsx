'use client'

import {
  CheckCircleIcon,
  FileIcon,
  LucideFileWarning,
  Trash2Icon,
  UploadCloudIcon,
} from 'lucide-react'
import * as React from 'react'
import { useDropzone, type DropzoneOptions } from 'react-dropzone'
import { twMerge } from 'tailwind-merge'

const variants = {
  base: 'relative rounded-md p-4 w-96 max-w-[calc(100vw-1rem)] flex justify-center items-center flex-col cursor-pointer border border-dashed border-ring transition-colors duration-200 ease-in-out',
  active: 'border',
  disabled:
    'bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700 dark:border-gray-600',
  accept: 'border border-blue-500 bg-blue-500 bg-opacity-10',
  reject: 'border border-red-700 bg-red-700 bg-opacity-10',
}

export type FileState = {
  file: File
  key: string // used to identify the file in the progress callback
  progress: 'PENDING' | 'COMPLETE' | 'ERROR' | number
}

type InputProps = {
  className?: string
  value?: FileState[]
  onChange?: (files: FileState[]) => void | Promise<void>
  onFilesAdded?: (addedFiles: FileState[]) => void | Promise<void>
  disabled?: boolean
  dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>
}

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `O arquivo é muito grande. O tamanho máximo é ${formatFileSize(
      maxSize,
    )}.`
  },
  fileInvalidType() {
    return 'Tipo de arquivo inválido.'
  },
  tooManyFiles(maxFiles: number) {
    return `Você só pode adicionar ${maxFiles} arquivo(s).`
  },
  fileTooSmall(minSize: number) {
    return `O arquivo é muito pequeno. O tamanho mínimo é ${formatFileSize(
      minSize,
    )}.`
  },
  fileNotSupported() {
    return 'Arquivo não suportado.'
  },
}

const MultiFileDropzone = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { dropzoneOptions, value, className, disabled, onFilesAdded, onChange },
    ref,
  ) => {
    const [customError, setCustomError] = React.useState<string>()
    if (dropzoneOptions?.maxFiles && value?.length) {
      disabled = disabled ?? value.length >= dropzoneOptions.maxFiles
    }
    // dropzone configuration
    const {
      getRootProps,
      getInputProps,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      disabled,
      onDrop: (acceptedFiles) => {
        const files = acceptedFiles
        setCustomError(undefined)
        if (
          dropzoneOptions?.maxFiles &&
          (value?.length ?? 0) + files.length > dropzoneOptions.maxFiles
        ) {
          setCustomError(ERROR_MESSAGES.tooManyFiles(dropzoneOptions.maxFiles))
          return
        }
        if (files) {
          const addedFiles = files.map<FileState>((file) => ({
            file,
            key: crypto.randomUUID(),
            progress: 'PENDING',
          }))
          void onFilesAdded?.(addedFiles)
          void onChange?.([...(value ?? []), ...addedFiles])
        }
      },
      ...dropzoneOptions,
    })

    // styling
    const dropZoneClassName = React.useMemo(
      () =>
        twMerge(
          variants.base,
          isFocused && variants.active,
          disabled && variants.disabled,
          (isDragReject ?? fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
          className,
        ).trim(),
      [
        isFocused,
        fileRejections,
        isDragAccept,
        isDragReject,
        disabled,
        className,
      ],
    )

    // error validation messages
    const errorMessage = React.useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0]
        if (errors[0]?.code === 'file-too-large') {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0)
        } else if (errors[0]?.code === 'file-invalid-type') {
          return ERROR_MESSAGES.fileInvalidType()
        } else if (errors[0]?.code === 'too-many-files') {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0)
        } else if (errors[0]?.code === 'file-too-small') {
          return ERROR_MESSAGES.fileTooSmall(dropzoneOptions?.minSize ?? 0)
        } else {
          return ERROR_MESSAGES.fileNotSupported()
        }
      }
      return undefined
    }, [fileRejections, dropzoneOptions])

    return (
      <div>
        <div className='flex flex-col gap-2'>
          <div>
            <div
              {...getRootProps({
                className: dropZoneClassName,
              })}
            >
              <input ref={ref} {...getInputProps()} />
              <div className='flex flex-col items-center justify-center text-xs text-foreground'>
                <UploadCloudIcon className='mb-1 h-7 w-7' />
                <div className='text-foreground'>arraste & solte ou clique</div>
              </div>
            </div>

            {/* Error Text */}
            {errorMessage && (
              <div className='mt-1 text-xs text-destructive'>
                {customError ?? errorMessage}
              </div>
            )}
          </div>

          {value?.map(({ file, progress }, i) => (
            <div
              key={i}
              className='flex h-16 w-full flex-col justify-center rounded border border-muted px-4 py-2'
            >
              <div className='flex items-center gap-2 text-foreground'>
                <FileIcon size='30' className='shrink-0' />
                <div className='min-w-0 text-sm'>
                  <div className='overflow-hidden overflow-ellipsis whitespace-nowrap'>
                    {file.name}
                  </div>
                  <div className='text-xs text-foreground'>
                    {formatFileSize(file.size)}
                  </div>
                </div>
                <div className='grow' />
                <div className='flex w-12 justify-end text-xs'>
                  {progress === 'PENDING' ? (
                    <button
                      className='rounded-md p-1 transition-colors duration-200 hover:bg-muted'
                      onClick={() => {
                        void onChange?.(value.filter((_, index) => index !== i))
                      }}
                    >
                      <Trash2Icon className='shrink-0' />
                    </button>
                  ) : progress === 'ERROR' ? (
                    <LucideFileWarning className='shrink-0 text-destructive' />
                  ) : progress !== 'COMPLETE' ? (
                    <div>{Math.round(progress)}%</div>
                  ) : (
                    <CheckCircleIcon className='shrink-0 text-muted-foreground' />
                  )}
                </div>
              </div>
              {/* Progress Bar */}
              {typeof progress === 'number' && (
                <div className='relative h-0'>
                  <div className='absolute top-1 h-1 w-full overflow-clip rounded-full bg-muted'>
                    <div
                      className='h-full bg-foreground transition-all duration-300 ease-in-out'
                      style={{
                        width: progress ? `${progress}%` : '0%',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  },
)
MultiFileDropzone.displayName = 'MultiFileDropzone'

function formatFileSize(bytes?: number) {
  if (!bytes) {
    return '0 Bytes'
  }
  bytes = Number(bytes)
  if (bytes === 0) {
    return '0 Bytes'
  }
  const k = 1024
  const dm = 2
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export { MultiFileDropzone }
