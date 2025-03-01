'use client'

import { useGetAllPostSettings } from '@/hooks/use-get-all-post-settings'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from './ui/card'

export const Home = () => {
  const { data, isLoading } = useGetAllPostSettings()

  if (isLoading) return 'Loading...'

  console.log(data)

  return (
    <div className='mx-auto grid grid-cols-1 place-items-center gap-4 py-4 sm:grid-cols-2 md:grid-cols-3'>
      {data &&
        data.map((item) => (
          <Link
            key={item.id}
            href={`/settings/${item.author.name}/${item.id}`}
            className='flex w-full max-w-[18rem] justify-center'
          >
            <Card className=' overflow-hidden'>
              <div className='flex w-full min-w-0 flex-col items-center justify-center space-y-4 overflow-hidden overflow-ellipsis whitespace-nowrap px-2 py-10 text-center'>
                <Image
                  alt={`Avatar de ${item.author.name}`}
                  src={item.author.image}
                  priority
                  quality={100}
                  className='aspect-square select-none rounded-full'
                  width={224}
                  height={224}
                />
                <p className='w-full overflow-hidden text-ellipsis whitespace-nowrap'>
                  {item.author.name}
                </p>
              </div>
            </Card>
          </Link>
        ))}
    </div>
  )
}
