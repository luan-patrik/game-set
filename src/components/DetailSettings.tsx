'use client'

import { notFound } from 'next/navigation'
import DOMpurify from 'dompurify'
import { useGetDetailSettings } from '@/hooks/use-get-detail-post-settings'
import { Card, CardContent } from './ui/card'
import DetailUploadedSettings from './DetailUploadedSettings'

interface DetailSettingsProps {
  name: string
  id: string
}

const DetailSettings = ({ name, id }: DetailSettingsProps) => {
  const { data, isLoading } = useGetDetailSettings(name, id)

  if (isLoading) return 'Loading...'

  if (!data) return notFound()

  const clean = DOMpurify.sanitize(data.content, {
    USE_PROFILES: { html: true },
  })

  return (
    <div className='flex flex-col gap-4 py-4'>
      <div className='grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3'>
        {data.filesettings.map((item) => (
          <DetailUploadedSettings
            key={item.id}
            size={item.size}
            fileUrl={item.fileUrl}
            authorId={item.authorId}
            name={item.name}
            id={item.id}
          />
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
