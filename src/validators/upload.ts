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

export type UploadCreationRequest = z.infer<typeof UploadValidator>
export type UploadDeleteRequest = z.infer<typeof DeleteUploadValidator>
