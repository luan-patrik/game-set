import { z } from 'zod'

export const UploadValidator = z.object({
  fileUrl: z.string().url(),
  filename: z.string(),
  settingsId: z.string(),
})

export type UploadCreationRequest = z.infer<typeof UploadValidator>
