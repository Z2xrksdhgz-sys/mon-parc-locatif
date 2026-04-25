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
      <section className="bg-gradient-to-b from-orange-50 to-white pt-16 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 text-orange-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-8 uppercase tracking-wide">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            Gestion locative — Bailleurs autonomes
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] mb-6 max-w-4xl">
            Gérez votre parc locatif,{' '}
            <span className="text-orange-600">simplement.</span>
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl font-normal">
            Loyers, quittances, locataires, documents, incidents — tout ce dont un bailleur autonome a besoin pour piloter son patrimoine sans gestionnaire externe.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link href="/inscription" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-7 py-4 rounded-xl text-base transition-colors shadow-lg shadow-orange-200">
              Démarrer — 6,90 €/mois
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7.5 3.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link href="/fonctionnalites" className="text-gray-500 hover:text-gray-900 font-medium text-base transition-colors">
              Voir toutes les fonctionnalités →
            </Link>
          </div>
          <div className="flex flex-wrap gap-10 pt-8 border-t border-gray-100">
            {[{n:'11',l:'modules de gestion'},{n:'3 offres',l:'pour tous les profils'},{n:'< 5 min',l:'pour créer votre espace'},{n:'100%',l:'conforme droit locatif français'}].map(({n,l})=>(
              <div key={l}><div className="text-2xl font-bold text-gray-900">{n}</div><div className="text-sm text-gray-400 mt-0.5">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-orange-600 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white text-xl font-bold mb-1">1 espace. Tous vos biens. Zéro complexité.</p>
            <p className="text-orange-100 text-sm">Tableau de bord, loyers, quittances, locataires, documents — tout au même endroit.</p>
          </div>
          <Link href="/tarifs" className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-orange-700 hover:bg-orange-50 font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
            Voir les tarifs
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7.5 3.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </div>

      <section className="py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">Fonctionnalités</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tout ce qu&apos;il faut, rien de superflu.</h2>
            <p className="text-lg text-gray-500 max-w-xl font-normal leading-relaxed">Trois piliers complémentaires couvrant l&apos;intégralité de votre activité locative.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map(({icon,tag,title,items})=>(
              <div key={title} className="bg-white rounded-2xl border border-gray-200 p-7 hover:border-orange-200 hover:shadow-sm transition-all">
                <div className="text-3xl mb-5">{icon}</div>
                <p className="text-xs text-orange-600 font-semibold uppercase tracking-wider mb-2">{tag}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-5">{title}</h3>
                <ul className="space-y-2.5">
                  {items.map(item=>(
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600"><Check />{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/fonctionnalites" className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700">
              Voir toutes les fonctionnalités →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">Comment ça marche</p>
            <h2 className="text-4xl font-bold text-gray-900">Opérationnel en moins de 10 minutes.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-7 left-[22%] right-[22%] h-px bg-gray-200" />
            {[
              {num:'01',title:'Créez votre espace',desc:"Inscrivez-vous en 2 minutes. Choisissez votre offre selon le nombre de biens à gérer."},
              {num:'02',title:'Ajoutez vos biens',desc:"Renseignez vos biens, vos locataires et les paramètres du loyer. Tout est guidé."},
              {num:'03',title:'Pilotez en temps réel',desc:"Validez les paiements, générez les quittances, recevez les alertes — tableau de bord unifié."},
            ].map(({num,title,desc})=>(
              <div key={num} className="text-center">
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center text-orange-700 font-bold text-lg relative z-10">{num}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-normal">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">Tarifs</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">À partir de 6,90 €/mois</h2>
          <p className="text-gray-500 mb-8 font-normal">3 offres adaptées à votre parc — sans engagement, résiliable à tout moment.</p>
          <Link href="/tarifs" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors">
            Voir tous les tarifs
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7.5 3.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-orange-500 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-orange-600 blur-3xl" />
            </div>
            <div className="relative z-10">
              <p className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-4">Commencez aujourd&apos;hui</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">Votre parc, votre règle,<br />votre logiciel.</h2>
              <p className="text-lg text-gray-400 mb-10 max-w-lg mx-auto font-normal leading-relaxed">Rejoignez les bailleurs qui pilotent leur patrimoine locatif depuis un espace unique. Sans engagement.</p>
              <Link href="/inscription" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors">
                Créer mon espace — 6,90 €/mois
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7.5 3.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <p className="text-gray-600 text-sm mt-5">Sans engagement · Résiliable à tout moment</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
