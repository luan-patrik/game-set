import { z } from 'zod'

export const PostValidator = z.object({
  content: z
    .string()
    .trim()
    .max(5000, { message: 'Máximo de caracteres atingido.' }),
  isPrivate: z.boolean().default(false),
})

export type PostCreationRequest = z.infer<typeof PostValidator>
