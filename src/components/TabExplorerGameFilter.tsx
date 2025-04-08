import { debounce } from 'lodash'
import { CheckCheck, ChevronDown, Filter, Loader2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Button } from './ui/button'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

interface TabExplorerGameFilterProps {
  selectedCategories: string[]
  toggleCategory: (category: string) => void
}

interface GameProps {
  id: number
  name: string
}

export const TabExplorerGameFilter = ({
  selectedCategories,
  toggleCategory,
}: TabExplorerGameFilterProps) => {
  const [searchResults, setSearchResults] = useState<GameProps[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value)
    fetchCategories(value)
  }, [])

  const fetchCategories = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setSearchResults([])
        return
      }

      setIsLoading(true)

      try {
        const params = new URLSearchParams({ q: value })
        const res = await fetch(`/api/game/category?${params.toString()}`)

        if (!res.ok) {
          throw new Error(`Erro na requisição: ${res.status}`)
        }

        const { data } = await res.json()
        const results = data || []

        setSearchResults(results)
      } catch (error) {
        setSearchResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300),
    [],
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='gap-2 rounded-md'>
          <Filter className='h-4 w-4' />
          Filtrar
          <ChevronDown className='h-4 w-4' />
        </Button>
      </PopoverTrigger>

      <PopoverContent align='end' className='w-64 p-0'>
        <Command>
          <CommandInput
            placeholder='Pesquisar jogos...'
            value={searchTerm}
            onValueChange={handleSearchChange}
          />
          <CommandList>
            {isLoading ? (
              <div className='flex items-center justify-center p-4'>
                <Loader2 className='h-4 w-4 animate-spin' />
                <span className='ml-2'>Carregando...</span>
              </div>
            ) : (
              <CommandGroup>
                {searchResults.map((game) => (
                  <CommandItem
                    className='flex items-center justify-between'
                    key={game.id}
                    value={game.name}
                    onSelect={() => toggleCategory(game.name)}
                  >
                    <span>{game.name}</span>
                    {selectedCategories.includes(game.name) && (
                      <CheckCheck size={14} />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
