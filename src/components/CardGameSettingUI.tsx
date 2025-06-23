import { auth } from '@/lib/auth'
import { getDownloadUrl } from '@edgestore/react/utils'
import { SaveIcon, User2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { DeleteButton } from './DeleteButton'
import { DialogViewConfig } from './DialogViewConfig'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Badge } from './ui/badge'
import { buttonVariants } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
interface CardGameSettingUIProps {
  id: string
  fileName: string
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
  content: string
  isOwnerPage?: boolean
}

export const CardGameSettingUI = async ({
  id,
  fileName,
  fileUrl,
  tag,
  size,
  isPrivate,
  createdAt,
  author,
  content,
  isOwnerPage,
}: CardGameSettingUIProps) => {
  const session = await auth()

  const isOwner = session?.user.id === author.id

  return (
    <Card key={id} className='gap-8'>
      <CardHeader className='gap-0'>
        <div className='flex items-start justify-between gap-1 overflow-x-hidden'>
          <div className='flex flex-col items-start overflow-x-hidden'>
            <Badge
              variant={'outline'}
              className='block w-full max-w-fit truncate text-xs'
            >
              {tag}
            </Badge>
            <CardTitle className='w-full max-w-fit truncate leading-normal'>
              {fileName}
            </CardTitle>
          </div>
          <Link
            href={getDownloadUrl(fileUrl, fileName)}
            className={buttonVariants({ variant: 'ghost', size: 'icon' })}
          >
            <SaveIcon className='size-4' />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <pre className='bg-muted overflow-hidden rounded-md p-3 font-mono text-xs text-ellipsis whitespace-nowrap'>
          {content.slice(0, 150)}
        </pre>
      </CardContent>

      <CardFooter className='flex justify-between gap-1'>
        {isOwnerPage && isOwner ? (
          <>
            <Badge variant={isPrivate ? 'secondary' : 'default'}>
              {isPrivate ? 'Privado' : 'Público'}
            </Badge>
            <div className='flex w-full justify-end'>
              <DeleteButton id={id} fileUrl={fileUrl} />
            </div>
          </>
        ) : (
          <Link
            href={`/perfil/${author.name}/${author.id}`}
            className='flex items-center gap-2 overflow-x-hidden'
          >
            <Avatar className='size-6'>
              {author.image ? (
                <Image
                  src={author.image}
                  alt={author.name || 'Avatar'}
                  width={24}
                  height={24}
                  className='rounded-full'
                  priority={false}
                />
              ) : (
                <AvatarFallback>
                  <User2Icon />
                </AvatarFallback>
              )}
            </Avatar>
            <span className='text-muted-foreground overflow-x-hidden text-sm text-ellipsis whitespace-nowrap'>
              {author.name}
            </span>
          </Link>
        )}
        <DialogViewConfig
          fileName={fileName}
          size={size}
          createdAt={createdAt}
          content={content}
          author={author}
          buttonVariant={isOwner && isOwnerPage ? 'default' : 'outline'}
        />
      </CardFooter>
    </Card>
  )
}
