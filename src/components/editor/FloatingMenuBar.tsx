import { type Editor } from '@tiptap/react'
import ButtonMenuBar from './ButtonMenuBar'
import {
  CaseSensitive,
  FileMinus2,
  Heading1,
  Heading2,
  Heading3,
} from 'lucide-react'

interface FloatingMenuBarProps {
  editor: Editor
}

const FloatingMenuBar = ({ editor }: FloatingMenuBarProps) => {
  return (
    <div className='flex max-h-[14rem] flex-col items-start overflow-auto rounded-md border-2 bg-background p-2'>
      <ButtonMenuBar
        className='flex w-full items-center justify-start gap-4 rounded-md p-6 text-left'
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        <CaseSensitive className='sm:h-10 sm:w-10' />
        <div>
          <p>Texto</p>
          <span className='font-normal'>Comece a escrever com texto.</span>
        </div>
      </ButtonMenuBar>
      <ButtonMenuBar
        className='flex w-full items-center justify-start gap-4 rounded-md p-6 text-left'
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 className='sm:h-10 sm:w-10' />
        <div>
          <p>Título 1</p>
          <span className='font-normal'>Título de seção grande.</span>
        </div>
      </ButtonMenuBar>
      <ButtonMenuBar
        className='flex w-full items-center justify-start gap-4 rounded-md p-6 text-left'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className='sm:h-10 sm:w-10' />
        <div>
          <p>Título 2</p>
          <span className='font-normal'>Título de seção média.</span>
        </div>
      </ButtonMenuBar>
      <ButtonMenuBar
        className='flex w-full items-center justify-start gap-4 rounded-md p-6 text-left'
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className='sm:h-10 sm:w-10' />
        <div>
          <p>Título 3</p>
          <span className='font-normal'>Título de seção pequena.</span>
        </div>
      </ButtonMenuBar>
      <ButtonMenuBar
        className='flex w-full items-center justify-start gap-4 rounded-md p-6 text-left'
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <FileMinus2 className='sm:h-10 sm:w-10' />
        <div>
          <p>Divisor</p>
          <span className='font-normal'>Dividir blocos visualmente.</span>
        </div>
      </ButtonMenuBar>
    </div>
  )
}

export default FloatingMenuBar
