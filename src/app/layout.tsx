import { Navbar } from '@/components/navbar/Navbar'
import { Providers } from '@/components/providers/Providers'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  preload: true,
  variable: '--inter-font',
})

export const metadata: Metadata = {
  title: 'Game Set - Descubra e Compartilhe Configurações de Jogos',
  description:
    'Encontre, compartilhe e gerencie suas configurações favoritas de jogos. Junte-se à comunidade para explorar as melhores configurações para seus games preferidos.',
  keywords: [
    'configurações de jogos',
    'game settings',
    'otimização de jogos',
    'comunidade gamer',
    'compartilhar configs',
    'game config',
    'gaming community',
    'game optimization',
  ],
  openGraph: {
    title: 'Game Set - Descubra e Compartilhe Configurações de Jogos',
    description:
      'Encontre, compartilhe e gerencie suas configurações favoritas de jogos.',
    url: 'https://game-set-zeta.vercel.app',
    siteName: 'Game Set',
    images: [
      {
        url: '/assets/logo.webp',
        width: 800,
        height: 600,
        alt: 'Game Set Logo',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Game Set - Descubra e Compartilhe Configurações de Jogos',
    description:
      'Encontre, compartilhe e gerencie suas configurações favoritas de jogos.',
    images: ['/assets/logo.webp'],
  },
  icons: {
    icon: '/assets/logo.webp',
  },
  metadataBase: new URL('https://game-set-zeta.vercel.app'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='pt-BR' className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel='canonical' href='https://game-set-zeta.vercel.app' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Game Set',
              url: 'https://game-set-zeta.vercel.app',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://game-set-zeta.vercel.app/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
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
        <Toaster richColors />
      </body>
    </html>
  )
}
