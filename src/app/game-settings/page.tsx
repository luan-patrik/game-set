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
import UploadSettings from '@/components/UploadSettings'

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
      <div className='flex flex-col gap-4 py-4'>
        <UploadSettings />
        <span className=' flex w-full items-center justify-center gap-2 text-lg font-bold uppercase before:h-[1px] before:w-full before:bg-ring before:content-["_"] after:h-[1px] after:w-full after:bg-ring after:content-["_"]'>
          OU
        </span>
        <EditorOutput />
      </div>
    </HydrationBoundary>
  )
}
