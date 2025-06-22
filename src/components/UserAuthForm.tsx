'use client'

import { XIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Button, buttonVariants } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export const UserAuthForm = () => {
  const signInWithGoogle = async () => {
    try {
      await signIn('google')
    } catch (error) {
      toast('Algo deu errado.', {
        description: 'Ocorreu um erro ao fazer login com o Google.',
        className: 'bg-destructive',
      })
    }
  }

  const signInWithGithub = async () => {
    try {
      await signIn('github')
    } catch (error) {
      toast('Algo deu errado.', {
        description: 'Ocorreu um erro ao fazer login com o Github.',
        className: 'bg-destructive',
      })
    }
  }

  return (
    <div className='bg-background fixed inset-0 z-50'>
      <form className='container flex h-full items-center justify-center'>
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
            <Button
              className='w-full'
              type='button'
              onClick={signInWithGoogle}
              variant='outline'
            >
              Entrar com Google
            </Button>
            <Button
              className='w-full'
              type='button'
              onClick={signInWithGithub}
              variant='outline'
            >
              Entrar com Github
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
