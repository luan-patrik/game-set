'use client'

import { Session, User } from 'next-auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import UserAvatar from './UserAvatar'
import { HTMLAttributes } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import SwitchTheme from '../SwitchTheme'

interface UserMenuProps extends HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'image'>
  session: Session | null
}

const UserMenu = ({ user, session }: UserMenuProps) => {
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
        <DropdownMenuItem asChild>
          <Link href={'/edit-settings'}>Criar configurações</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <SwitchTheme session={session} />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='font-bold'
          onClick={() =>
            signOut({
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

export default UserMenu
