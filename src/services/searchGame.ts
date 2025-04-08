'use server'

import { getAccessToken } from '@/lib/twitch'

interface GameProps {
  id: number
  name: string
}

interface SearchResult {
  data: GameProps[]
  status: number
  error?: string
}

export const searchGame = async (
  category: string | string[] | undefined,
): Promise<SearchResult> => {
  if (!category) {
    return { data: [], status: 200 }
  }

  const searchTerm = Array.isArray(category) ? category[0] : category
  if (typeof searchTerm !== 'string' || searchTerm.trim().length < 2) {
    return {
      data: [],
      status: 400,
      error: 'O termo de busca deve ter pelo menos 2 caracteres',
    }
  }

  try {
    const token = await getAccessToken()

    if (!token) {
      throw new Error('Token de acesso não disponível')
    }

    const res = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID as string,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain',
      },
      body: `search "${searchTerm}"; fields name; limit 10;`,
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(
        `Erro ao buscar jogos: ${res.status} - ${errorData.message || 'Erro desconhecido'}`,
      )
    }

    const games = (await res.json()) as GameProps[]

    if (!Array.isArray(games)) {
      throw new Error('Formato de resposta inválido da API')
    }

    const uniqueGames = Array.from(
      new Map(games.map((game) => [game.name.toLowerCase(), game])).values(),
    )

    return { data: uniqueGames, status: 200 }
  } catch (error) {
    console.error('Erro na busca de jogos:', error)
    return {
      data: [],
      status: 500,
      error:
        error instanceof Error ? error.message : 'Erro interno do servidor',
    }
  }
}
