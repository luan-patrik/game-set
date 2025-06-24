import prisma from '@/lib/db'
import { z } from 'zod'
import { auth } from './auth'

const paramsSchema = z.object({
  name: z.string(),
  id: z
    .string()
    .regex(/^[0-9A-Fa-f]+$/)
    .length(24, 'O ID deve ter 24 caracteres hexadecimais.'),
})

export async function getUserAllFileSetting(name: string, id: string) {
  const validation = paramsSchema.safeParse({ name, id })

  if (!validation.success) {
    console.error('Parâmetros inválidos:', validation.error)
    return null
  }

  const session = await auth()

  return prisma.user.findFirst({
    where: {
      name,
      id,
    },

    select: {
      id: true,
      name: true,
      image: true,
      filesettings: {
        where: {
          OR: [
            { isPrivate: session?.user && true, authorId: session?.user.id },
            { isPrivate: false },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })
}
