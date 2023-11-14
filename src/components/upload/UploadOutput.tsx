'use client'

import { useGetUserPostSettings } from '@/hooks/use-get-user-post-settings'
import UploadSettings from './UploadSettings'

const UploadOutput = () => {
  const { data, isLoading } = useGetUserPostSettings()

  if (isLoading) return 'Loading...'

  return (
    <div className='py-4'>
      <UploadSettings settingsId={data?.id || ''} />
    </div>
  )
}

export default UploadOutput
