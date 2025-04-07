'use client'

import debounce from 'lodash/debounce'
import { ChevronDown, Filter, Search, X } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { Input } from './ui/input'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { TabsContent } from './ui/tabs'

interface Game {
  id: number
  name: string
}

export const TabExplorerOption = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const initialCategories = useMemo(() => {
    return searchParams.getAll('category')
  }, [searchParams])

  const [searchResults, setSearchResults] = useState<Game[]>([])
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(initialCategories)

  const updateURLParams = (categories: string[]) => {
    const params = new URLSearchParams()
    categories.forEach((cat) => params.append('category', cat))
    router.replace(`?${params.toString()}`)
  }

  const toggleCategory = (category: string) => {
    let updated: string[]
    if (selectedCategories.includes(category)) {
      updated = selectedCategories.filter((c) => c !== category)
    } else {
      updated = [...selectedCategories, category]
    }
    setSelectedCategories(updated)
    updateURLParams(updated)
  }

  const updateCategoryParam = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setSearchResults([])
        return
      }

      const params = new URLSearchParams()
      params.append('q', value)

      try {
        const res = await fetch(`/api/game/category?${params.toString()}`)
        const { data } = await res.json()
        setSearchResults(data)
      } catch (error) {
        console.error('Erro na busca:', error)
      }
    }, 300),
    [router],
  )

  return (
    <TabsContent value='explorar' className='space-y-6'>
      <div className='flex flex-col gap-4'>
        <div className='relative flex items-start gap-2'>
          <div className='flex w-full flex-col gap-2'>
            <div className='relative flex items-center justify-center'>
              <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
              <Input
                type='text'
                placeholder='Pesquisar configurações...'
                className='pl-10'
              />
            </div>

            <div className='flex flex-wrap gap-2'>
              {selectedCategories.map((category) => (
                <Badge key={category} variant='outline' className='border-2'>
                  {category}
                  <span
                    className='text-muted-foreground'
                    onClick={() => toggleCategory(category)}
                  >
                    <X size={14} />
                  </span>
                </Badge>
              ))}
            </div>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline' className='!rounded-button gap-2'>
                <Filter className='h-4 w-4' />
                Filtrar
                <ChevronDown className='h-4 w-4' />
              </Button>
            </PopoverTrigger>

            <PopoverContent align='end' className='w-64 p-0'>
              <Command>
                <CommandInput
                  placeholder='Pesquisar jogos...'
                  onValueChange={updateCategoryParam}
                />
                <CommandList>
                  {searchResults.length === 0 ? (
                    <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                  ) : (
                    <CommandGroup>
                      {searchResults.map((game) => (
                        <CommandItem
                          key={game.id}
                          value={game.name}
                          onSelect={() => toggleCategory(game.name)}
                        >
                          {game.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </TabsContent>
  )
}
