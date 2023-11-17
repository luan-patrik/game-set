import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import Navbar from '@/components/navbar/Navbar'

const inter = Inter({
  subsets: ['latin'],
  preload: true,
  variable: '--inter-font',
})

export const metadata: Metadata = {
  title: 'Home - GameSet',
  description: 'Guardar configurações de jogos.',
  icons: {
    icon: '/assets/logo.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='pt-BR' className={inter.variable}>
      <body className='dark'>
        <Providers>
          <Navbar />
          <main className='container'>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
