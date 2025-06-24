import { CardGameSetting } from '@/components/CardGameSetting'
import { ExplorerOption } from '@/components/ExplorerOption'
import { getSettingsList } from '@/services/getSettingsList'
import { Suspense } from 'react'

interface HomePageProps {
  searchParams: {
    search?: string
    category?: string | string[]
  }
}
export default async function Home({ searchParams }: HomePageProps) {
  const searchText = searchParams.search?.trim()
  const categories = searchParams.category
  const categoriesArray = Array.isArray(categories)
    ? categories
    : categories
      ? [categories]
      : []

  const data = await getSettingsList(searchText, categoriesArray)

  return (
    <div className='mt-4 space-y-4'>
      <ExplorerOption />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Suspense fallback='Loading...'>
          {data.map((setting) => (
            <CardGameSetting key={setting.id} {...setting} />
          ))}
        </Suspense>
      </div>
    </div>
  )
}
