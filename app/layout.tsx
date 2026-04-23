import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Mon Parc Locatif — Gérez votre patrimoine locatif simplement',
  description:
    'Loyers, quittances, locataires, documents, incidents — pilotez votre parc locatif depuis un espace unique. À partir de 5,90 €/mois.',
  metadataBase: new URL('https://mon-parc-locatif.fr'),
  openGraph: {
    title: 'Mon Parc Locatif',
    description: 'La gestion locative simple pour les bailleurs autonomes.',
    url: 'https://mon-parc-locatif.fr',
    siteName: 'Mon Parc Locatif',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={jakarta.className}>{children}</body>
    </html>
  )
}