import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Fonctionnalités — Mon Parc Locatif',
  description: '11 modules de gestion locative : loyers, quittances, locataires, comptabilité, incidents, assurances et plus.',
}

const modules = [
  {icon:'📊',title:'Tableau de bord',sub:"Vue d'ensemble en temps réel",desc:"Visualisez l'état de votre parc en 5 secondes : loyers du mois, incidents, alertes et prochains événements.",items:['Loyers à percevoir / perçus / en retard','Derniers mouvements (paiements, incidents, documents)','Prochains événements (révision IRL, fin de bail, DPE…)','Actions à effectuer en un clic','Indicateurs de rentabilité globale']},
  {icon:'🏠',title:'Mon parc locatif',sub:'Gestion de vos biens et locations',desc:"Organisez votre patrimoine de façon structurée : immeubles, biens, locations et locataires reliés logiquement.",items:['Tous types de biens : logement, parking, cave, local…','Paramétrage complet du bail et des loyers','Calcul automatique du loyer proratisé (premier mois)','Révision annuelle IRL automatique','Génération du bail PDF depuis les données saisies','Signature électronique du bail (bailleur + locataire)']},
  {icon:'👤',title:'Profils bailleurs',sub:'Gestion multi-structures',desc:"Gérez vos biens sous plusieurs structures juridiques : SCI, LMNP, nom propre, indivision…",items:['Nom propre, indivision, SCI, SARL de famille, LMNP/LMP','Régime fiscal affecté automatiquement','Reporting financier par profil','Déclaration fiscale par profil','Documents associés (KBIS, statuts…)']},
  {icon:'👥',title:'Mes locataires',sub:'Gestion centralisée des profils',desc:"Centralisez toutes les informations sur vos locataires et invitez-les à accéder à leur espace dédié.",items:['Fiche locataire complète (identité, revenus, garants)','Téléversement des pièces justificatives','Invitation à l\'espace locataire','Accès locataire : documents, messagerie, incidents','IA d\'aide aux questions dans l\'espace locataire']},
  {icon:'📋',title:'Mes candidats',sub:'Dossiers de candidature en ligne',desc:"Chaque bien génère un lien de candidature unique. Recevez et traitez les dossiers complets sans aller-retour.",items:['Lien de candidature unique par bien','Dossier complet : identité, revenus, documents, garants','Critères automatiques de conformité','Statuts automatiques : incomplet, complet, non conforme','Acceptation → création automatique du locataire','Gestion de la colocation (dossiers multi-candidats)']},
  {icon:'💶',title:'Comptabilité & Finance',sub:'Suivi financier complet',desc:"Un mini ERP locatif pour suivre vos loyers, charges et recettes — avec relance et recouvrement intégrés.",items:['Suivi mensuel des loyers (payé, partiel, en attente, perdu)','Génération automatique des quittances','Avis d\'échéance automatique à J-10','Relances automatiques en cas de retard','Mise en relation société de recouvrement à J+30','Export comptable PDF et CSV']},
  {icon:'💬',title:'Messagerie',sub:'Communication instantanée',desc:"Un fil de discussion par location, avec envoi automatisé des documents clés et historique complet.",items:['Messagerie instantanée bailleur / locataire','Fil de discussion par location','Envoi automatique des avis d\'échéance','Envoi automatique des quittances','Coffre-fort numérique par locataire']},
  {icon:'📁',title:'Mes documents',sub:'Coffre-fort documentaire',desc:"Tous vos documents centralisés, classés par bien et par locataire — avec alertes d'expiration automatiques.",items:['Stockage de documents','Classement par bien et par locataire','Alertes expiration DPE, diagnostics, assurances','Documents partagés avec le locataire (avec contrôle)','Export et téléchargement à tout moment']},
  {icon:'🔍',title:'États des lieux & inventaires',sub:'Création, signature et archivage',desc:"Réalisez vos états des lieux dans l'application, signez-les électroniquement et archivez-les automatiquement.",items:['Formulaire d\'état des lieux pièce par pièce','Inventaire du mobilier intégré','Photos joignables à chaque pièce','Signature électronique bailleur + locataire','Export PDF et archivage automatique']},
  {icon:'🔧',title:'Mes incidents',sub:'Gestion des interventions',desc:"Traitez les incidents signalés par vos locataires, contactez les artisans et suivez les interventions.",items:['Déclaration d\'incident par locataire ou bailleur','Sélection de la typologie (fuite, panne, dégradation…)','Ajout de photos des dégâts','Contact artisan par email depuis l\'incident','Suivi : nouveau, en cours, résolu','Lien avec comptabilité (charges liées à l\'incident)']},
  {icon:'🛡️',title:'Mes assurances',sub:'Suivi et souscription',desc:"Centralisez toutes les assurances de votre parc — PNO, GLI, habitation locataire — avec alertes d'échéance.",items:['Suivi PNO (Propriétaire Non Occupant)','Suivi GLI (Garantie Loyers Impayés)','Assurance habitation locataire','Alertes expiration et renouvellement','Lien avec les incidents (sinistres couverts)']},
]

export default function FonctionnalitesPage() {
  return (
    <div className="antialiased">
      <section className="bg-gradient-to-b from-orange-50 to-white py-16 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">Fonctionnalités</p>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Tout ce qu&apos;il faut,<br/>rien de superflu.</h1>
          <p className="text-xl text-gray-500 font-normal leading-relaxed">11 modules couvrant l&apos;intégralité de la gestion locative — du premier loyer à la comptabilité annuelle.</p>
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {modules.map((mod,idx)=>(
            <div key={mod.title} className={`rounded-2xl border p-8 md:p-10 ${idx%2===0?'bg-white border-gray-200':'bg-gray-50 border-gray-100'}`}>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-72 flex-shrink-0">
                  <div className="text-4xl mb-4">{mod.icon}</div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{mod.title}</h2>
                  <p className="text-sm text-orange-600 font-semibold mb-3">{mod.sub}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{mod.desc}</p>
                </div>
                <div className="flex-1">
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                    {mod.items.map(item=>(
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6 bg-orange-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Prêt à piloter votre parc ?</h2>
          <p className="text-orange-100 mb-8 font-normal">Commencez avec l&apos;offre qui correspond à votre patrimoine. Sans engagement.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tarifs" className="bg-white text-orange-700 hover:bg-orange-50 font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm">Voir les tarifs</Link>
            <Link href="/inscription" className="bg-orange-700 hover:bg-orange-800 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm border border-orange-500">Créer mon espace</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
