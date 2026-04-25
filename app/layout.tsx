import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400','500','600','700'] })

export const metadata: Metadata = {
  title: 'Mon Parc Locatif — Gérez votre patrimoine locatif simplement',
  description: 'Loyers, quittances, locataires, documents, incidents — tout en un.',
  metadataBase: new URL('https://mon-parc-locatif.fr'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${jakarta.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
