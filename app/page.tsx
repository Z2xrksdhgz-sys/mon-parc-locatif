import Link from 'next/link'

function Check() {
  return (
    <svg className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const features = [
  { icon: '🏡', tag: '01 — Gérer', title: 'Gestion quotidienne',
    items: ['Tableau de bord KPIs en temps réel','Suivi des loyers + relances auto','Quittances PDF en 1 clic','Gestion candidatures et dossiers','États des lieux signés électroniquement','Messagerie bailleur / locataire','Coffre-fort documentaire'] },
  { icon: '📊', tag: '02 — Optimiser', title: 'Patrimoine & comptabilité',
    items: ['Multi-profils bailleurs (SCI, LMNP…)','Comptabilité locative par bien','Recettes, charges et résultat net','Rendement locatif automatique','Aide déclaration fiscale','Export comptable PDF / CSV'] },
  { icon: '🛡️', tag: '03 — Protéger', title: 'Risques & assurances',
    items: ['Suivi assurances PNO et GLI','Gestion structurée des incidents','Alertes DPE, amiante, diagnostics','Procédure recouvrement à J+30','Espace locataire pour incidents'] },
]

export default function Page() {
  return (
    <div className="antialiased">

      {/* ── HERO ── */}
      <section className="bg-gradient-to-b from-orange-50 to-white pt-10 pb-14 sm:pt-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 text-orange-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6 sm:mb-8 uppercase tracking-wide">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            Pour les propriétaires qui gèrent eux-mêmes
          </div>

          {/* Titre */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.08] mb-5 sm:mb-6 max-w-4xl">
            Vous louez un bien ?<br />
            <span className="text-orange-600">Gérez-le sans galère.</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-base sm:text-xl text-gray-500 leading-relaxed mb-8 sm:mb-10 max-w-2xl font-normal">
            Suivez vos loyers, générez vos quittances, gérez vos locataires et vos documents — le tout depuis un seul endroit. Que vous ayez 1 ou 50 biens, sans agence et sans comptable.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-12 sm:mb-16">
            <Link href="/inscription" className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-4 rounded-xl text-base transition-colors shadow-lg shadow-orange-200">
              Essayer — à partir de 6,90 €/mois
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7.5 3.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link href="#fonctionnalites" className="text-center text-gray-500 hover:text-gray-900 font-medium text-base transition-colors py-2">
              Voir comment ça marche →
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-10 pt-8 border-t border-gray-100">
            {[
              {n:'11',l:'modules de gestion'},
              {n:'3 offres',l:'pour tous les profils'},
              {n:'< 5 min',l:'pour créer votre espace'},
              {n:'100%',l:'conforme droit locatif français'},
            ].map(({n,l})=>(
              <div key={l}>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{n}</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PITCH RAPIDE ── */}
      <div className="bg-orange-600 py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="text-white text-lg sm:text-xl font-bold mb-1">Loyers, quittances, relances, documents — tout en un.</p>
            <p className="text-orange-100 text-sm">Plus besoin de jongler entre Excel, email et papier. Tout est centralisé, automatisé, accessible depuis votre téléphone.</p>
          </div>
          <Link href="/tarifs" className="flex-shrink-0 w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 bg-white text-orange-700 hover:bg-orange-50 font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
            Voir les tarifs
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7.5 3.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="fonctionnalites" className="py-14 sm:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-14">
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">Fonctionnalités</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Tout ce qu&apos;il faut, rien de superflu.</h2>
            <p className="text-base sm:text-lg text-gray-500 max-w-xl font-normal leading-relaxed">
              Trois piliers complémentaires couvrant l&apos;intégralité de votre activité locative.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {features.map(({icon,tag,title,items})=>(
              <div key={title} className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 hover:border-orange-200 hover:shadow-sm transition-all">
                <div className="text-3xl mb-4 sm:mb-5">{icon}</div>
                <p className="text-xs text-orange-600 font-semibold uppercase tracking-wider mb-2">{tag}</p>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-5">{title}</h3>
                <ul className="space-y-2.5">
                  {items.map(item=>(
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600"><Check />{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-10">
            <Link href="/fonctionnalites" className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 text-sm sm:text-base">
              Voir toutes les fonctionnalités →
            </Link>
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="py-14 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">Comment ça marche</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Opérationnel en moins de 10 minutes.</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 sm:gap-10 relative">
            <div className="hidden sm:block absolute top-7 left-[22%] right-[22%] h-px bg-gray-200" />
            {[
              {num:'01',title:'Créez votre espace',desc:"Inscrivez-vous en 2 minutes. Choisissez votre offre selon le nombre de biens à gérer."},
              {num:'02',title:'Ajoutez vos biens',desc:"Renseignez vos biens, vos locataires et les paramètres du loyer. Tout est guidé."},
              {num:'03',title:'Pilotez en temps réel',desc:"Validez les paiements, générez les quittances, recevez les alertes — tableau de bord unifié."},
            ].map(({num,title,desc})=>(
              <div key={num} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 sm:mb-5 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center text-orange-700 font-bold text-lg relative z-10">{num}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2 sm:mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-normal">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING APERÇU ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">Tarifs</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">À partir de 6,90 €/mois</h2>
          <p className="text-gray-500 mb-8 font-normal text-sm sm:text-base">3 offres adaptées à votre parc — sans engagement, résiliable à tout moment.</p>
          <Link href="/tarifs" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 sm:px-7 py-3.5 rounded-xl transition-colors text-sm sm:text-base">
            Voir tous les tarifs
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7.5 3.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-14 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-orange-500 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-orange-600 blur-3xl" />
            </div>
            <div className="relative z-10">
              <p className="text-xs sm:text-sm font-semibold text-orange-400 uppercase tracking-wider mb-3 sm:mb-4">Commencez aujourd&apos;hui</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-5 leading-tight">
                Votre parc, votre règle,<br />votre logiciel.
              </h2>
              <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-10 max-w-lg mx-auto font-normal leading-relaxed">
                Rejoignez les bailleurs qui pilotent leur patrimoine locatif depuis un espace unique. Sans engagement.
              </p>
              <Link href="/inscription" className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold px-6 sm:px-8 py-4 rounded-xl text-base sm:text-lg transition-colors w-full sm:w-auto">
                Créer mon espace — 6,90 €/mois
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7.5 3.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <p className="text-gray-600 text-xs sm:text-sm mt-4 sm:mt-5">Sans engagement · Résiliable à tout moment</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
