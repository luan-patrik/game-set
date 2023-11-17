import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import { UploadValidator } from '@/validators/upload'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const session = await auth()

    const body = await req.json()

    if (!session) {
      return new NextResponse('Unauthorized.', { status: 401 })
    }

    const { fileUrl, filename, settingsId } = UploadValidator.parse(body)

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

    if (fileCount >= 10) {
      console.log(fileCount)
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
          fileUrl,
          settingsId: createSettings.id,
          filename,
          authorId: session.user.id,
        },
      })
    }

    await prisma.fileSettings.create({
      data: {
        fileUrl,
        settingsId: settingsId,
        filename,
        authorId: session.user.id,
      },
    })

    return new NextResponse('Upload completed successfully.', { status: 201 })
  } catch (error) {
    return new NextResponse('', { status: 500 })
  }
}
