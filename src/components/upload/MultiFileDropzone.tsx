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
import { ExplorerGameFilter } from '../ExplorerGameFilter'
import { PrivacySwitch } from '../ui/privacy-switch'

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
  isPrivate: boolean
  tag: string | null
}

type InputProps = {
  className?: string
  value?: FileState[]
  onChange?: (files: FileState[]) => void | Promise<void>
  onFilesAdded?: (addedFiles: FileState[]) => void | Promise<void>
  disabled?: boolean
  onUpdateTag: (key: string, gameName: string | null) => void
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
    {
      dropzoneOptions,
      value,
      className,
      disabled,
      onFilesAdded,
      onChange,
      onUpdateTag,
    },
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
            isPrivate: false,
            tag: null,
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
              <div className='text-foreground flex flex-col items-center justify-center text-xs'>
                <UploadCloudIcon className='mb-1 h-7 w-7' />
                <div className='text-foreground'>arraste & solte ou clique</div>
              </div>
            </div>

            {/* Error Text */}
            {errorMessage && (
              <div className='text-destructive mt-1 text-xs'>
                {customError ?? errorMessage}
              </div>
            )}
          </div>

          {value?.map(
            ({ file, progress, key, isPrivate: fileIsPrivate, tag }, i) => (
              <div
                key={i}
                className='border-muted flex h-auto w-full flex-col justify-center rounded border px-4 py-4'
              >
                <div className='text-foreground flex items-center gap-2'>
                  <div className='flex w-full flex-col items-start gap-2 overflow-hidden'>
                    <div className='flex w-full items-center gap-2'>
                      <FileIcon size='30' className='shrink-0' />
                      <div className='overflow-hidden text-sm'>
                        <div className='truncate'>{file.name}</div>
                        <div className='text-foreground text-xs'>
                          {formatFileSize(file.size)}
                        </div>
                      </div>
                    </div>
                    <div className='flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-4'>
                      <PrivacySwitch
                        isPrivate={fileIsPrivate}
                        disabled={progress !== 'PENDING'}
                        setIsPrivate={(checked) => {
                          void onChange?.(
                            value.map((fs) =>
                              fs.key === key
                                ? { ...fs, isPrivate: checked }
                                : fs,
                            ),
                          )
                        }}
                      />
                      <ExplorerGameFilter
                        selectedCategories={tag}
                        toggleCategory={(selected) =>
                          onUpdateTag(key, selected as string | null)
                        }
                        buttonText={tag || 'Selecione um jogo...'}
                        buttonClassName='border max-w-full justify-between w-fit'
                        disabled={progress !== 'PENDING'}
                        align='start'
                      />
                    </div>
                  </div>
                  <div className='grow' />
                  <div className='flex w-12 justify-end text-xs'>
                    {progress === 'PENDING' ? (
                      <button
                        className='hover:bg-muted rounded-md p-1 transition-colors duration-200'
                        onClick={() => {
                          void onChange?.(
                            value.filter((_, index) => index !== i),
                          )
                        }}
                      >
                        <Trash2Icon className='shrink-0' />
                      </button>
                    ) : progress === 'ERROR' ? (
                      <LucideFileWarning className='text-destructive shrink-0' />
                    ) : progress !== 'COMPLETE' ? (
                      <div>{Math.round(progress)}%</div>
                    ) : (
                      <CheckCircleIcon className='text-muted-foreground shrink-0' />
                    )}
                  </div>
                </div>
                {/* Progress Bar */}
                {typeof progress === 'number' && (
                  <div className='relative h-0'>
                    <div className='bg-muted absolute top-1 h-1 w-full overflow-clip rounded-full'>
                      <div
                        className='bg-foreground h-full transition-all duration-300 ease-in-out'
                        style={{
                          width: progress ? `${progress}%` : '0%',
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ),
          )}
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
