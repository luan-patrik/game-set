import { auth } from '@/lib/auth'
import UserAuthForm from '../../../components/UserAuthForm'
import { redirect } from 'next/navigation'

const page = async () => {
  const session = await auth()

  if (session) redirect('/')

  return <UserAuthForm />
}

export default page
