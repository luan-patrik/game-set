export type GameSetting = {
  id: string
  name: string
  fileUrl: string
  size: number
  createdAt: Date | null
  tag: string
  author: {
    id: string
    name: string | null
    image: string | null
  }
}[]
