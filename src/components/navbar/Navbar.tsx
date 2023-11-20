import Link from 'next/link'
import Image from 'next/image'
import { buttonVariants } from '../ui/button'
import { auth } from '@/lib/auth'
import UserMenu from './UserMenu'
import { getServerSession } from 'next-auth'
import SwitchTheme from '../SwitchTheme'

const Navbar = async () => {
  const session = await auth()

  return (
    <header className='sticky inset-x-0 top-0 z-40 border-b bg-background py-2'>
      <nav className='container flex items-center justify-between'>
        <Link href='/'>
          <Image
            src='/assets/logo.webp'
            alt='logo'
            priority
            width={50}
            height={50}
          />
        </Link>
        {session?.user ? (
          <UserMenu user={session.user} session={session} />
        ) : (
          <div className='flex items-center gap-4'>
            <SwitchTheme session={session} />
            <Link
              className={buttonVariants({ variant: 'outline' })}
              href='/sign-in'
            >
              Entrar
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
