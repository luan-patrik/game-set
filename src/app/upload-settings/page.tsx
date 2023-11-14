import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { useGetUserPostSettings } from '@/hooks/use-get-user-post-settings'
import { auth } from '@/lib/auth'
import UploadOutput from '@/components/upload/UploadOutput'

export const metadata: Metadata = {
  title: 'Upload das configurações',
  description: 'Fazer upload das configurações',
}

export default async function UploadSettingsPage() {
  const session = await auth()

  if (!session) return redirect('/sign-in')

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: useGetUserPostSettings,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UploadOutput />
    </HydrationBoundary>
  )
}
