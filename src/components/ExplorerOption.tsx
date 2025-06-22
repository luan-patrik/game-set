'use client'

import { X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { ExplorerGameFilter } from './ExplorerGameFilter'
import { ExplorerSearchConfigInput } from './ExplorerSearchConfigInput'
import { Badge } from './ui/badge'

export const ExplorerOption = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [inputValue, setInputValue] = useState(searchParams.get('search') || '')

  const selectedCategories: string[] = searchParams.getAll('category')

  const updateSearchParams = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set('search', value)
      } else {
        params.delete('search')
      }
      router.push(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    updateSearchParams(value)
  }

  const toggleCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())

    const alreadySelected = selectedCategories.includes(category)
    if (alreadySelected) {
      const newParams = selectedCategories
        .filter((c) => c !== category)
        .map((c) => ['category', c])

      params.delete('category')
      newParams.forEach(([key, value]) => {
        params.append(key, value)
      })
    } else {
      params.append('category', category)
    }

    if (inputValue) {
      params.set('search', inputValue)
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <div className='rounded p-2'>
      <div className='flex w-full flex-col gap-2'>
        <div className='flex items-center border shadow-xs'>
          <ExplorerSearchConfigInput
            inputValue={inputValue}
            handleInputChange={handleInputChange}
          />
          <ExplorerGameFilter
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
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
                  onClick={() => toggleCategory(category)}
                  aria-label={`Remover categoria ${category}`}
                >
                  <X size={14} />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
