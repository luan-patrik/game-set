import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import { PostValidator } from '@/validators/post'
import { UploadValidator } from '@/validators/upload'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  console.log('passou aqui')
  try {
    const session = await auth()

    const body = await req.json()

    if (!session) {
      return new NextResponse('Unauthorized.', { status: 401 })
    }

    const { fileUrl, filename, settingsId } = UploadValidator.parse(body)

    let settings = await prisma.settings.findFirst({
      where: {
        authorId: session.user.id,
      },
    })

    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          authorId: session.user.id,
          content: '',
        },
      })
    }

    await prisma.fileSettings.create({
      data: {
        fileUrl,
        settingsId: settings.id || settingsId,
        filename,
        authorId: session.user.id,
      },
    })

    return new NextResponse('pload completed successfully.', { status: 201 })
  } catch (error) {
    return new NextResponse('', { status: 500 })
  }
}
