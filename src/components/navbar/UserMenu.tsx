'use client'

import { User } from 'next-auth'
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

interface UserMenuProps extends HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'image'>
}

const UserMenu = ({ user }: UserMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ image: user.image || null }}
          className="h-10 w-10 ring-2 ring-foreground ring-offset-background"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={'/game-settings'}>Minhas configurações</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-bold" onClick={() => signOut()}>
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu
