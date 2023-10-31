import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await auth()

    if (!session) return new NextResponse('Unauthorized', { status: 401 })

    const data = await prisma.settings.findFirst({
      where: {
        authorId: session.user.id,
      },
    })
    return new NextResponse(JSON.stringify(data))
  } catch (error) {
    return new NextResponse('error', { status: 500 })
  }
}
