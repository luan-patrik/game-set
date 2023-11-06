import { z } from 'zod'

export const PostValidator = z.object({
  content: z.string().trim(),
  isPrivate: z.boolean().default(false),
})

export type PostCreationRequest = z.infer<typeof PostValidator>
