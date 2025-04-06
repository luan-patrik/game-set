import 'server-only'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export const deleteFile = async (id: string, fileUrl: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const cookie = await cookies()

    const res = await fetch(`${baseUrl}/api/settings/upload`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie.toString(),
      },
      body: JSON.stringify({ id, fileUrl }),
      cache: 'no-store',
      credentials: 'include',
    })

    if (!res.ok) {
      throw new Error('Erro ao deletar arquivo')
    }

    revalidateTag('settings')
    return res.json()
  } catch (error) {
    console.error('Erro ao deletar arquivo:', error)
    throw error
  }
}
