import { Navbar } from '@/components/navbar/Navbar'
import { Providers } from '@/components/providers/Providers'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  preload: true,
  variable: '--inter-font',
})

export const metadata: Metadata = {
  title: 'Home - GameSet',
  description: 'Guardar configurações de jogos.',
  icons: {
    icon: '/assets/logo.webp',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='pt-BR' className={inter.variable} suppressHydrationWarning>
      <head />
      <body>
        <Providers>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className='container'>{children}</main>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
