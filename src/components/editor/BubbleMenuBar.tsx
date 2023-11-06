import { type Editor } from '@tiptap/react'
import { Button } from '../ui/button'
import { Bold, Code2, FileMinus2, Italic, Strikethrough } from 'lucide-react'
import ButtonMenuBar from './ButtonMenuBar'

interface BubbleMenuBarProps {
  editor: Editor
}

const BubbleMenuBar = ({ editor }: BubbleMenuBarProps) => {
  return (
    <div
      id='parent'
      className='flex flex-wrap items-center justify-center border-b bg-background p-2'
    >
      <ButtonMenuBar>Text</ButtonMenuBar>
      <ButtonMenuBar
        onClick={() => editor.chain().focus().toggleBold().run()}
        title='Negrito'
        data-active={editor.isActive('bold')}
      >
        <Bold className='h-4 w-4' />
      </ButtonMenuBar>
      <ButtonMenuBar
        onClick={() => editor.chain().focus().toggleItalic().run()}
        data-active={editor.isActive('italic')}
        title='Itálico'
      >
        <Italic className='h-4 w-4' />
      </ButtonMenuBar>
      <ButtonMenuBar
        onClick={() => editor.chain().focus().toggleStrike().run()}
        data-active={editor.isActive('strike')}
        title='Tachar'
      >
        <Strikethrough className='h-4 w-4' />
      </ButtonMenuBar>
      <ButtonMenuBar
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        data-active={editor.isActive('horizontalRule')}
        title='Linha horizontal'
      >
        <FileMinus2 className='h-4 w-4' />
      </ButtonMenuBar>
      <ButtonMenuBar
        onClick={() => editor.chain().focus().toggleCode().run()}
        data-active={editor.isActive('code')}
        title='Código'
      >
        <Code2 className='h-4 w-4' />
      </ButtonMenuBar>
    </div>
  )
}

export default BubbleMenuBar
