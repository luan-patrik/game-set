import { type Editor } from '@tiptap/react'
import ButtonMenuBar from './ButtonMenuBar'
import { Heading1, Heading2, Heading3 } from 'lucide-react'

interface FloatingMenuBarProps {
  editor: Editor
}

const FloatingMenuBar = ({ editor }: FloatingMenuBarProps) => {
  return (
    <div className='flex max-h-[12rem] flex-col overflow-y-auto rounded-md bg-background p-2 text-left border-2'>
      <ButtonMenuBar
        className='flex items-center justify-start gap-2 rounded-md p-6 text-left'
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 className='h-10 w-10' />
        <span>Heading 1</span>
      </ButtonMenuBar>
      <ButtonMenuBar
        className='flex items-center justify-start gap-2 rounded-md p-6'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className='h-10 w-10' />
        <span>Heading 2</span>
      </ButtonMenuBar>
      <ButtonMenuBar
        className='flex items-center justify-start gap-2 rounded-md p-6'
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className='h-10 w-10' />
        <span>Heading 3</span>
      </ButtonMenuBar>
    </div>
  )
}

export default FloatingMenuBar
