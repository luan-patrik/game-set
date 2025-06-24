'use server'

import { getUserAllFileSetting } from '@/lib/getUserAllFileSetting'
import { UserSetting } from '@/types/settings/UserSetting'
import { cache } from 'react'

export const getUserSettingsList = cache(
  async (name: string, id: string): Promise<UserSetting | null> => {
    const data = await getUserAllFileSetting(name, id)

    return data
  },
)
