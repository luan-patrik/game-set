import { GlobeIcon, LockIcon } from 'lucide-react'
import { Button } from './button'

interface PrivacySwitchProps {
  isPrivate: boolean
  setIsPrivate: (isPrivate: boolean) => void
  disabled?: boolean
}

export const PrivacySwitch = ({
  isPrivate = false,
  setIsPrivate,
  disabled,
}: PrivacySwitchProps) => {
  return (
    <div className='bg-muted flex h-auto w-full max-w-fit flex-row rounded-md border p-0.5'>
      <Button
        variant={!isPrivate ? 'default' : 'ghost'}
        size='xs'
        onClick={() => setIsPrivate(false)}
        disabled={disabled}
        className='h-7.5 flex-1 gap-2 text-xs'
      >
        <GlobeIcon className='size-4' />
        Público
      </Button>
      <Button
        variant={isPrivate ? 'default' : 'ghost'}
        size='xs'
        onClick={() => setIsPrivate(true)}
        disabled={disabled}
        className='h-7.5 flex-1 gap-2 text-xs'
      >
        <LockIcon className='size-4' />
        Privado
      </Button>
    </div>
  )
}
