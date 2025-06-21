import prisma from '@/lib/db'

export async function getAllFileSetting() {
  return prisma.fileSettings.findMany({
    where: {
      private: false,
    },
    select: {
      id: true,
      authorId: true,
      name: true,
      private: true,
      fileUrl: true,
      author: {
        select: {
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
