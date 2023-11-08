'use client'

import * as DOMPurify from 'dompurify'
import { useGetDetailSettings } from '@/hooks/use-get-detail-post-settings'
import { Card, CardContent } from './ui/card'
import { notFound } from 'next/navigation'

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
    <div className='py-4'>
      <Card className='prose mx-auto w-full'>
        <CardContent
          className='p-2'
          dangerouslySetInnerHTML={{ __html: clean }}
        ></CardContent>
      </Card>
    </div>
  )
}

export default DetailSettings
