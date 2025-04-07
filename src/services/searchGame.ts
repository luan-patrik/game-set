'use server'

import { getAccessToken } from '@/lib/twitch'

interface GameProps {
  id: number
  name: string
}

export const searchGame = async (category: string | string[] | undefined) => {
  if (!category) {
    return { data: [], status: 200 }
  }

  try {
    const token = await getAccessToken()

    const res = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID as string,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain',
      },
      body: `search "${category}"; fields name; limit 10;`,
    })

    if (!res.ok) {
      throw new Error('Erro ao buscar jogos')
    }

    const games = (await res.json()) as GameProps[]

    const uniqueGames = Array.from(
      new Map(games.map((game) => [game.name.toLowerCase(), game])).values(),
    )

    return { data: uniqueGames, status: 200 }
  } catch (error) {
    throw new Error('Erro interno do servidor')
  }
}
