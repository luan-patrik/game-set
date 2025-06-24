'use client'

import { debounce } from 'lodash'
import { FunnelIcon, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { startTransition, useCallback, useEffect, useState } from 'react'
import { ExplorerGameFilter } from './ExplorerGameFilter'
import { ExplorerSearchConfigInput } from './ExplorerSearchConfigInput'
import { Badge } from './ui/badge'

export const ExplorerOption = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [inputValue, setInputValue] = useState(searchParams.get('search') || '')

  const selectedCategories: string[] = searchParams.getAll('category')

  const debouncedUpdateSearchParams = useCallback(
    debounce((value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set('search', value)
      } else {
        params.delete('search')
      }
      startTransition(() => {
        router.push(`?${params.toString()}`, { scroll: false })
      })
    }, 500),
    [router, searchParams],
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    debouncedUpdateSearchParams(value)
  }

  useEffect(() => {
    return () => {
      debouncedUpdateSearchParams.cancel()
    }
  }, [debouncedUpdateSearchParams])

  const handleCategoriesChange = (categories: string | string[] | null) => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete('category')

    if (Array.isArray(categories)) {
      categories.forEach((cat) => params.append('category', cat))
    } else if (typeof categories === 'string') {
      params.append('category', categories)
    }

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false })
    })
  }

  return (
    <div className='flex w-full flex-col gap-2'>
      <div className='flex items-center border shadow-xs'>
        <ExplorerSearchConfigInput
          inputValue={inputValue}
          handleInputChange={handleInputChange}
        />
        <ExplorerGameFilter
          selectedCategories={selectedCategories}
          toggleCategory={handleCategoriesChange}
          buttonIcon={<FunnelIcon className='h-4 w-4' />}
          buttonClassName='border-none'
          multiple={true}
        />
      </div>

      {selectedCategories.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {selectedCategories.map((category) => (
            <Badge
              key={category}
              variant='outline'
              className='bg bg-background flex items-center gap-1 border-2'
            >
              {category}
              <button
                className='text-muted-foreground hover:text-foreground focus:outline-none'
                onClick={() =>
                  handleCategoriesChange(
                    selectedCategories.filter((c) => c !== category),
                  )
                }
                aria-label={`Remover categoria ${category}`}
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
