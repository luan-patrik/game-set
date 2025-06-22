'use server'

import { getAccessToken } from '@/lib/twitch'
import { searchSchema } from '@/validators/search'

interface GameProps {
  id: number
  name: string
}

export const getGameName = async (
  searchTermQuery: string,
): Promise<{ data: GameProps[] | null; error: string | null }> => {
  try {
    const searchTerm = searchSchema.parse(searchTermQuery)

    const token = await getAccessToken()

    if (!token) {
      return {
        data: null,
        error: 'Token de acesso não disponível para a API da Twitch.',
      }
    }

    const response = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID as string,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain',
      },
      body: `search "${searchTerm}"; fields name; limit 10;`,
      next: {
        revalidate: 3600,
      },
    })

    if (!response.ok) {
      return {
        data: null,
        error: `Erro ao buscar jogos no IGDB: ${response.status}`,
      }
    }

    const games = (await response.json()) as GameProps[]

    if (!Array.isArray(games)) {
      return {
        data: null,
        error: 'Formato de resposta inválido da API da IGDB.',
      }
    }

    const uniqueGames = Array.from(
      new Map(games.map((game) => [game.name.toLowerCase(), game])).values(),
    )

    return { data: uniqueGames, error: null }
  } catch (error) {
    return { data: null, error: 'Erro interno do servidor ao buscar jogos.' }
  }
}
