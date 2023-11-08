'use client'

import { useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { PostCreationRequest, PostValidator } from '@/validators/post'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { FormField } from '../ui/form'
import FloatingMenuBar from './FloatingMenuBar'
import BubbleMenuBar from './BubbleMenuBar'

const Editor = ({
  content,
  isPrivate,
}: {
  content: string
  isPrivate: boolean
}) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { register, getValues, setValue, handleSubmit, control } =
    useForm<PostCreationRequest>({
      resolver: zodResolver(PostValidator),
      defaultValues: {
        content: content,
        isPrivate: isPrivate,
      },
    })

  const editor = useEditor({
    autofocus: true,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Inicie colocando uma '/'",
        emptyNodeClass:
          'cursor-text before:content-[attr(data-placeholder)] before:absolute before:left-2 before:text-foreground/50 before-pointer-events-none',
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'outline-none',
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
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ['user'] })
      queryClient.refetchQueries({ queryKey: ['detail'] })
      router.push('/')
    },
    onError() {
      setIsLoading(false)
    },
  })

  const onSubmit = () => {
    const payload: PostCreationRequest = {
      content: getValues('content'),
      isPrivate: getValues('isPrivate'),
    }
    setIsLoading(true)
    create(payload)
  }

  return (
    <form
      className='flex flex-col gap-2 py-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <EditorContent
          value={getValues('content')}
          editor={editor}
          className='prose min-h-[16rem] min-w-full rounded-md p-2 ring-2 ring-ring'
        />

        {editor ? (
          <FloatingMenu
            editor={editor}
            tippyOptions={{
              placement: 'bottom-start',
            }}
            shouldShow={({ state }) => {
              const { $from } = state.selection

              const currentLineText = $from.nodeBefore?.textContent

              return currentLineText === '/'
            }}
          >
            <FloatingMenuBar editor={editor} />
          </FloatingMenu>
        ) : null}

        {editor ? (
          <BubbleMenu
            className='flex divide-x divide-foreground overflow-hidden rounded-md border border-solid border-foreground bg-background shadow-xl'
            editor={editor}
          >
            <BubbleMenuBar editor={editor} />
          </BubbleMenu>
        ) : null}
      </div>
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
      <Button disabled={isLoading} className='w-full' type='submit'>
        {isLoading ? <Loader2 className='h-6 w-6 animate-spin' /> : 'Enviar'}
      </Button>
    </form>
  )
}

export default Editor
