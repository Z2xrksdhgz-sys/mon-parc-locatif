'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/app/providers'

function KpiCard({ icon, label, value, sub, color = 'gray' }: {
  icon: string; label: string; value: string | number; sub?: string; color?: string
}) {
  const colors: Record<string, string> = {
    orange: 'bg-orange-50 border-orange-200',
    green: 'bg-green-50 border-green-200',
    red: 'bg-red-50 border-red-200',
    gray: 'bg-white border-gray-200',
  }
  return (
    <div className={`rounded-xl border p-4 sm:p-5 ${colors[color]}`}>
      <div className="text-xl sm:text-2xl mb-3">{icon}</div>
      <p className="text-2xl sm:text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-sm font-medium text-gray-600 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  )
}

export default function DashboardPage() {
  const { mplUser } = useAuth()
  const searchParams = useSearchParams()
  const isNewCheckout = searchParams?.get('checkout') === 'success'
  const [nbProfils, setNbProfils] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/mpl/profils')
      .then(r => r.json())
      .then(d => setNbProfils((d.profils || []).length))
      .catch(() => setNbProfils(0))
  }, [])

  const hasPlan = !!mplUser?.plan
  const hasProfil = nbProfils !== null && nbProfils > 0

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">

      {/* Bienvenue après checkout */}
      {isNewCheckout && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-5 mb-6 flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">🎉</span>
          <div>
            <p className="font-bold text-green-800">Bienvenue sur Mon Parc Locatif !</p>
            <p className="text-sm text-green-700 mt-0.5">
              Votre essai gratuit de 14 jours a démarré. Commencez par créer votre profil bailleur.
            </p>
          </div>
        </div>
      )}

      {/* Sans plan */}
      {!hasPlan && !isNewCheckout && (
        <div className="bg-orange-600 rounded-2xl p-5 sm:p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-white text-lg">Démarrez votre essai gratuit</p>
            <p className="text-orange-100 text-sm mt-0.5">14 jours gratuits · Aucun débit avant J+14 · Sans engagement</p>
          </div>
          <Link href="/inscription/plan"
            className="flex-shrink-0 w-full sm:w-auto text-center bg-white text-orange-700 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-orange-50 transition-colors">
            Choisir mon offre →
          </Link>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Bonjour {mplUser?.prenom || ''} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">Voici l&apos;état de votre parc locatif</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <KpiCard icon="🏠" label="Biens actifs" value={0} sub="Aucun bien ajouté" />
        <KpiCard icon="✅" label="Loyers perçus" value="0 €" sub="Ce mois-ci" color="green" />
        <KpiCard icon="⏳" label="En attente" value="0 €" sub="À percevoir" color="orange" />
        <KpiCard icon="📋" label="Locations actives" value={0} sub="Aucun locataire" />
      </div>

      {/* Onboarding */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-4 text-sm sm:text-base">🚀 Démarrer en 3 étapes</h2>
        <div className="space-y-3">
          {[
            {
              n: 1,
              done: hasProfil,
              label: 'Créer votre profil bailleur',
              sub: 'Nom propre, SCI, LMNP… choisissez votre structure juridique',
              href: '/dashboard/profils-bailleurs/nouveau',
            },
            {
              n: 2,
              done: false,
              label: 'Ajouter votre premier bien',
              sub: 'Renseignez l\'adresse, le type et la surface',
              href: '/dashboard/parc-locatif',
            },
            {
              n: 3,
              done: false,
              label: 'Créer votre première location',
              sub: 'Associez un locataire et paramétrez le loyer',
              href: '/dashboard/parc-locatif',
            },
          ].map(step => (
            <Link key={step.n} href={step.done ? '#' : step.href}
              className={`flex items-center gap-4 p-3 sm:p-4 rounded-xl border transition-all ${
                step.done
                  ? 'border-green-200 bg-green-50 cursor-default'
                  : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50'
              }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                step.done ? 'bg-green-500 text-white' : 'bg-orange-100 text-orange-700'
              }`}>
                {step.done ? '✓' : step.n}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${step.done ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                  {step.label}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{step.sub}</p>
              </div>
              {!step.done && (
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Actions rapides */}
      <div className="mb-6">
        <h2 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">Actions rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          <Link href="/dashboard/profils-bailleurs/nouveau"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-orange-600 hover:bg-orange-700 text-white transition-all">
            <span className="text-lg">👤</span>Créer un profil
          </Link>
          <Link href="/dashboard/parc-locatif"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 transition-all">
            <span className="text-lg">🏠</span>Ajouter un bien
          </Link>
          <Link href="/dashboard/locataires"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 transition-all">
            <span className="text-lg">👥</span>Inviter un locataire
          </Link>
          <Link href="/dashboard/comptabilite"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 transition-all">
            <span className="text-lg">💶</span>Déclarer un loyer
          </Link>
        </div>
      </div>

      {/* Événements + Activité */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <h2 className="font-bold text-gray-900 mb-3 text-sm">📅 Prochains événements</h2>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <span className="text-3xl mb-2">📭</span>
            <p className="text-sm text-gray-500">Aucun événement prévu</p>
            <p className="text-xs text-gray-400 mt-1">Révisions IRL, fins de bail, DPE…</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <h2 className="font-bold text-gray-900 mb-3 text-sm">🔔 Activité récente</h2>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <span className="text-3xl mb-2">📭</span>
            <p className="text-sm text-gray-500">Aucune activité récente</p>
            <p className="text-xs text-gray-400 mt-1">Paiements, messages, documents…</p>
          </div>
        </div>
      </div>

      {/* Upsell */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-5">
          <div className="text-2xl mb-3">🛡️</div>
          <h3 className="font-bold text-blue-900 mb-1 text-sm">Assurances locatives</h3>
          <p className="text-xs text-blue-700 mb-3 leading-relaxed">PNO, GLI, protection juridique.</p>
          <Link href="/dashboard/assurances" className="text-xs font-bold text-blue-700 hover:underline">Découvrir →</Link>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-5">
          <div className="text-2xl mb-3">📊</div>
          <h3 className="font-bold text-purple-900 mb-1 text-sm">Comptabilité & Fiscalité</h3>
          <p className="text-xs text-purple-700 mb-3 leading-relaxed">Déclarations fiscales, liasses LMNP.</p>
          <Link href="/dashboard/comptabilite" className="text-xs font-bold text-purple-700 hover:underline">Activer →</Link>
        </div>
      </div>
    </div>
  )
}
