'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import { changeUploadedVisibility } from '@/validators/upload'
import { revalidateTag } from 'next/cache'

export const changeFileVisibility = async (data: {
  id: string
  isPrivate: boolean
}) => {
  const session = await auth()

  if (!session) {
    return { success: false, error: 'Unauthorized.' }
  }

  try {
    const { id, isPrivate } = changeUploadedVisibility.parse(data)

    await prisma.fileSettings.update({
      where: {
        authorId: session.user.id,
        id,
      },
      data: {
        private: isPrivate,
      },
    })

    revalidateTag('settings')

    return { success: true, message: 'File visibility changed successfully.' }
  } catch (error) {
    return {
      success: false,
      error: 'Internal server error during visibility change.',
    }
  }
}
