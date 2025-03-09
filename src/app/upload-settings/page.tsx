import { UploadSettings } from '@/components/upload/UploadSettings'
import { auth } from '@/lib/auth'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Upload das configurações',
  description: 'Fazer upload das configurações',
}

export default async function UploadSettingsPage() {
  const session = await auth()

  if (!session) return redirect('/sign-in')

  return <UploadSettings />
}
