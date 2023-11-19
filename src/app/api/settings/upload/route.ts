import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import { DeleteUploadValidator, UploadValidator } from '@/validators/upload'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const session = await auth()

    const body = await req.json()

    if (!session) {
      return new NextResponse('Unauthorized.', { status: 401 })
    }

    const { name, fileUrl, size, settingsId } = UploadValidator.parse(body)

    const settings = await prisma.settings.findFirst({
      where: {
        authorId: session.user.id,
      },
    })

    const fileCount = await prisma.fileSettings.count({
      where: {
        authorId: session.user.id,
      },
    })

    if (fileCount >= 12) {
      return new NextResponse('Exceeded upload limit', { status: 429 })
    }

    if (!settings) {
      const createSettings = await prisma.settings.create({
        data: {
          authorId: session.user.id,
          content: '',
        },
      })

      await prisma.fileSettings.create({
        data: {
          name,
          settingsId: createSettings.id,
          fileUrl,
          size,
          authorId: session.user.id,
        },
      })
    }

    await prisma.fileSettings.create({
      data: {
        name,
        fileUrl,
        size,
        settingsId: settingsId,
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
    return new NextResponse('File deleted successfully.', { status: 200 })
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 })
  }
}
