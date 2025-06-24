import { CardGameSetting } from '@/components/CardGameSetting'
import { ExplorerOption } from '@/components/ExplorerOption'
import { getSettingsList } from '@/services/getSettingsList'
import { Suspense } from 'react'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { search, category } = await searchParams

  const categoriesArray = Array.isArray(category)
    ? category
    : category
      ? [category]
      : []

  const data = await getSettingsList(search as string, categoriesArray)

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
