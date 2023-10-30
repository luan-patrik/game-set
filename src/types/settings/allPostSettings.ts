import { Settings } from '@prisma/client'

export type allPostSettings = Settings & {
  author: {
    name: string
    image: string
  }
}
