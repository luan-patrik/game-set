'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { zodResolver } from '@hookform/resolvers/zod'
import StarterKit from '@tiptap/starter-kit'
import axios from 'axios'
import EditorMenuBar from './EditorMenuBar'
import { Button } from './ui/button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { PostCreationRequest, PostValidator } from '@/validators/post'
import { getSettings } from '@/actions/getSettings'
import { Settings } from '@prisma/client'
import { useGetPostSettings } from '@/hooks/use-get-post-settings'

const Editor = () => {
  const {
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      content: '',
    },
  })

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: getValues('content'),
    editorProps: {
      attributes: {
        class:
          'prose border rounded-md min-h-[26rem] min-w-full focus-visible:outline',
      },
    },
    onUpdate: ({ editor }) => {
      setValue('content', editor.getHTML())
    },
  })

  const { mutate: create } = useMutation({
    mutationFn: async ({ content }: PostCreationRequest) => {
      const payload: PostCreationRequest = {
        content,
      }
      const { data } = await axios.post('/api/settings/create', payload)

      return data
    },
  })

  const onSubmit = () => {
    const payload: PostCreationRequest = {
      content: getValues('content'),
    }
    create(payload)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container flex flex-col gap-2 py-4"
    >
      {editor && <EditorMenuBar editor={editor} />}
      <EditorContent value={getValues('content')} editor={editor} />
      {errors && (
        <span className="text-sm text-destructive">
          {errors.content?.message}
        </span>
      )}
      <Button className="w-full" type="submit">
        Enviar
      </Button>
    </form>
  )
}

export default Editor
