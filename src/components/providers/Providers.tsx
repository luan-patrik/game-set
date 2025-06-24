'use client'

import { ReactNode } from 'react'
import { EdgeStoreProvider } from './EdgeStoreProvider'

export const Providers = ({ children }: { children: ReactNode }) => {
  return <EdgeStoreProvider>{children}</EdgeStoreProvider>
}
