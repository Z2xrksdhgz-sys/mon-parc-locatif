'use client'
import Link from 'next/link'
import { useState } from 'react'

const plans = [
  {
    id: 'start', name: 'START', desc: 'Pour démarrer avec un premier bien',
    priceMensuel: 6.90, priceAnnuel: 5.86, discount: 15,
    locations: '1 location', featured: false,
    features: ['Pilotage locatif complet','Génération des documents légaux','Comptabilité & Finance','Espace locataire','Stockage documents'],
    extra: 'Signature électronique : 2-3 € / unité',
  },
  {
    id: 'expert', name: 'EXPERT', desc: 'Pour les bailleurs avec plusieurs biens',
    priceMensuel: 15.80, priceAnnuel: 12.64, discount: 20,
    locations: "Jusqu'à 10 locations", featured: true,
    features: ['Pilotage locatif complet','Documents légaux illimités','Comptabilité & Finance','Espace locataire','Stockage documents','Signatures électroniques incluses','Multi-profils bailleurs (SCI, LMNP…)','Support téléphonique','Gestion des sinistres','Rapports avancés','Dossier crédit automatique','Accès communauté'],
    extra: null,
  },
  {
    id: 'rentier', name: 'RENTIER', desc: 'Pour les grands patrimoines',
    priceMensuel: 47.80, priceAnnuel: 33.46, discount: 30,
    locations: "Jusqu'à 50 locations", featured: false,
    features: ["Tout EXPERT inclus","Jusqu'à 50 locations","Support prioritaire dédié","Onboarding personnalisé"],
    extra: null,
  },
]

const faq = [
  {q:"Puis-je changer d'offre ?",r:"Oui, upgrade ou downgrade à tout moment. Changement immédiat, montant ajusté au prorata."},
  {q:"Y a-t-il un engagement ?",r:"Non. Résiliation possible à tout moment, avec effet à la fin de la période en cours."},
  {q:"Comment fonctionne la réduction annuelle ?",r:"En choisissant le paiement annuel, vous payez en une fois avec la réduction appliquée (15%, 20% ou 30% selon l'offre)."},
  {q:"La signature électronique est-elle légalement valable ?",r:"Oui. Conforme au règlement européen eIDAS, même valeur juridique qu'une signature manuscrite."},
  {q:"Mes données sont-elles sécurisées ?",r:"Données chiffrées AES-256, hébergées en Europe. Nous ne vendons jamais vos données."},
  {q:"Au-delà de 50 biens ?",r:"Nous proposons une offre sur mesure. Contactez-nous via le formulaire de contact."},
]

export default function TarifsPage() {
  const [annuel, setAnnuel] = useState(true)

  return (
    <div className="antialiased">
      <section className="bg-gradient-to-b from-orange-50 to-white py-16 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">Tarifs</p>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Simple et transparent.</h1>
          <p className="text-xl text-gray-500 font-normal leading-relaxed">3 offres adaptées à votre parc. Sans engagement, résiliable à tout moment.</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-medium transition-colors ${!annuel ? 'text-gray-900' : 'text-gray-400'}`}>Mensuel</span>
            <button
              onClick={() => setAnnuel(!annuel)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${annuel ? 'bg-orange-600' : 'bg-gray-300'}`}
              aria-label="Basculer paiement annuel"
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${annuel ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-medium transition-colors ${annuel ? 'text-gray-900' : 'text-gray-400'}`}>
              Annuel
              <span className="ml-2 inline-block bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full">jusqu&apos;à -30%</span>
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const price = annuel ? plan.priceAnnuel : plan.priceMensuel
              return (
                <div key={plan.id} className={`rounded-2xl p-8 flex flex-col relative border-2 transition-all ${plan.featured ? 'border-orange-500 bg-white shadow-xl shadow-orange-100' : 'border-gray-200 bg-white'}`}>
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs font-bold px-5 py-1.5 rounded-full whitespace-nowrap">Le plus populaire</div>
                  )}
                  <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${plan.featured ? 'text-orange-600' : 'text-gray-400'}`}>{plan.name}</div>
                  <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>
                  <div className="mb-1 min-h-[80px]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-gray-900 tabular-nums">{price.toFixed(2).replace('.', ',')}</span>
                      <span className="text-gray-400 text-lg">€</span>
                      <span className="text-sm text-gray-400">/mois</span>
                    </div>
                    {annuel ? (
                      <p className="text-sm text-orange-600 font-semibold mt-1">
                        Facturé {(price * 12).toFixed(2).replace('.', ',')} € / an — économisez {plan.discount}%
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400 mt-1">
                        ou <strong className="text-gray-700">{plan.priceAnnuel.toFixed(2).replace('.', ',')} €/mois</strong> en annuel (-{plan.discount}%)
                      </p>
                    )}
                  </div>
                  <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 w-fit mt-3 ${plan.featured ? 'bg-orange-50 text-orange-700' : 'bg-gray-100 text-gray-600'}`}>
                    🏠 {plan.locations}
                  </div>
                  <div className="border-t border-gray-100 mb-6" />
                  <ul className="space-y-3 flex-1 mb-6">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  {plan.extra && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-6 text-xs text-gray-500">
                      <span className="font-semibold text-gray-700">Option payante : </span>{plan.extra}
                    </div>
                  )}
                  <Link href={`/inscription?plan=${plan.id}&billing=${annuel ? 'annuel' : 'mensuel'}`}
                    className={`block text-center font-semibold py-3.5 rounded-xl transition-colors text-sm ${plan.featured ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}>
                    Démarrer avec {plan.name}
                  </Link>
                </div>
              )
            })}
          </div>

          <div className="mt-8 bg-orange-50 border border-orange-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-2">Sur mesure</p>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Plus de 50 biens ?</h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-lg">Offre personnalisée, onboarding dédié et support prioritaire pour les grands patrimoines.</p>
            </div>
            <Link href="/contact?sujet=sur-mesure" className="flex-shrink-0 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap">
              Nous contacter →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3 text-center">FAQ</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Questions fréquentes</h2>
          <div className="space-y-4">
            {faq.map(({q,r}) => (
              <div key={q} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{r}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-10">
            Autre question ? <Link href="/contact" className="text-orange-600 hover:text-orange-700 font-semibold">Contactez-nous</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
