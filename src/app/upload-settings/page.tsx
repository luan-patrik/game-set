import { UploadOutput } from '@/components/upload/UploadOutput'
import { useGetUserPostSettings } from '@/hooks/use-get-user-post-settings'
import { auth } from '@/lib/auth'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

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
