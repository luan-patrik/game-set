'use client'

import { useGetDetailSettings } from '@/hooks/use-get-detail-post-settings'
import { Card, CardContent } from './ui/card'

interface DetailSettingsProps {
  name: string
  id: string
}

const DetailSettings = ({ name, id }: DetailSettingsProps) => {
  const { data, isLoading } = useGetDetailSettings(name, id)

  if (isLoading) return 'Loading...'

  return (
    <div className='py-4'>
      <Card className='prose prose-sm mx-auto w-full sm:prose lg:prose-lg focus:outline-none'>
        <CardContent
          className='p-2'
          dangerouslySetInnerHTML={{ __html: data?.content }}
        ></CardContent>
      </Card>
    </div>
  )
}

export default DetailSettings
