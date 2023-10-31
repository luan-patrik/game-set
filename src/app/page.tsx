import Editor from '@/components/editor/Editor'
import Home from '@/components/Home'
import { useGetAllPostSettings } from '@/hooks/use-get-all-post-settings'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'

export default async function PageHome() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['all'],
    queryFn: useGetAllPostSettings,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home />
    </HydrationBoundary>
  )
}
