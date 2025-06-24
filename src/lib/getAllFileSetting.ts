import prisma from '@/lib/db'
import { z } from 'zod'

const paramsSchema = z.object({
  search: z.optional(z.string()),
  category: z.optional(z.array(z.string())),
})

export async function getAllFileSetting(search?: string, category?: string[]) {
  const validation = paramsSchema.safeParse({ search, category })

  if (!validation.success) {
    throw new Error('Invalid input parameters: ' + validation.error.message)
  }

  const { search: validatedSearch, category: validatedCategory } =
    validation.data

  return prisma.fileSettings.findMany({
    where: {
      isPrivate: false,
      ...(validatedSearch && {
        OR: [{ name: { contains: validatedSearch, mode: 'insensitive' } }],
      }),
      ...(validatedCategory &&
        validatedCategory.length > 0 && {
          tag: {
            in: validatedCategory,
          },
        }),
    },
    select: {
      id: true,
      name: true,
      fileUrl: true,
      size: true,
      createdAt: true,
      tag: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}
