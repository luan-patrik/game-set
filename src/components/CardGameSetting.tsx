import { getFileContent } from '@/services/getFileContent'
import { CardGameSettingUI } from './CardGameSettingUI'

interface CardGameSettingProps {
  id: string
  name: string
  fileUrl: string
  tag: string
  size: number
  isPrivate: boolean
  createdAt: Date | null
  author: {
    id: string
    name: string | null
    image: string | null
  }
  isOwnerPage?: boolean
}

export const CardGameSetting = async ({
  id,
  name: fileName,
  fileUrl,
  tag,
  size,
  isPrivate,
  createdAt,
  author,
  isOwnerPage = false,
}: CardGameSettingProps) => {
  const content = await getFileContent(fileUrl)

  const renderContent = () => {
    if (typeof content === 'string' && content.startsWith('Erro:')) {
      return content
    }
    if (!content) return 'Nenhum conteúdo encontrado'
    if (typeof content === 'object') {
      return JSON.stringify(content, null, 2)
    }
    return content
  }

  return (
    <CardGameSettingUI
      id={id}
      fileName={fileName}
      fileUrl={fileUrl}
      tag={tag}
      size={size}
      isPrivate={isPrivate}
      createdAt={createdAt}
      author={author}
      content={renderContent()}
      isOwnerPage={isOwnerPage}
    />
  )
}
