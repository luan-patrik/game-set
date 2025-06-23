'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import {
  UploadCreationRequest,
  uploadCreationSchema,
} from '@/validators/upload'
import { revalidateTag } from 'next/cache'

export const uploadFile = async (data: UploadCreationRequest) => {
  const session = await auth()

  if (!session) {
    return { success: false, error: 'Unauthorized.' }
  }

  try {
    const validation = uploadCreationSchema.safeParse(data)

    if (!validation.success) {
      return {
        success: false,
        error: 'Invalid data.',
        details: validation.error.errors,
      }
    }

    const { name, fileUrl, size, tag, isPrivate } = validation.data

    const fileCount = await prisma.fileSettings.count({
      where: {
        authorId: session.user.id,
      },
    })

    if (fileCount >= 12) {
      return { success: false, error: 'Exceeded upload limit.' }
    }

    const newUpload = await prisma.fileSettings.create({
      data: {
        name,
        fileUrl,
        size,
        tag,
        isPrivate,
        authorId: session.user.id,
      },
    })

    revalidateTag('settings')

    return { success: true, data: newUpload }
  } catch (error) {
    return {
      success: false,
      error: 'Internal server error during upload file.',
    }
  }
}
