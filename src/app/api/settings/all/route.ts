import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const allPostSettings = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
      },
      where: {
        filesettings: {
          some: {},
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
