'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import * as DOMPurify from 'dompurify'
import { getDownloadUrl } from '@edgestore/react/utils'
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
    <div className='flex flex-col gap-4 py-4'>
      <div className='grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3'>
        {data.filesettings.map((item) => (
          <Link
            href={getDownloadUrl(item.fileUrl, item.filename)}
            key={item.id}
            className='flex w-full max-w-[20rem] cursor-pointer justify-between gap-4 rounded-md border border-ring transition-colors hover:bg-muted'
          >
            <CardContent className='inline-block w-full overflow-hidden text-ellipsis whitespace-nowrap p-2 text-center'>
              {item.filename}
            </CardContent>
          </Link>
        ))}
      </div>

      {data.content !== '' ? (
        <Card className='container prose w-full'>
          <CardContent
            className='p-2'
            dangerouslySetInnerHTML={{ __html: clean }}
          ></CardContent>
        </Card>
      ) : null}
    </div>
  )
}

export default DetailSettings
