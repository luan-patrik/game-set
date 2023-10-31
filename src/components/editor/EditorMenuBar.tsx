import { Editor } from '@tiptap/react'
import { Button } from '../ui/button'
import {
  Bold,
  Code2,
  Codepen,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  Strikethrough,
} from 'lucide-react'

interface EditorMenuBarProps {
  editor: Editor
}

const EditorMenuBar = ({ editor }: EditorMenuBarProps) => {
  return (
    <div className='flex flex-wrap'>
      <Button
        size='icon'
        type='button'
        variant='ghost'
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <Bold className='h-6 w-6' />
      </Button>
      <Button
        size='icon'
        type='button'
        variant='ghost'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <Italic className='h-6 w-6' />
      </Button>
      <Button
        size='icon'
        type='button'
        variant='ghost'
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <Strikethrough className='h-6 w-6' />
      </Button>
      <Button
        size='icon'
        type='button'
        variant='ghost'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        <Codepen className='h-6 w-6' />
      </Button>
      <Button
        size='icon'
        type='button'
        variant='ghost'
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        <Code2 className='h-6 w-6' />
      </Button>
      <Button
        size='icon'
        type='button'
        variant='ghost'
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        <Heading1 className='h-6 w-6' />
      </Button>
      <Button
        size='icon'
        type='button'
        variant='ghost'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        <Heading2 className='h-6 w-6' />
      </Button>
      <Button
        size='icon'
        type='button'
        variant='ghost'
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        <Heading3 className='h-6 w-6' />
      </Button>
      <Button
        size='icon'
        type='button'
        variant='ghost'
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        <Heading4 className='h-6 w-6' />
      </Button>
      <Button
        size='icon'
        type='button'
        variant='ghost'
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        <Heading5 className='h-6 w-6' />
      </Button>
      <Button
        size='icon'
        type='button'
        variant='ghost'
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        <Heading6 className='h-6 w-6' />
      </Button>
    </div>
  )
}

export default EditorMenuBar
