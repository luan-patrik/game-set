"use server"

import { cookies } from 'next/headers'

export const getUsersWithPost = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const cookie = await cookies()
  const res = await fetch(`${baseUrl}/api/settings/all`, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',

    headers: {
      Cookie: cookie.toString(),
    },

    next: {
      tags: ['settings'],
    },
  })

  if (!res.ok) {
    throw new Error('Erro ao buscar os usuários.')
  }

  return res.json()
}
