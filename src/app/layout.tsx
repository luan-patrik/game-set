import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/providers/Providers'
import Navbar from '@/components/navbar/Navbar'
import { Toaster } from '@/components/ui/toaster'
import ThemeProvider from '@/components/providers/ThemeProvider'

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
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
