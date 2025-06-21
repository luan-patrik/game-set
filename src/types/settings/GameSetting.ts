export type GameSetting = {
  id: string
  authorId: string
  name: string
  private: boolean
  fileUrl: string
  author: {
    name: string | null
    image: string | null
  }
}[]
