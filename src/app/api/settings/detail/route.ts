import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(req: Request) {
  const url = new URL(req.url)

  const { name, id } = z
    .object({
      name: z.string(),
      id: z
        .string()
        .regex(/^[0-9A-Fa-f]+$/)
        .min(24)
        .max(24),
    })
    .parse({
      name: url.searchParams.get('name'),
      id: url.searchParams.get('id'),
    })

  try {
    const session = await auth()

    const data = await prisma.settings.findFirst({
      where: {
        id: id,
        OR: [
          {
            private: false,
          },
          {
            private: session?.user && true,
            authorId: session?.user.id,
          },
        ],
        author: { name: name },
      },
      include: {
        filesettings: true,
      },
    })
    return new NextResponse(JSON.stringify(data))
  } catch (error) {
    return new NextResponse('error', { status: 500 })
  }
}
