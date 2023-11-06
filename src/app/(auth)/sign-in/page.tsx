import { auth } from '@/lib/auth'
import UserAuthForm from '../../../components/UserAuthForm'
import { redirect } from 'next/navigation'

export default async function PageSignIn() {
  const session = await auth()

  if (session) redirect('/')

  return <UserAuthForm />
}
