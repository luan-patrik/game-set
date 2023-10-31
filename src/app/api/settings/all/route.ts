import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { auth } from '@/lib/auth'

export async function GET() {
  try {
    const session = await auth()

    const allPostSettings = await prisma.settings.findMany({
      where: {
        OR: [
          {
            private: false,
          },
          {
            private: session?.user && true,
            authorId: session?.user.id,
          },
        ],
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
