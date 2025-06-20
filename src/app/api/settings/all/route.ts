import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const allPostSettings = await prisma.fileSettings.findMany({
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

    return new NextResponse(JSON.stringify(allPostSettings), {
      status: 200,
    })
  } catch (error) {
    return new NextResponse('There was an error receiving the posts.', {
      status: 500,
    })
  }
}
