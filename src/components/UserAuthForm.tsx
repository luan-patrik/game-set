import { signIn } from '@/lib/auth'
import { XIcon } from 'lucide-react'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export const UserAuthForm = () => {
  return (
    <div className='bg-background fixed inset-0 z-50'>
      <div className='container flex h-full items-center justify-center'>
        <Card className='relative'>
          <Link
            href='/'
            title='Voltar ao início.'
            aria-label='Voltar para o início.'
            className={buttonVariants({
              variant: 'ghost',
              size: 'icon',
              className: 'absolute top-2 right-2',
            })}
          >
            <XIcon className='h-[1.2rem] w-[1.2rem]' />
            <span className='sr-only'>Voltar para o início.</span>
          </Link>
          <CardHeader>
            <CardTitle className='font-bold'>Entrar</CardTitle>
            <CardDescription className='text-base'>
              Escolha uma das alternativas abaixo para entrar.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <form
              action={async () => {
                'use server'
                await signIn('google')
              }}
              className='inline-flex w-full items-center justify-center'
            >
              <Button className='w-full' type='submit' variant='outline'>
                Entrar com Google
              </Button>
            </form>
            <form
              action={async () => {
                'use server'
                await signIn('github')
              }}
              className='inline-flex w-full items-center justify-center'
            >
              <Button className='w-full' type='submit' variant='outline'>
                Entrar com Github
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
