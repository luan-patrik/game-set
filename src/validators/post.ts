import { z } from 'zod'

export const PostValidator = z.object({
  content: z.string().min(3, { message: '3 caracteres requiridos' }),
  isPrivate: z.boolean().default(false),
})

export type PostCreationRequest = z.infer<typeof PostValidator>
