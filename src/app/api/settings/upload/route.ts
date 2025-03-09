import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import {
  ChangeUploadVisibility,
  DeleteUploadValidator,
  UploadValidator,
} from '@/validators/upload'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const session = await auth()

    const body = await req.json()

    if (!session) {
      return new NextResponse('Unauthorized.', { status: 401 })
    }

    const {
      name,
      fileUrl,
      size,
      private: isPrivate,
    } = UploadValidator.parse(body)

    const fileCount = await prisma.fileSettings.count({
      where: {
        authorId: session.user.id,
      },
    })

    if (fileCount >= 12) {
      return new NextResponse('Exceeded upload limit', { status: 429 })
    }

    await prisma.fileSettings.create({
      data: {
        name,
        fileUrl,
        private: isPrivate,
        size,
        authorId: session.user.id,
      },
    })

    return new NextResponse('Upload completed successfully.', { status: 201 })
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth()

    if (!session) {
      return new NextResponse('Unauthorized.', { status: 401 })
    }

    const body = await req.json()

    const { id, fileUrl } = DeleteUploadValidator.parse(body)

    await prisma.fileSettings.delete({
      where: {
        authorId: session.user.id,
        id,
        fileUrl,
      },
    })
    return new NextResponse(
      JSON.stringify({ message: 'File deleted successfully' }),
      { status: 200 },
    )
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth()

    if (!session) {
      return new NextResponse('Unauthorized.', { status: 401 })
    }

    const body = await req.json()

    const { id, isPrivate } = ChangeUploadVisibility.parse(body.data)

    await prisma.fileSettings.update({
      where: {
        authorId: session.user.id,
        id,
      },
      data: {
        private: isPrivate,
      },
    })
    return new NextResponse('File visibility changed successfully.', {
      status: 200,
    })
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 })
  }
}
