'use client'

import { useGetUserPostSettings } from '@/hooks/use-get-user-post-settings'
import Editor from './Editor'
import { notFound } from 'next/navigation'

const EditorOutput = () => {
  const { data, isLoading } = useGetUserPostSettings()

  if (isLoading) return 'Loading...'

  return <Editor content={data?.content || ''} isPrivate={data?.private || false} />
}

export default EditorOutput
