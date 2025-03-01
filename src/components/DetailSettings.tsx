'use client'

import { useGetDetailSettings } from '@/hooks/use-get-detail-post-settings'
import { notFound } from 'next/navigation'
import { DetailUploadedSettings } from './DetailUploadedSettings'

interface DetailSettingsProps {
  name: string
  id: string
}

export const DetailSettings = ({ name, id }: DetailSettingsProps) => {
  const { data, isLoading } = useGetDetailSettings(name, id)

  if (isLoading) return 'Loading...'

  if (!data) return notFound()


  return (
    <div className='flex flex-col gap-4 py-4'>
      <div className='grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3'>
        {data.filesettings.map((item) => (
          <DetailUploadedSettings
            key={item.id}
            size={item.size}
            private={item.private}
            fileUrl={item.fileUrl}
            authorId={item.authorId}
            name={item.name}
            id={item.id}
            createdAt={item.createdAt}
          />
        ))}
      </div>
    </div>
  )
}
