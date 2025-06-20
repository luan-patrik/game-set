'use server'

import { getAllSettings } from '@/lib/settings'

export const getSettingsList = async () => {
  return await getAllSettings()
}
