import { z } from 'zod'

export const searchSchema = z
  .string()
  .min(2, 'O termo de busca deve ter pelo menos 2 caracteres.')
  .trim()

export type SRequest = z.infer<typeof searchSchema>
