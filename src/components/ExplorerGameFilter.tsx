import { getGameName } from '@/services/getGameName'
import { debounce } from 'lodash'
import { CheckCheck, ChevronDown, Filter, Loader2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Button } from './ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

interface ExplorerGameFilterProps {
  selectedCategories: string[]
  toggleCategory: (category: string) => void
}

interface GameProps {
  id: number
  name: string
}

export const ExplorerGameFilter = ({
  selectedCategories,
  toggleCategory,
}: ExplorerGameFilterProps) => {
  const [searchResults, setSearchResults] = useState<GameProps[]>([])
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchCategories = async (value: string) => {
    const trimmedValue = value.trim()

    setHasSearched(true)

    if (!trimmedValue || trimmedValue.length < 2) {
      setSearchResults([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setSearchResults([])

    try {
      const { data, error } = await getGameName(trimmedValue)

      if (error) {
        console.error('Erro ao buscar categorias via Server Action:', error)
        setSearchResults([])
      } else {
        setSearchResults(data || [])
      }
    } catch (error) {
      console.error('Erro inesperado ao chamar Server Action:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const debouncedFetch = useCallback(
    debounce((value: string) => {
      fetchCategories(value)
    }, 500),
    [],
  )

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    debouncedFetch(value)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className='gap-2 rounded-md border-none shadow-none'
        >
          <Filter className='h-4 w-4' />
          Filtrar
          <ChevronDown className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' className='w-64 p-0'>
        <Command
          filter={(value, search) => {
            const normalizedValue = value.toLowerCase()
            const normalizedSearch = search.toLowerCase().trim()
            if (normalizedSearch.length < 2) return 1

            return normalizedValue.includes(normalizedSearch) ? 1 : 0
          }}
        >
          <CommandInput
            placeholder='Pesquisar jogos...'
            value={searchTerm}
            onValueChange={handleSearchChange}
          />
          <CommandList>
            {isLoading ? (
              <div className='flex items-center justify-center p-4'>
                <Loader2 className='h-4 w-4 animate-spin' />
                <span className='text-muted-foreground ml-2 text-sm'>
                  Carregando...
                </span>
              </div>
            ) : (
              <>
                {searchResults.length === 0 &&
                searchTerm.trim().length > 0 &&
                hasSearched ? (
                  <CommandEmpty>Nenhum jogo encontrado.</CommandEmpty>
                ) : searchResults.length > 0 ? (
                  <CommandGroup>
                    {searchResults.map((game) => (
                      <CommandItem
                        className='flex items-center justify-between'
                        key={game.id}
                        value={game.name.toLowerCase().trim()}
                        onSelect={() => toggleCategory(game.name)}
                      >
                        <span>{game.name}</span>
                        {selectedCategories.includes(game.name) && (
                          <CheckCheck size={14} className='text-primary' />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : (
                  <CommandEmpty>Pesquise algum nome de jogo.</CommandEmpty>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
