import { auth } from '@/lib/auth'
import Image from 'next/image'
import Link from 'next/link'
import { SwitchTheme } from '../SwitchTheme'
import { buttonVariants } from '../ui/button'
import { UserMenu } from './UserMenu'

export const Navbar = async () => {
  const session = await auth()

  return (
    <header className='bg-background sticky inset-x-0 top-0 z-40 border-b py-2'>
      <nav className='container flex items-center justify-between'>
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src='/assets/logo.webp'
            alt='logo'
            priority
            width={50}
            height={50}
          />
          <span className='text-xl font-semibold appearance-none'>GameSet</span>
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
