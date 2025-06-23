import prisma from '@/lib/db'

export async function getAllFileSetting() {
  return prisma.fileSettings.findMany({
    where: {
      isPrivate: false,
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
