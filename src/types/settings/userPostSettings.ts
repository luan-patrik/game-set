import { Settings } from '@prisma/client'

export type userPostSettings = Settings & {
  author: {
    name: string
    image: string
  }
}
