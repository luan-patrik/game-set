import { AvatarProps } from '@radix-ui/react-avatar'
import { User } from 'next-auth'
import Image from 'next/image'
import { Avatar, AvatarFallback } from '../ui/avatar'

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'image'>
}

export const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className='relative aspect-square h-full'>
          <Image
            width={50}
            height={50}
            src={user.image}
            priority
            alt='Avatar'
            referrerPolicy='no-referrer'
          />
        </div>
      ) : (
        <AvatarFallback></AvatarFallback>
      )}
    </Avatar>
  )
}
