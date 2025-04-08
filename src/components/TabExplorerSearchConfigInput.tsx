import { Search } from 'lucide-react'
import { Input } from './ui/input'

interface TabExplorerSearchConfigProps {
  inputValue: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TabExplorerSearchConfigInput = ({
  inputValue,
  handleInputChange,
}: TabExplorerSearchConfigProps) => {
  return (
    <div className='relative flex items-center'>
      <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
      <Input
        type='text'
        placeholder='Pesquisar configurações...'
        className='pl-10'
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  )
}
