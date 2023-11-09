import { z } from 'zod'

export const PostValidator = z.object({
  content: z.string().trim().max(5000),
  isPrivate: z.boolean().default(false),
})

export type PostCreationRequest = z.infer<typeof PostValidator>
