import EditorOutput from '@/components/editor/EditorOutput'
import { useGetUserPostSettings } from '@/hooks/use-get-user-post-settings'
import { auth } from '@/lib/auth'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { redirect } from 'next/navigation'

export async function gameSettingsPage() {
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

export default gameSettingsPage
