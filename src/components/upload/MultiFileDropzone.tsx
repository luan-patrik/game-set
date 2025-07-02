import {
  FileUploadActions,
  FileUploadOptions,
  FileUploadState,
  FileWithPreview,
  formatBytes,
} from '@/hooks/use-file-upload'
import {
  AlertCircleIcon,
  FileIcon,
  FileUpIcon,
  GlobeLockIcon,
  TagIcon,
  XIcon,
} from 'lucide-react'
import { ExplorerGameFilter } from '../ExplorerGameFilter'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { PrivacySwitch } from '../ui/privacy-switch'

interface MultiFileDropzoneProps {
  files: FileWithPreview[]
  addFiles: FileUploadActions['addFiles']
  updateFile: FileUploadActions['updateFile']
  removeFile: FileUploadActions['removeFile']
  clearFiles: FileUploadActions['clearFiles']
  handleDragEnter: FileUploadActions['handleDragEnter']
  handleDragLeave: FileUploadActions['handleDragLeave']
  handleDragOver: FileUploadActions['handleDragOver']
  handleDrop: FileUploadActions['handleDrop']
  openFileDialog: FileUploadActions['openFileDialog']
  getInputProps: FileUploadActions['getInputProps']
  maxFiles: FileUploadOptions['maxFiles']
  maxSize: FileUploadOptions['maxSize']
  isDragging: FileUploadState['isDragging']
  errors: FileUploadState['errors']
  isUploading?: boolean
}

export const MultiFileDropzone = ({
  files,
  addFiles,
  updateFile,
  removeFile,
  clearFiles,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  openFileDialog,
  getInputProps,
  maxFiles,
  maxSize,
  isDragging,
  errors,
  isUploading,
}: MultiFileDropzoneProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <div
        role='button'
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        className='border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px]'
      >
        <input
          {...getInputProps()}
          className='sr-only'
          aria-label='Adicionar arquivos'
        />

        <div className='flex flex-col items-center justify-center text-center'>
          <div
            className='bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border'
            aria-hidden='true'
          >
            <FileUpIcon className='size-4 opacity-60' />
          </div>
          <p className='mb-1.5 text-sm font-medium'>Adicionar arquivos</p>
          <p className='text-muted-foreground mb-2 text-xs'>
            Arraste & solte ou clique para adicionar arquivos
          </p>
          <div className='text-muted-foreground/70 flex flex-wrap justify-center gap-1 text-xs'>
            <span>Máximo {maxFiles} arquivos</span>
            <span>∙</span>
            <span>Até {formatBytes(maxSize as number)}</span>
          </div>
        </div>
      </div>
      {errors.length > 0 && (
        <div
          className='text-destructive flex items-center gap-1 text-xs'
          role='alert'
        >
          <AlertCircleIcon className='size-3 shrink-0' />
          <span>{errors[0]}</span>
        </div>
      )}

      {files.length > 0 && (
        <div className='space-y-2'>
          {files.map((file) => (
            <div
              key={file.id}
              className='bg-background flex flex-col gap-2 overflow-hidden rounded-lg border p-3'
            >
              <div className='relative flex flex-col items-start justify-between gap-2 md:flex-row md:items-center'>
                <div className='flex w-full items-center gap-3 overflow-hidden'>
                  <div className='flex aspect-square size-10 shrink-0 items-center justify-center rounded border'>
                    <FileIcon className='size-4' />
                  </div>
                  <div className='flex min-w-0 flex-col gap-0.5 overflow-hidden pe-10 md:pe-0'>
                    <p className='truncate text-[13px] font-medium'>
                      {file.file instanceof File
                        ? file.file.name
                        : file.file.name}
                    </p>
                    <p className='text-muted-foreground text-xs'>
                      {formatBytes(
                        file.file instanceof File
                          ? file.file.size
                          : file.file.size,
                      )}
                    </p>
                  </div>
                </div>
                <Button
                  size='icon'
                  variant='ghost'
                  className='text-muted-foreground/80 hover:text-foreground absolute inset-y-0 end-0 size-8 hover:bg-transparent md:static'
                  onClick={() => removeFile(file.id)}
                  aria-label='Remove file'
                  disabled={isUploading}
                >
                  <XIcon className='size-4' aria-hidden='true' />
                </Button>
              </div>

              <div className='flex flex-col justify-between gap-2 overflow-hidden sm:flex-row sm:items-end'>
                <div className='flex flex-col space-y-1'>
                  <Label className='text-muted-foreground flex items-center gap-2 text-xs font-medium sm:text-sm'>
                    <GlobeLockIcon className='size-4' />
                    Privacidade
                  </Label>
                  <PrivacySwitch
                    isPrivate={file.isPrivate}
                    setIsPrivate={(checked) => {
                      updateFile(file.id, { isPrivate: checked })
                    }}
                    disabled={isUploading}
                  />
                </div>
                <div className='flex w-full flex-col space-y-1'>
                  <Label className='text-muted-foreground flex items-center gap-2 text-xs font-medium sm:text-sm'>
                    <TagIcon className='size-4' />
                    Jogo
                  </Label>
                  <ExplorerGameFilter
                    selectedCategories={file.tag}
                    toggleCategory={(selected) =>
                      updateFile(file.id, {
                        tag: selected as string,
                        error: undefined,
                      })
                    }
                    buttonText={file.tag || 'Selecione um jogo...'}
                    buttonClassName={`justify-between ${file.error && 'border-destructive bg-red-500 text-destructive duration-0'}`}
                    align='start'
                    disabled={isUploading}
                  />
                </div>
              </div>
              {file.error && (
                <p className='text-destructive mt-1 text-xs'>{file.error}</p>
              )}
            </div>
          ))}

          {files.length > 1 && (
            <div>
              <Button
                size='sm'
                variant='outline'
                onClick={clearFiles}
                disabled={isUploading}
              >
                Remove all files
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
