import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos — Mon Parc Locatif',
}

export default function AProposPage() {
  return (
    <div className="antialiased">
      <section className="bg-gradient-to-b from-orange-50 to-white py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">À propos</p>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Un outil fait par un bailleur,<br/>pour les bailleurs.</h1>
          <p className="text-xl text-gray-500 font-normal leading-relaxed">Mon Parc Locatif est né d&apos;un constat simple : les bailleurs autonomes méritent un outil professionnel, sans la complexité et les coûts d&apos;un logiciel de gestion traditionnel.</p>
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre histoire</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Mon Parc Locatif est développé par <strong>Rémi DUMAS</strong>, auto-entrepreneur basé à Paris, également fondateur de <a href="https://moncontratdelocation.fr" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline font-medium">moncontratdelocation.fr</a>.</p>
            <p className="text-gray-600 leading-relaxed mb-4">En accompagnant des milliers de bailleurs dans la création de leurs contrats, nous avons constaté que la vraie difficulté ne s&apos;arrête pas à la signature du bail. C&apos;est après — suivi des loyers, gestion des locataires, quittances, incidents — que les bailleurs autonomes se retrouvent sans outil adapté.</p>
            <p className="text-gray-600 leading-relaxed">Mon Parc Locatif est notre réponse : un espace de gestion complet, simple, conforme au droit français.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {icon:'🎯',title:'Notre mission',desc:"Donner aux bailleurs autonomes les mêmes outils que les professionnels de l'immobilier — sans la complexité ni le coût."},
              {icon:'🔒',title:'Nos engagements',desc:"Conformité totale au droit locatif français, respect absolu de vos données personnelles, aucune vente de données."},
              {icon:'🇫🇷',title:'Ancré dans la loi française',desc:"Tous les documents générés sont conformes à la loi ALUR, ELAN et aux décrets d'application en vigueur."},
              {icon:'📈',title:'En constante évolution',desc:"Nous améliorons continuellement la plateforme en fonction des retours utilisateurs et des évolutions législatives."},
            ].map(({icon,title,desc})=>(
              <div key={title} className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-gray-900 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Prêt à simplifier votre gestion ?</h2>
            <p className="text-gray-400 mb-6 text-sm">Rejoignez les bailleurs qui ont choisi Mon Parc Locatif.</p>
            <Link href="/inscription" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm">Créer mon espace</Link>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Informations légales</h2>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
              <div><span className="font-medium text-gray-800">Raison sociale :</span> Rémi DUMAS (Auto-entrepreneur)</div>
              <div><span className="font-medium text-gray-800">SIRET :</span> 939 443 776 00017</div>
              <div><span className="font-medium text-gray-800">Siège social :</span> 5 rue Lobineau, 75006 Paris</div>
              <div><span className="font-medium text-gray-800">Email :</span> contact@moncontratdelocation.fr</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
