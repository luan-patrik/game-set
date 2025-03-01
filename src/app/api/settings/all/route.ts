import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await auth()

    const allPostSettings = await prisma.settings.findMany({
      select: {
        id: true,
        authorId: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        filesettings: true,
      },
    })

    return new NextResponse(JSON.stringify(allPostSettings), { status: 200 })
  } catch (error) {
    return new NextResponse('There was an error receiving the posts.', {
      status: 500,
    })
  }
}
