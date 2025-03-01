import { z } from 'zod'

export const UploadValidator = z.object({
  name: z.string(),
  fileUrl: z.string().url(),
  size: z.number(),
  settingsId: z.string(),
})

export const DeleteUploadValidator = z.object({
  id: z.string(),
  fileUrl: z.string().url(),
})

export const ChangeUploadVisibility = z.object({
  id: z.string(),
  isPrivate: z.boolean().default(false),
})

export type UploadCreationRequest = z.infer<typeof UploadValidator>
export type UploadDeleteRequest = z.infer<typeof DeleteUploadValidator>
export type UploadChangeVisibilityRequest = z.infer<
  typeof ChangeUploadVisibility
>
