import { Settings } from '@prisma/client'

export type detailPostSettings = Settings & {
  filesettings: {
    authorId: string
    fileUrl: string
    name: string
    size: number,
    id: string
    settingsId: string
  }[]
}
