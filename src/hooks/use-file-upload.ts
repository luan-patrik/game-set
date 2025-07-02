// Atualizado com correções para evitar setState durante render de outro componente

'use client'

import type React from 'react'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type InputHTMLAttributes,
} from 'react'

export type FileMetadata = {
  name: string
  size: number
  type: string
  url: string
  id: string
}

export type FileWithPreview = {
  file: File | FileMetadata
  id: string
  isPrivate: boolean
  tag: string | null
  preview?: string
  error?: string
}

export type FileUploadOptions = {
  maxFiles?: number
  maxSize?: number
  minSize?: number
  accept?: string
  multiple?: boolean
  onFilesChange?: (files: FileWithPreview[]) => void | Promise<void>
  onFilesAdded?: (addedFiles: FileWithPreview[]) => void | Promise<void>
}

export type FileUploadState = {
  files: FileWithPreview[]
  isDragging: boolean
  errors: string[]
}

export type FileUploadActions = {
  addFiles: (files: FileList | File[]) => void
  updateFile: (id: string, update: Partial<FileWithPreview>) => void
  removeFile: (id: string) => void
  clearFiles: () => void
  clearErrors: () => void
  handleDragEnter: (e: DragEvent<HTMLElement>) => void
  handleDragLeave: (e: DragEvent<HTMLElement>) => void
  handleDragOver: (e: DragEvent<HTMLElement>) => void
  handleDrop: (e: DragEvent<HTMLElement>) => void
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  openFileDialog: () => void
  getInputProps: (
    props?: InputHTMLAttributes<HTMLInputElement>,
  ) => InputHTMLAttributes<HTMLInputElement> & {
    ref: React.Ref<HTMLInputElement>
  }
}

export const useFileUpload = (
  options: FileUploadOptions = {},
): [FileUploadState, FileUploadActions] => {
  const {
    maxFiles = Infinity,
    maxSize = Infinity,
    minSize = 0,
    accept = '*',
    multiple = false,
    onFilesChange,
    onFilesAdded,
  } = options

  const [state, setState] = useState<FileUploadState>({
    files: [],
    isDragging: false,
    errors: [],
  })

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    onFilesChange?.(state.files)
  }, [state.files, onFilesChange])

  const validateFile = useCallback(
    (file: File | FileMetadata): string | null => {
      if (file.size > maxSize) {
        return `O arquivo "${file.name}" excede o tamanho máximo de ${formatBytes(maxSize)}.`
      } else if (file.size < minSize) {
        return `O arquivo "${file.name}" é menor que o tamanho mínimo permitido de ${formatBytes(minSize)}.`
      }

      if (accept !== '*') {
        const acceptedTypes = accept.split(',').map((type) => type.trim())
        const fileType = file instanceof File ? file.type || '' : file.type
        const fileExtension = `.${file.name.split('.').pop()}`

        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith('.')) {
            return fileExtension.toLowerCase() === type.toLowerCase()
          }
          if (type.endsWith('/*')) {
            const baseType = type.split('/')[0]
            return fileType.startsWith(`${baseType}/`)
          }
          return fileType === type
        })

        if (!isAccepted) {
          return `O arquivo "${file.name}" não é um tipo de arquivo aceito.`
        }
      }

      return null
    },
    [accept, maxSize, minSize],
  )

  const createPreview = useCallback(
    (file: File | FileMetadata): string | undefined => {
      if (file instanceof File) {
        return URL.createObjectURL(file)
      }
      return file.url
    },
    [],
  )

  const generateUniqueId = useCallback((file: File | FileMetadata): string => {
    if (file instanceof File) {
      return `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    }
    return file.id
  }, [])

  const clearFiles = useCallback(() => {
    setState((prev) => {
      prev.files.forEach((file) => {
        if (
          file.preview &&
          file.file instanceof File &&
          file.file.type.startsWith('image/')
        ) {
          URL.revokeObjectURL(file.preview)
        }
      })

      if (inputRef.current) {
        inputRef.current.value = ''
      }

      return {
        ...prev,
        files: [],
        errors: [],
      }
    })
  }, [])

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      if (!newFiles || newFiles.length === 0) return

      const newFilesArray = Array.from(newFiles)
      const errors: string[] = []

      if (!multiple) {
        clearFiles()
      }

      setState((prev) => ({ ...prev, errors: [] }))

      const validFiles: FileWithPreview[] = []

      newFilesArray.forEach((file) => {
        if (multiple) {
          const isDuplicate = state.files.some(
            (existingFile) =>
              existingFile.file.name === file.name &&
              existingFile.file.size === file.size,
          )
          if (isDuplicate) return
        }

        const error = validateFile(file)
        if (error) {
          errors.push(error)
        } else {
          validFiles.push({
            file,
            id: generateUniqueId(file),
            isPrivate: false,
            tag: '',
            preview: createPreview(file),
          })
        }
      })

      if (validFiles.length > 0) {
        onFilesAdded?.(validFiles)
        setState((prev) => {
          const newFiles = !multiple
            ? validFiles
            : [...prev.files, ...validFiles]
          return {
            ...prev,
            files: newFiles,
            errors,
          }
        })
      } else if (errors.length > 0) {
        setState((prev) => ({
          ...prev,
          errors,
        }))
      }

      if (inputRef.current) {
        inputRef.current.value = ''
      }
    },
    [
      state.files,
      maxFiles,
      multiple,
      maxSize,
      validateFile,
      createPreview,
      generateUniqueId,
      clearFiles,
      onFilesAdded,
    ],
  )

  const updateFile = useCallback(
    (id: string, update: Partial<FileWithPreview>) => {
      setState((prev) => {
        const newFiles = prev.files.map((file) =>
          file.id === id ? { ...file, ...update } : file,
        )
        return {
          ...prev,
          files: newFiles,
        }
      })
    },
    [],
  )

  const removeFile = useCallback((id: string) => {
    setState((prev) => {
      const fileToRemove = prev.files.find((file) => file.id === id)
      if (
        fileToRemove?.preview &&
        fileToRemove.file instanceof File &&
        fileToRemove.file.type.startsWith('image/')
      ) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      return {
        ...prev,
        files: prev.files.filter((file) => file.id !== id),
        errors: [],
      }
    })
  }, [])

  const clearErrors = useCallback(() => {
    setState((prev) => ({
      ...prev,
      errors: [],
    }))
  }, [])

  const handleDragEnter = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setState((prev) => ({ ...prev, isDragging: true }))
  }, [])

  const handleDragLeave = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.currentTarget.contains(e.relatedTarget as Node)) return
    setState((prev) => ({ ...prev, isDragging: false }))
  }, [])

  const handleDragOver = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent<HTMLElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setState((prev) => ({ ...prev, isDragging: false }))

      if (inputRef.current?.disabled) return
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        addFiles(e.dataTransfer.files)
      }
    },
    [addFiles],
  )

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        addFiles(e.target.files)
      }
    },
    [addFiles],
  )

  const openFileDialog = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const getInputProps = useCallback(
    (props: InputHTMLAttributes<HTMLInputElement> = {}) => {
      return {
        ...props,
        type: 'file' as const,
        onChange: handleFileChange,
        accept: props.accept || accept,
        multiple: props.multiple !== undefined ? props.multiple : multiple,
        ref: inputRef,
      }
    },
    [accept, multiple, handleFileChange],
  )

  return [
    state,
    {
      addFiles,
      updateFile,
      removeFile,
      clearFiles,
      clearErrors,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      handleFileChange,
      openFileDialog,
      getInputProps,
    },
  ]
}

export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
