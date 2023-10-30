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
  const { data: session } = useSession()

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
    <div className="absolute inset-0 z-50 bg-background">
      <form className="container flex h-full items-center justify-center">
        <Tabs defaultValue="sign-in" className="min-h-[32rem] w-[32rem]">
          <TabsList>
            <TabsTrigger value="sign-in">Entrar</TabsTrigger>
            <TabsTrigger value="sign-up">Cadastrar</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <Card>
              <CardHeader>
                <CardTitle>Criar conta</CardTitle>
                <CardDescription>
                  Preencha os campos abaixo para criar a sua conta.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-2">
                  <Button
                    className="w-full"
                    type="button"
                    onClick={signInWithGoogle}
                  >
                    Entrar com Google
                  </Button>
                  <Button
                    className="w-full"
                    type="button"
                    onClick={signInWithGithub}
                  >
                    Entrar com Github
                  </Button>
                </div>
              </CardContent>
              <button type="submit">Submit</button>
            </Card>
          </TabsContent>
          <TabsContent value="signup"></TabsContent>
        </Tabs>
      </form>
    </div>
  )
}

export default UserAuthForm
