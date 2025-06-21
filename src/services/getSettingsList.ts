'use server'

import { getAllFileSetting } from '@/lib/getAllFileSetting'
import { GameSetting } from '@/types/settings/GameSetting'
import { cache } from 'react'

export const getSettingsList = cache(async (): Promise<GameSetting> => {
  const data = await getAllFileSetting()

  return data
})
