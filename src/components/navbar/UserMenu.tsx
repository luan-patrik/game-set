'use client'

import { Session, User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { HTMLAttributes } from 'react'
import { SwitchTheme } from '../SwitchTheme'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { UserAvatar } from './UserAvatar'

interface UserMenuProps extends HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'image'>
  session: Session | null
}

export const UserMenu = ({ user, session }: UserMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ image: user.image || null }}
          className='h-10 w-10 ring-2 ring-foreground ring-offset-background'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem asChild>
          <Link href={'/upload-settings'}>Enviar configurações</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <SwitchTheme session={session} />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='font-bold'
          onClick={async () =>
            await signOut({
              callbackUrl: '/',
              redirect: true,
            })
          }
        >
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
