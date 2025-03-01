'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import { ReactNode, useState } from 'react'
import { EdgeStoreProvider } from './EdgeStoreProvider'

export const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute,
          },
        },
      }),
  )
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SessionProvider>
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}
