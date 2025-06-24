import { SearchIcon } from 'lucide-react'
import { Input } from './ui/input'

interface ExplorerSearchConfigProps {
  inputValue: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ExplorerSearchConfigInput = ({
  inputValue,
  handleInputChange,
}: ExplorerSearchConfigProps) => {
  return (
    <div className='relative flex flex-1 items-center border-r'>
      <SearchIcon className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
      <Input
        type='text'
        placeholder='Pesquisar configurações...'
        className='border-none pl-10 shadow-none'
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  )
}
