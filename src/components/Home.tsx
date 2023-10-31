'use client'

import { useGetAllPostSettings } from '@/hooks/use-get-all-post-settings'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'

const Home = () => {
  const { data, isLoading } = useGetAllPostSettings()

  if (isLoading) return 'Loading...'

  return (
    <div className='mx-auto grid grid-cols-1 place-items-center gap-4 py-4 sm:grid-cols-2  md:grid-cols-3'>
      {data &&
        data.map((item) => (
          <Link key={item.id} href={`/settings/${item.author.name}/${item.id}`}>
            <Card className='max-w-[18rem]'>
              <CardContent className='flex flex-col items-center justify-center space-y-4 px-2 py-10'>
                <Image
                  alt={`Avatar de ${item.author.name}`}
                  src={item.author.image}
                  quality={100}
                  className='select-none rounded-full'
                  width={224}
                  height={224}
                />
                <p className='text-xl font-semibold'>{item.author.name}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
    </div>
  )
}

export default Home
