'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const plans = [
  {
    id: 'start', name: 'START', desc: '1 bien · Idéal pour démarrer',
    monthly: 6.90, annual: 5.86, discount: 15, featured: false,
    features: ['Pilotage locatif','Documents légaux','Comptabilité & Finance','Espace locataire','Stockage documents'],
    extra: 'Signature électronique : 2-3 € / unité',
  },
  {
    id: 'expert', name: 'EXPERT', desc: "Jusqu'à 10 biens",
    monthly: 15.80, annual: 12.64, discount: 20, featured: true,
    features: ['Tout START inclus','Signatures électroniques incluses','Multi-profils bailleurs (SCI, LMNP…)','Support téléphonique','Rapports avancés','Accès communauté'],
    extra: null,
  },
  {
    id: 'rentier', name: 'RENTIER', desc: "Jusqu'à 50 biens",
    monthly: 47.80, annual: 33.46, discount: 30, featured: false,
    features: ["Tout EXPERT inclus","Support prioritaire dédié","Onboarding personnalisé"],
    extra: null,
  },
]

export default function PlanPage() {
  const router = useRouter()
  const [annuel, setAnnuel] = useState(true)
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')

  const handleSelect = async (planId: string) => {
    setLoading(planId)
    setError('')
    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, billing: annuel ? 'annual' : 'monthly' }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Erreur lors de la création du paiement.')
      }
    } catch {
      setError('Erreur réseau. Réessayez.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide mb-4">
            🎁 14 jours gratuits — Aucun débit avant J+14
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Choisissez votre offre
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Votre carte sera enregistrée mais <strong className="text-gray-700">aucun débit avant 14 jours</strong>. Résiliable à tout moment.
          </p>
        </div>

        {/* Étapes */}
        <div className="flex items-center gap-2 max-w-xs mx-auto mb-10">
          <div className="flex-1 h-1.5 bg-orange-600 rounded-full" />
          <div className="flex-1 h-1.5 bg-orange-600 rounded-full" />
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className={`text-sm font-medium ${!annuel ? 'text-gray-900' : 'text-gray-400'}`}>Mensuel</span>
          <button onClick={() => setAnnuel(!annuel)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${annuel ? 'bg-orange-600' : 'bg-gray-300'}`}>
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${annuel ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
          <span className={`text-sm font-medium ${annuel ? 'text-gray-900' : 'text-gray-400'}`}>
            Annuel <span className="ml-1 bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full">-30%</span>
          </span>
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl text-center">{error}</div>
        )}

        {/* Plans */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {plans.map((plan) => {
            const price = annuel ? plan.annual : plan.monthly
            const isLoading = loading === plan.id
            return (
              <div key={plan.id} className={`bg-white rounded-2xl border-2 p-6 flex flex-col relative transition-all ${plan.featured ? 'border-orange-500 shadow-xl shadow-orange-100' : 'border-gray-200'}`}>
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs font-bold px-5 py-1.5 rounded-full whitespace-nowrap">
                    Le plus populaire
                  </div>
                )}
                <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${plan.featured ? 'text-orange-600' : 'text-gray-400'}`}>{plan.name}</div>
                <p className="text-xs text-gray-500 mb-4">{plan.desc}</p>
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900 tabular-nums">{price.toFixed(2).replace('.', ',')}</span>
                    <span className="text-gray-400">€/mois</span>
                  </div>
                  {annuel && (
                    <p className="text-xs text-orange-600 font-semibold mt-1">
                      Facturé {(price * 12).toFixed(2).replace('.', ',')} € / an · -{plan.discount}%
                    </p>
                  )}
                </div>
                <div className="border-t border-gray-100 mb-4" />
                <ul className="space-y-2.5 flex-1 mb-5">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.extra && (
                  <p className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2 mb-4">+ {plan.extra}</p>
                )}
                <button onClick={() => handleSelect(plan.id)} disabled={!!loading}
                  className={`w-full font-semibold py-3.5 rounded-xl transition-colors text-sm disabled:opacity-60 ${plan.featured ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}>
                  {isLoading ? 'Redirection...' : `Démarrer 14j gratuits avec ${plan.name}`}
                </button>
              </div>
            )
          })}
        </div>

        {/* Garanties */}
        <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              { icon: '🎁', title: '14 jours gratuits', desc: 'Aucun débit avant la fin de la période d\'essai' },
              { icon: '🔓', title: 'Sans engagement', desc: 'Résiliation en 1 clic, à tout moment' },
              { icon: '🔒', title: 'Paiement sécurisé', desc: 'Traité par Stripe · Données chiffrées' },
            ].map(({ icon, title, desc }) => (
              <div key={title}>
                <div className="text-2xl mb-1">{icon}</div>
                <p className="text-sm font-semibold text-gray-900">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Plus de 50 biens ?{' '}
          <Link href="/contact?sujet=sur-mesure" className="text-orange-600 hover:underline">Contactez-nous pour une offre sur mesure</Link>
        </p>
      </div>
    </div>
  )
}
