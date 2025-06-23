import { UploadForm } from '@/components/upload/UploadForm'
import { auth } from '@/lib/auth'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Upload das configurações',
  description: 'Fazer upload das configurações',
}

export default async function UploadSettingsPage() {
  const session = await auth()

  if (!session) return redirect('/entrar')

  return (
    <div className='bg-background mt-4 space-y-4 rounded-md border p-6 shadow'>
      <h2 className='mb-4 text-2xl font-semibold'>Enviar Configurações</h2>
      <p className='text-muted-foreground mb-4'>
        Faça upload de suas configurações.
      </p>
      <UploadForm />
    </div>
  )
}
