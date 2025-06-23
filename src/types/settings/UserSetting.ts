export type UserSetting = {
  id: string
  name: string | null
  image: string | null
  filesettings: {
    name: string
    id: string
    createdAt: Date | null
    fileUrl: string
    size: number
    isPrivate: boolean
    tag: string
  }[]
}
