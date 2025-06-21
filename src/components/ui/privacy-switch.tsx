import { GlobeIcon, LockIcon } from 'lucide-react'
import { Button } from './button'

interface PrivacySwitchProps {
  isPublic: boolean
  setIsPublic: (isPublic: boolean) => void
}

export const PrivacySwitch = ({
  isPublic,
  setIsPublic,
}: PrivacySwitchProps) => {
  return (
    <div className='bg-muted flex rounded-lg border p-1'>
      <Button
        variant={!isPublic ? 'default' : 'ghost'}
        size='sm'
        onClick={() => setIsPublic(false)}
        className='flex-1 gap-2'
      >
        <LockIcon className='size-4' />
        Private
      </Button>
      <Button
        variant={isPublic ? 'default' : 'ghost'}
        size='sm'
        onClick={() => setIsPublic(true)}
        className='flex-1 gap-2'
      >
        <GlobeIcon className='size-4' />
        Public
      </Button>
    </div>
  )
}
