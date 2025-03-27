import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const session = await auth()

  const { name, id } = z
    .object({
      name: z.string(),
      id: z
        .string()
        .regex(/^[0-9A-Fa-f]+$/)
        .length(24),
    })
    .parse({
      name: url.searchParams.get('name'),
      id: url.searchParams.get('id'),
    })

  try {
    const data = await prisma.user.findFirst({
      where: {
        name,
        id,
      },
      select: {
        name: true,
        filesettings: {
          where: {
            OR: [
              {
                private: session?.user && true,
                authorId: session?.user.id,
              },
              {
                private: false,
              },
            ],
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    return new NextResponse(JSON.stringify(data), { status: 200 })
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }), { status: 500 })
  }
}
