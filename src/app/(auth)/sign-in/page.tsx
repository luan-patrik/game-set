import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { UserAuthForm } from '../../../components/UserAuthForm'

export default async function PageSignIn() {
  const session = await auth()
  
  if (session) redirect('/')

  return <UserAuthForm />
}
