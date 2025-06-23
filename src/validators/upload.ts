import { z } from 'zod'

export const uploadCreationSchema = z.object({
  name: z.string(),
  fileUrl: z.string().url(),
  size: z.number(),
  isPrivate: z.boolean().default(false),
  tag: z.string().min(1, 'Adicione uma tag.'),
})

export const deleteUploadedSchema = z.object({
  id: z.string(),
  fileUrl: z.string().url(),
})

export const changeUploadedVisibility = z.object({
  id: z.string(),
  isPrivate: z.boolean().default(false),
})

export type UploadCreationRequest = z.infer<typeof uploadCreationSchema>
export type UploadDeleteRequest = z.infer<typeof deleteUploadedSchema>
export type UploadChangeVisibilityRequest = z.infer<
  typeof changeUploadedVisibility
>
