'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { PostCreationRequest, PostValidator } from '@/validators/post'
import EditorMenuBar from './EditorMenuBar'
import { Checkbox } from '../ui/checkbox'
import { FormField } from '../ui/form'

const Editor = ({ content }: { content: string }) => {
  const {
    getValues,
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      content: content,
      isPrivate: false,
    },
  })

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: getValues('content'),
    editorProps: {
      attributes: {
        class:
          'prose prose-strong:text-foreground prose-headings:text-foreground prose-code:text-foreground prose-p:text-foreground prose-code:bg-muted prose-code:rounded prose-code:p-0.5 border rounded-md min-h-[26rem] min-w-full focus-visible:outline p-2',
      },
    },
    onUpdate: ({ editor }) => {
      setValue('content', editor.getHTML())
    },
  })

  const { mutate: create } = useMutation({
    mutationFn: async ({ content, isPrivate }: PostCreationRequest) => {
      const payload: PostCreationRequest = {
        content,
        isPrivate,
      }
      const { data } = await axios.post('/api/settings/create', payload)

      return data
    },
  })

  const onSubmit = () => {
    const payload: PostCreationRequest = {
      content: getValues('content'),
      isPrivate: getValues('isPrivate'),
    }
    create(payload)
  }

  return (
    <form
      className='flex flex-col gap-2 py-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      {editor && <EditorMenuBar editor={editor} />}
      <EditorContent value={getValues('content')} editor={editor} />
      {errors && (
        <span className='text-sm text-destructive'>
          {errors.content?.message}
        </span>
      )}
      <FormField
        control={control}
        name='isPrivate'
        render={({ field }) => (
          <div className='flex items-center gap-2'>
            <Checkbox
              id='private'
              {...register('isPrivate')}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor='private' className='text-base'>
              Configurações privadas
            </label>
          </div>
        )}
      />
      <Button className='w-full' type='submit'>
        Enviar
      </Button>
    </form>
  )
}

export default Editor
