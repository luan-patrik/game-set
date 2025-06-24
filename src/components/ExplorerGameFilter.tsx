import { cn } from '@/lib/utils'
import { getGameName } from '@/services/getGameName'
import { debounce } from 'lodash'
import { CheckCheckIcon, ChevronDownIcon, Loader2 } from 'lucide-react'
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
  selectedCategories: string | string[] | null
  toggleCategory: (category: string | string[] | null) => void
  placeholder?: string
  buttonText?: string
  align?: 'end' | 'center' | 'start' | undefined
  buttonClassName?: string
  disabled?: boolean
  multiple?: boolean
  buttonIcon?: React.ReactNode
}

interface GameProps {
  id: number
  name: string
}

export const ExplorerGameFilter = ({
  selectedCategories,
  toggleCategory,
  placeholder = 'Pesquisar jogos...',
  buttonText = 'Filtrar',
  align = 'end',
  buttonClassName,
  disabled = false,
  multiple = false,
  buttonIcon,
}: ExplorerGameFilterProps) => {
  const [open, setOpen] = useState(false)
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

  const handleItemSelect = (gameName: string) => {
    if (multiple) {
      const currentSelection = Array.isArray(selectedCategories)
        ? selectedCategories
        : []
      if (currentSelection.includes(gameName)) {
        toggleCategory(currentSelection.filter((item) => item !== gameName))
      } else {
        toggleCategory([...currentSelection, gameName])
      }
    } else {
      toggleCategory(gameName)
      setOpen(false)
    }
  }

  const isItemSelected = (item: string) => {
    if (multiple) {
      return (
        Array.isArray(selectedCategories) && selectedCategories.includes(item)
      )
    } else {
      return selectedCategories === item
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'items-center justify-center gap-2 overflow-hidden rounded-md shadow-none',
            buttonClassName,
          )}
          disabled={disabled}
        >
          {buttonIcon}
          <span className='w-full max-w-fit truncate'>{buttonText}</span>
          <ChevronDownIcon className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className='w-64 p-0'>
        <Command
          filter={(value, search) => {
            const normalizedValue = value.toLowerCase()
            const normalizedSearch = search.toLowerCase().trim()
            if (normalizedSearch.length < 2) return 1

            return normalizedValue.includes(normalizedSearch) ? 1 : 0
          }}
        >
          <CommandInput
            placeholder={placeholder}
            value={searchTerm}
            onValueChange={handleSearchChange}
            disabled={disabled}
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
                        value={game.name}
                        onSelect={() => handleItemSelect(game.name)}
                      >
                        <span>{game.name}</span>

                        {isItemSelected(game.name) && (
                          <CheckCheckIcon className='text-primary size-3.5' />
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
