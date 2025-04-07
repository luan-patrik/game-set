import { getDetailSettings } from '@/services/getDetailSettings'
import { detailPostSettings } from '@/types/settings/detailPostSettings'
import { notFound } from 'next/navigation'
import { DetailUploadedSettings } from './DetailUploadedSettings'

interface DetailSettingsProps {
  name: string
  id: string
}

export const DetailSettings = async ({ name, id }: DetailSettingsProps) => {
  const data: detailPostSettings = await getDetailSettings(name, id)

  if (!data || data.filesettings.length < 1) return notFound()

  return (
    <div className='flex flex-col gap-4 py-4'>
      <h1 className='text-xl font-semibold sm:text-3xl'>{data.name}</h1>
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
