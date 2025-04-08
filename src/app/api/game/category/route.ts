import { getAccessToken } from '@/lib/twitch'
import { NextResponse } from 'next/server'
import { z } from 'zod'

interface GameProps {
  id: number
  name: string
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const { category } = z
    .object({
      category: z.union([z.string(), z.array(z.string())]).optional(),
    })
    .parse({ category: url.searchParams.getAll('q') })

  if (!category) {
    return NextResponse.json(
      { data: [], status: 200 },
      {
        headers: {
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        },
      },
    )
  }

  const searchTerm = Array.isArray(category) ? category[0] : category
  if (typeof searchTerm !== 'string' || searchTerm.trim().length < 2) {
    return NextResponse.json({
      data: [],
      status: 400,
      error: 'O termo de busca deve ter pelo menos 2 caracteres',
    })
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

    return NextResponse.json(
      { data: uniqueGames, status: 200 },
      {
        headers: {
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        },
      },
    )
  } catch (error) {
    console.error('Erro na busca de jogos:', error)
    return NextResponse.json(
      {
        data: [],
        status: 500,
        error:
          error instanceof Error ? error.message : 'Erro interno do servidor',
      },
      { status: 500 },
    )
  }
}
