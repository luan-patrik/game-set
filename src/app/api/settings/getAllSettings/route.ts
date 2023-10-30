import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  try {
    const allPostSettings = await prisma.settings.findMany({
      where: {
        private: false,
      },
      select: {
        id: true,
        authorId: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })

    return new NextResponse(JSON.stringify(allPostSettings), { status: 200 })
  } catch (error) {
    return new NextResponse('There was an error receiving the posts.', {
      status: 500,
    })
  }
}
