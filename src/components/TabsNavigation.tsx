'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TabExplorerOption } from './TabExplorerOption'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'

export const TabsNavigation = () => {
  const pathname = usePathname()

  const pathToTabValue: Record<string, string> = {
    '/': 'explorar',
    '/adicionar': 'adicionar',
    '/minhas-configs': 'configs',
  }

  const currentTab = pathToTabValue[pathname] || 'explorar'
  return (
    <div className='container my-2 flex flex-col gap-4'>
      <Tabs value={currentTab} className='w-full'>
        <TabsList className='grid h-auto w-full grid-cols-3'>
          <TabsTrigger
            asChild
            value='explorar'
            className='!rounded-button whitespace-nowrap'
          >
            <Link prefetch={true} href='/' aria-label='Explorar'>
              Explorar
            </Link>
          </TabsTrigger>
          <TabsTrigger
            asChild
            value='adicionar'
            className='!rounded-button whitespace-nowrap'
          >
            <Link prefetch={true} href='/adicionar' aria-label='Adicionar'>
              Adicionar
            </Link>
          </TabsTrigger>
          <TabsTrigger
            asChild
            value='configs'
            className='!rounded-button whitespace-nowrap'
          >
            <Link
              prefetch={true}
              href='/minhas-configs'
              aria-label='Minhas Configs'
            >
              Minhas Configs
            </Link>
          </TabsTrigger>
        </TabsList>
        <TabExplorerOption />
      </Tabs>
    </div>
  )
}
