export type GameSetting = {
  id: string
  authorId: string
  name: string
  fileUrl: string
  size: number
  createdAt: Date | null
  tag: string
  author: {
    name: string | null
    image: string | null
  }
}[]
