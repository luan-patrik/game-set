import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import { PostValidator } from '@/validators/post'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const session = await auth()

    const body = await req.json()

    if (!session) {
      return new NextResponse('Unauthorized.', { status: 401 })
    }

    const { content, isPrivate } = PostValidator.parse(body)

    const existingPost = await prisma.settings.findFirst({
      where: {
        authorId: session.user.id,
      },
    })
    if (
      content === existingPost?.content &&
      isPrivate === existingPost.private
    ) {
      return new NextResponse('No changes were made.', { status: 304 })
    }

    if (existingPost) {
      await prisma.settings.update({
        where: {
          id: existingPost.id,
        },
        data: {
          content,
          private: isPrivate,
        },
      })
      return new NextResponse('Game settings updated successfully.', {
        status: 200,
      })
    }

    await prisma.settings.create({
      data: {
        authorId: session.user.id,
        content,
        private: isPrivate,
      },
    })

    return new NextResponse('Post created successfully.', { status: 201 })
  } catch (error) {
    return new NextResponse('', { status: 500 })
  }
}
