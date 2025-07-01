'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { Session } from 'next-auth'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface SwitchThemeProps {
  session: Session | null
}

export const SwitchTheme = ({ session }: SwitchThemeProps) => {
  const { setTheme, theme } = useTheme()

  return (
    <>
      {session ? (
        <DropdownMenuRadioGroup
          className='flex items-center justify-center gap-1'
          value={theme}
          onValueChange={setTheme}
        >
          <DropdownMenuRadioItem
            className='relative flex items-center justify-center px-4'
            value='dark'
            title='Escuro'
            aria-label='Escuro'
            onClick={() => {
              setTheme('dark')
            }}
          >
            <MoonIcon className='h-[1.2rem] w-[1.2rem]' />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className='relative flex items-center justify-center px-4'
            value='system'
            title='Sistema'
            aria-label='Sistema'
            onClick={() => {
              setTheme('system')
            }}
          >
            Auto
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className='relative flex items-center justify-center px-4'
            value='light'
            title='Claro'
            aria-label='Claro'
            onClick={() => {
              setTheme('light')
            }}
          >
            <SunIcon className='h-[1.2rem] w-[1.2rem]' />
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size='icon' variant='ghost'>
              <SunIcon className='h-[1.2rem] w-[1.2rem] dark:hidden' />
              <MoonIcon className='hidden h-[1.2rem] w-[1.2rem] dark:block' />
              <span className='sr-only'>Mudar tema</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='z-101'>
            <DropdownMenuItem
              title='Escuro'
              aria-label='Escuro'
              onClick={() => {
                setTheme('dark')
              }}
            >
              Escuro
            </DropdownMenuItem>
            <DropdownMenuItem
              title='Sistema'
              aria-label='Sistema'
              onClick={() => {
                setTheme('system')
              }}
            >
              Sistema
            </DropdownMenuItem>
            <DropdownMenuItem
              title='Claro'
              aria-label='Claro'
              onClick={() => {
                setTheme('light')
              }}
            >
              Claro
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
}
