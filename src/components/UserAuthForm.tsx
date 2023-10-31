'use client'

import { signIn, useSession } from 'next-auth/react'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { useToast } from './ui/use-toast'
import { redirect } from 'next/navigation'

const UserAuthForm = () => {
  const { toast } = useToast()

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
        <Card>
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

export default UserAuthForm
