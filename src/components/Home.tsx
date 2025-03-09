'use server'

import { getUsersWithPost } from '@/services/getUsersWithPosts'
import { allPostSettings } from '@/types/settings/allPostSettings'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from './ui/card'

export const Home = async () => {
  const data: allPostSettings = await getUsersWithPost()

  return (
    <div className='mx-auto grid grid-cols-1 place-items-center gap-4 py-4 sm:grid-cols-2 md:grid-cols-3'>
      {data &&
        data.map((item) => (
          <Link
            key={item.id}
            href={`/settings/${item.name}/${item.id}`}
            className='flex w-full max-w-72 justify-center'
          >
            <Card className='w-full overflow-hidden'>
              <div className='flex w-full min-w-0 flex-col items-center justify-center space-y-4 overflow-hidden px-2 py-10 text-center overflow-ellipsis whitespace-nowrap'>
                <Image
                  alt={`Avatar de ${item.name}`}
                  src={item.image}
                  priority
                  quality={100}
                  className='aspect-square rounded-full select-none'
                  width={224}
                  height={224}
                />
                <p className='w-full overflow-hidden text-ellipsis whitespace-nowrap'>
                  {item.name}
                </p>
              </div>
            </Card>
          </Link>
        ))}
    </div>
  )
}
