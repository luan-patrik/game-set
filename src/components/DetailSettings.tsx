'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import * as DOMPurify from 'dompurify'
import { useGetDetailSettings } from '@/hooks/use-get-detail-post-settings'
import { Card, CardContent } from './ui/card'

interface DetailSettingsProps {
  name: string
  id: string
}

const DetailSettings = ({ name, id }: DetailSettingsProps) => {
  const { data, isLoading } = useGetDetailSettings(name, id)

  if (isLoading) return 'Loading...'

  if (!data) return notFound()

  const clean = DOMPurify.sanitize(data.content, {
    USE_PROFILES: { html: true },
  })

  return (
    <div className='flex flex-col gap-2 py-4'>
      <div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
        {data.filesettings.map((item) => (
          <Link
            href={item.fileUrl}
            download={item.filename}
            target='_blank'
            translate='no'
            referrerPolicy='no-referrer'
            key={item.id}
            className='flex w-full min-w-0 max-w-[24rem] cursor-pointer justify-between gap-4 rounded-md border border-ring transition-colors hover:bg-muted'
          >
            <CardContent className='inline-block w-full overflow-hidden text-ellipsis whitespace-nowrap p-2 text-center'>
              {item.filename}
            </CardContent>
          </Link>
        ))}
      </div>

      {'Código escrito abaixo!'}

      <Card className='container prose mt-96 w-full'>
        <CardContent
          className='p-2'
          dangerouslySetInnerHTML={{ __html: clean }}
        ></CardContent>
      </Card>
    </div>
  )
}

export default DetailSettings
