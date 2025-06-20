import { getFileContent } from '@/services/getFileContent'
import { getDownloadUrl } from '@edgestore/react/utils'
import { SaveIcon, User2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { DialogViewConfig } from './DialogViewConfig'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
interface CardGameSettingProps {
  id: string
  name: string
  fileUrl: string
  author: {
    name: string | null
    image: string | null
  }
}

export const CardGameSetting = async ({
  id,
  name: fileName,
  fileUrl,
  author: { name, image },
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
    <Card key={id} className='gap-8'>
      <CardHeader className='gap-0'>
        <div className='flex items-start justify-between gap-1 overflow-x-hidden'>
          <div className='overflow-x-hidden'>
            <Badge variant='outline' className='mb-2'>
              War Thunder
            </Badge>
            <CardTitle className='overflow-hidden text-ellipsis whitespace-nowrap'>
              {fileName}
            </CardTitle>
          </div>
          <Button variant='ghost' size='icon' asChild>
            <Link href={getDownloadUrl(fileUrl, fileName)}>
              <SaveIcon className='size-4' />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <pre className='bg-muted overflow-hidden rounded-md p-3 font-mono text-xs text-ellipsis whitespace-nowrap'>
          {typeof content === 'object'
            ? JSON.stringify(content, null, 2).slice(0, 150)
            : String(content).slice(0, 150)}
        </pre>
      </CardContent>

      <CardFooter className='flex justify-between gap-1'>
        <div className='flex items-center gap-2 overflow-x-hidden'>
          <Avatar className='size-6'>
            {image ? (
              <Image
                src={image}
                alt={name || 'Avatar'}
                width={24}
                height={24}
                className='rounded-full'
                priority={false}
              />
            ) : (
              <AvatarFallback>
                <User2 />
              </AvatarFallback>
            )}
          </Avatar>
          <span className='text-muted-foreground overflow-x-hidden text-sm text-ellipsis whitespace-nowrap'>
            {name}
          </span>
        </div>
        <DialogViewConfig fileName={fileName} content={renderContent()} />
      </CardFooter>
    </Card>
  )
}
