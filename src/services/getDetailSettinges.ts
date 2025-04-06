import "server-only"

import { cookies } from 'next/headers'

export const getDetailSettings = async (name: string, id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const cookie = await cookies()
  const res = await fetch(
    `${baseUrl}/api/settings/detail?name=${name}&id=${id}`,
    {
      method: 'GET',
      cache: 'no-store',
      credentials: 'include',

      headers: {
        Cookie: cookie.toString(),
      },

      next: {
        tags: ['settings'],
      },
    },
  )

  if (!res.ok) {
    throw new Error('Erro ao buscar os arquivos.')
  }

  return res.json()
}
