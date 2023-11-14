import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import EditorOutput from '@/components/editor/EditorOutput'
import { useGetUserPostSettings } from '@/hooks/use-get-user-post-settings'
import { auth } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Configurações',
  description: 'Editar configurações',
}

export default async function gameSettingsPage() {
  const session = await auth()

  if (!session) return redirect('/sign-in')

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: useGetUserPostSettings,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <EditorOutput />
    </HydrationBoundary>
  )
}
