import Link from 'next/link'
import React from 'react'

export default async function NotFound() {
  return (
    <div className='flex min-h-[calc(100vh_-_4.2rem)] flex-col items-center justify-center'>
      <div>
        <h2 className='inline-block w-full text-center align-top text-4xl font-bold sm:mb-0 sm:mr-6 sm:w-fit sm:border-r sm:pb-0 sm:pr-6 sm:text-start'>
          404
        </h2>
        <hr className='my-4 sm:hidden' />
        <div className='inline-block w-full text-center align-top sm:w-fit sm:text-start sm:leading-10'>
          <h2>Página não encontrada.</h2>
        </div>
      </div>
    </div>
  )
}
