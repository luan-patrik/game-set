'use server'

import { GameSetting } from '@/types/settings/game-setting'

export const getSettingsList = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const res = await fetch(`${baseUrl}/api/settings/all`, {
    method: 'GET',
    cache: 'force-cache',
    next: {
      tags: ['settings'],
    },
  })

  if (!res.ok) {
    throw new Error('Erro ao buscar os arquivos.')
  }

  return res.json() as Promise<GameSetting>
}
