import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  console.log('API Route: Attempting to connect to DB and fetch file settings.')
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
    console.log('API Route: Successfully fetched file settings.')
    return new NextResponse(JSON.stringify(allPostSettings), {
      status: 200,
    })
  } catch (error) {
    console.error('API Route Error: Failed to fetch posts.', error)
    return new NextResponse('There was an error receiving the posts.', {
      status: 500,
    })
  }
}
