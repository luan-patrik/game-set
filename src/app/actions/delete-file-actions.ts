'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import { deleteUploadedSchema } from '@/validators/upload'
import { revalidateTag } from 'next/cache'

export async function deleteFile(data: { id: string; fileUrl: string }) {
  const session = await auth()

  if (!session) {
    return { success: false, error: 'Unauthorized.' }
  }

  try {
    const { id, fileUrl } = deleteUploadedSchema.parse(data)

    await prisma.fileSettings.delete({
      where: {
        authorId: session.user.id,
        id,
        fileUrl,
      },
    })

    revalidateTag('settings')

    return { success: true, message: 'File deleted successfully.' }
  } catch (error) {
    return {
      success: false,
      error: 'Internal server error during file deletion.',
    }
  }
}
