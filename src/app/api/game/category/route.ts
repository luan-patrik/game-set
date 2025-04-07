import { searchGame } from '@/services/searchGame'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const { category } = z
    .object({
      category: z.union([z.string(), z.array(z.string())]).optional()
    })
    .parse({ category: url.searchParams.getAll('q') })

  try {
    const game = await searchGame(category)

    return NextResponse.json(game, { status: 200 })
  } catch (error) {
    console.error('Erro na busca de jogos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
