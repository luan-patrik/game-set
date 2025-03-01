'use client'

import { XIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'


export const UserAuthForm = () => {
  const router = useRouter()

  const signInWithGoogle = async () => {
    try {
      await signIn('google')
    } catch (error) {
      toast({
        title: 'Algo deu errado.',
        description: 'Ocorreu um erro ao fazer login com o Google.',
        variant: 'destructive',
      })
    }
  }

  const signInWithGithub = async () => {
    try {
      await signIn('github')
    } catch (error) {
      toast({
        title: 'Algo deu errado.',
        description: 'Ocorreu um erro ao fazer login com o Github.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className='fixed inset-0 z-50 bg-background'>
      <form className='container flex h-full items-center justify-center'>
        <Card className='relative'>
          <Button
            onClick={() => router.push('/')}
            type='button'
            title='Voltar ao início.'
            aria-label='Voltar para o início.'
            size='icon'
            variant='ghost'
            className='absolute right-2 top-2'
          >
            <XIcon className='h-[1.2rem] w-[1.2rem]' />
            <span className='sr-only'>Voltar para o início.</span>
          </Button>
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
