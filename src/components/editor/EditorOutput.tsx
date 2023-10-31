'use client'

import { useGetUserPostSettings } from '@/hooks/use-get-user-post-settings'
import Editor from './Editor'

const EditorOutput = () => {
  const { data, isLoading } = useGetUserPostSettings()

  if (isLoading) return 'Loading...'

  return <Editor content={data?.content || ''} />
}

export default EditorOutput
