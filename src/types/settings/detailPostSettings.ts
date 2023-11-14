import { Settings } from '@prisma/client'

export type detailPostSettings = Settings & {
  filesettings: {
    authorId: string
    fileUrl: string
    filename: string
    id: string
    settingsId: string
  }[]
}
