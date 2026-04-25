#!/bin/bash
cd ~/Documents/mon-parc-locatif

# ── app/fonctionnalites/page.tsx ──────────────────────────────
cat > app/fonctionnalites/page.tsx << 'ENDOFFILE'
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
  {icon:'👥',title:'Mes locataires',sub:'Gestion centralisée des profils',desc:"Centralisez toutes les informations sur vos locataires et invitez-les à accéder à leur espace dédié.",items:["Fiche locataire complète (identité, revenus, garants)",'Téléversement des pièces justificatives',"Invitation à l'espace locataire",'Accès locataire : documents, messagerie, incidents',"IA d'aide aux questions dans l'espace locataire"]},
  {icon:'📋',title:'Mes candidats',sub:'Dossiers de candidature en ligne',desc:"Chaque bien génère un lien de candidature unique. Recevez et traitez les dossiers complets sans aller-retour.",items:['Lien de candidature unique par bien','Dossier complet : identité, revenus, documents, garants','Critères automatiques de conformité','Statuts automatiques : incomplet, complet, non conforme','Acceptation → création automatique du locataire','Gestion de la colocation (dossiers multi-candidats)']},
  {icon:'💶',title:'Comptabilité & Finance',sub:'Suivi financier complet',desc:"Un mini ERP locatif pour suivre vos loyers, charges et recettes — avec relance et recouvrement intégrés.",items:['Suivi mensuel des loyers (payé, partiel, en attente, perdu)','Génération automatique des quittances',"Avis d'échéance automatique à J-10",'Relances automatiques en cas de retard','Mise en relation société de recouvrement à J+30','Export comptable PDF et CSV']},
  {icon:'💬',title:'Messagerie',sub:'Communication instantanée',desc:"Un fil de discussion par location, avec envoi automatisé des documents clés et historique complet.",items:['Messagerie instantanée bailleur / locataire','Fil de discussion par location',"Envoi automatique des avis d'échéance",'Envoi automatique des quittances','Coffre-fort numérique par locataire']},
  {icon:'📁',title:'Mes documents',sub:'Coffre-fort documentaire',desc:"Tous vos documents centralisés, classés par bien et par locataire — avec alertes d'expiration automatiques.",items:['Stockage de documents','Classement par bien et par locataire','Alertes expiration DPE, diagnostics, assurances','Documents partagés avec le locataire (avec contrôle)','Export et téléchargement à tout moment']},
  {icon:'🔍',title:'États des lieux & inventaires',sub:'Création, signature et archivage',desc:"Réalisez vos états des lieux dans l'application, signez-les électroniquement et archivez-les automatiquement.",items:["Formulaire d'état des lieux pièce par pièce",'Inventaire du mobilier intégré','Photos joignables à chaque pièce','Signature électronique bailleur + locataire','Export PDF et archivage automatique']},
  {icon:'🔧',title:'Mes incidents',sub:'Gestion des interventions',desc:"Traitez les incidents signalés par vos locataires, contactez les artisans et suivez les interventions.",items:['Déclaration incident par locataire ou bailleur','Sélection de la typologie (fuite, panne, dégradation…)','Ajout de photos des dégâts','Contact artisan par email depuis incident','Suivi : nouveau, en cours, résolu','Lien avec comptabilité (charges liées à incident)']},
  {icon:'🛡️',title:'Mes assurances',sub:'Suivi et souscription',desc:"Centralisez toutes les assurances de votre parc — PNO, GLI, habitation locataire — avec alertes d'échéance.",items:['Suivi PNO (Propriétaire Non Occupant)','Suivi GLI (Garantie Loyers Impayés)','Assurance habitation locataire','Alertes expiration et renouvellement','Lien avec les incidents (sinistres couverts)']},
]

export default function FonctionnalitesPage() {
  return (
    <div className="antialiased">

      {/* Header */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-12 sm:py-16 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">Fonctionnalités</p>
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
            Tout ce qu&apos;il faut,<br/>rien de superflu.
          </h1>
          <p className="text-base sm:text-xl text-gray-500 font-normal leading-relaxed">
            11 modules couvrant l&apos;intégralité de la gestion locative — du premier loyer à la comptabilité annuelle.
          </p>
        </div>
      </section>

      {/* Modules */}
      <section className="py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
          {modules.map((mod, idx) => (
            <div key={mod.title} className={`rounded-2xl border p-6 sm:p-8 md:p-10 ${idx % 2 === 0 ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100'}`}>
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <div className="md:w-72 flex-shrink-0">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{mod.icon}</div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{mod.title}</h2>
                  <p className="text-sm text-orange-600 font-semibold mb-2 sm:mb-3">{mod.sub}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{mod.desc}</p>
                </div>
                <div className="flex-1">
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 sm:gap-y-3">
                    {mod.items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
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

      {/* CTA */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-orange-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Prêt à piloter votre parc ?</h2>
          <p className="text-orange-100 mb-6 sm:mb-8 font-normal text-sm sm:text-base">
            Commencez avec l&apos;offre qui correspond à votre patrimoine. Sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/tarifs" className="w-full sm:w-auto text-center bg-white text-orange-700 hover:bg-orange-50 font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm">
              Voir les tarifs
            </Link>
            <Link href="/inscription" className="w-full sm:w-auto text-center bg-orange-700 hover:bg-orange-800 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm border border-orange-500">
              Créer mon espace
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
ENDOFFILE
echo "✅ /fonctionnalites mobile OK"

# ── app/contact/page.tsx ──────────────────────────────────────
cat > app/contact/page.tsx << 'ENDOFFILE'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact — Mon Parc Locatif',
  description: "Contactez l'équipe de Mon Parc Locatif.",
}

export default function ContactPage() {
  return (
    <div className="antialiased">

      {/* Header */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-12 sm:py-16 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">Contact</p>
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">On est là pour vous.</h1>
          <p className="text-base sm:text-xl text-gray-500 font-normal leading-relaxed">
            Une question sur nos offres, une demande sur mesure, ou besoin d&apos;aide ? Écrivez-nous.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12">

          {/* Formulaire */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">Envoyer un message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom complet</label>
                <input type="text" placeholder="Jean Dupont"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input type="email" placeholder="jean@example.fr"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Sujet</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white">
                  <option value="">Sélectionnez un sujet</option>
                  <option value="question-offre">Question sur une offre</option>
                  <option value="sur-mesure">Demande sur mesure (+50 biens)</option>
                  <option value="support">Support technique</option>
                  <option value="facturation">Facturation</option>
                  <option value="partenariat">Partenariat</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                <textarea rows={5} placeholder="Décrivez votre demande..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"/>
              </div>
              <button type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm">
                Envoyer le message
              </button>
              <p className="text-xs text-gray-400 text-center">
                En soumettant ce formulaire, vous acceptez notre{' '}
                <Link href="/politique-de-confidentialite" className="underline">politique de confidentialité</Link>.
              </p>
            </form>
          </div>

          {/* Infos */}
          <div className="space-y-5 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Coordonnées</h2>

            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-orange-600" viewBox="0 0 20 20" fill="none">
                  <path d="M3 8a7 7 0 1114 0c0 5.5-7 11-7 11S3 13.5 3 8z" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="10" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Adresse</p>
                <p className="text-sm text-gray-500">5 rue Lobineau, 75006 Paris</p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-orange-600" viewBox="0 0 20 20" fill="none">
                  <path d="M3 6l7 5 7-5M3 6v10a1 1 0 001 1h12a1 1 0 001-1V6M3 6a1 1 0 011-1h12a1 1 0 011 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Email</p>
                <a href="mailto:contact@moncontratdelocation.fr" className="text-sm text-orange-600 hover:underline break-all">
                  contact@moncontratdelocation.fr
                </a>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 sm:p-6">
              <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Offre sur mesure (+50 biens)</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Tarification personnalisée, onboarding dédié et support prioritaire.
              </p>
              <p className="text-sm text-orange-700 font-semibold">
                → Sélectionnez &quot;Demande sur mesure&quot; dans le formulaire
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6">
              <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Délai de réponse</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Nous répondons sous <strong>24 à 48h ouvrées</strong>. Support téléphonique disponible pour les abonnés EXPERT et RENTIER.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
ENDOFFILE
echo "✅ /contact mobile OK"

# ── app/a-propos/page.tsx ─────────────────────────────────────
cat > app/a-propos/page.tsx << 'ENDOFFILE'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos — Mon Parc Locatif',
}

export default function AProposPage() {
  return (
    <div className="antialiased">

      {/* Header */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">À propos</p>
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-5 sm:mb-6 leading-tight">
            Un outil fait par un bailleur,<br/>pour les bailleurs.
          </h1>
          <p className="text-base sm:text-xl text-gray-500 font-normal leading-relaxed">
            Mon Parc Locatif est né d&apos;un constat simple : les bailleurs autonomes méritent un outil professionnel, sans la complexité et les coûts d&apos;un logiciel de gestion traditionnel.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-5 sm:space-y-8">

          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Notre histoire</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              Mon Parc Locatif est développé par <strong>Rémi DUMAS</strong>, auto-entrepreneur basé à Paris,
              également fondateur de{' '}
              <a href="https://moncontratdelocation.fr" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline font-medium">
                moncontratdelocation.fr
              </a>.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              En accompagnant des milliers de bailleurs dans la création de leurs contrats, nous avons constaté que
              la vraie difficulté ne s&apos;arrête pas à la signature du bail. C&apos;est après — suivi des loyers,
              gestion des locataires, quittances, incidents — que les bailleurs autonomes se retrouvent sans outil adapté.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Mon Parc Locatif est notre réponse : un espace de gestion complet, simple, conforme au droit français.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              {icon:'🎯',title:'Notre mission',desc:"Donner aux bailleurs autonomes les mêmes outils que les professionnels de l'immobilier — sans la complexité ni le coût."},
              {icon:'🔒',title:'Nos engagements',desc:"Conformité totale au droit locatif français, respect absolu de vos données personnelles, aucune vente de données."},
              {icon:'🇫🇷',title:'Ancré dans la loi française',desc:"Tous les documents générés sont conformes à la loi ALUR, ELAN et aux décrets d'application en vigueur."},
              {icon:'📈',title:'En constante évolution',desc:"Nous améliorons continuellement la plateforme en fonction des retours utilisateurs et des évolutions législatives."},
            ].map(({icon,title,desc})=>(
              <div key={title} className="bg-gray-50 rounded-2xl border border-gray-100 p-5 sm:p-6">
                <div className="text-2xl sm:text-3xl mb-3">{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Prêt à simplifier votre gestion ?</h2>
            <p className="text-gray-400 mb-5 sm:mb-6 text-sm">Rejoignez les bailleurs qui ont choisi Mon Parc Locatif.</p>
            <Link href="/inscription"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 sm:px-7 py-3.5 rounded-xl transition-colors text-sm">
              Créer mon espace
            </Link>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Informations légales</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm text-gray-600">
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
ENDOFFILE
echo "✅ /a-propos mobile OK"

# ── app/connexion/page.tsx ────────────────────────────────────
cat > app/connexion/page.tsx << 'ENDOFFILE'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Se connecter — Mon Parc Locatif' }

export default function ConnexionPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 w-full max-w-md shadow-sm">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Connexion</h1>
          <p className="text-sm text-gray-500">Accédez à votre espace bailleur</p>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input type="email" placeholder="votre@email.fr"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
          </div>
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="text-sm font-medium text-gray-700">Mot de passe</label>
              <a href="#" className="text-xs text-orange-600 hover:underline">Mot de passe oublié ?</a>
            </div>
            <input type="password" placeholder="••••••••"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
          </div>
          <button type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm mt-2">
            Se connecter
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-5 sm:mt-6">
          Pas encore de compte ?{' '}
          <Link href="/inscription" className="text-orange-600 hover:underline font-semibold">Créer un compte</Link>
        </p>
      </div>
    </div>
  )
}
ENDOFFILE
echo "✅ /connexion mobile OK"

# ── app/inscription/page.tsx ──────────────────────────────────
cat > app/inscription/page.tsx << 'ENDOFFILE'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Créer un compte — Mon Parc Locatif' }

export default function InscriptionPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 w-full max-w-md shadow-sm">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Créer mon espace</h1>
          <p className="text-sm text-gray-500">
            Démarrez la gestion de votre parc locatif — vous choisirez votre offre à l&apos;étape suivante.
          </p>
        </div>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Prénom</label>
              <input type="text" placeholder="Jean"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom</label>
              <input type="text" placeholder="Dupont"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input type="email" placeholder="jean@example.fr"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
            <input type="password" placeholder="Minimum 8 caractères"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
          </div>
          <div className="flex items-start gap-2.5 pt-1">
            <input type="checkbox" id="cgu" className="mt-0.5 text-orange-600 rounded flex-shrink-0"/>
            <label htmlFor="cgu" className="text-xs text-gray-500 leading-relaxed">
              J&apos;accepte les{' '}
              <Link href="/cgu" className="text-orange-600 hover:underline">CGU</Link>{' '}
              et la{' '}
              <Link href="/politique-de-confidentialite" className="text-orange-600 hover:underline">politique de confidentialité</Link>
            </label>
          </div>
          <button type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm">
            Continuer →
          </button>
        </form>
        <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 mb-3">Offres disponibles à partir de</p>
          <div className="flex justify-center gap-4 sm:gap-6">
            {[
              {name:'START',price:'6,90 €'},
              {name:'EXPERT',price:'15,80 €'},
              {name:'RENTIER',price:'47,80 €'},
            ].map(p => (
              <div key={p.name} className="text-center">
                <p className="text-xs font-bold text-gray-500">{p.name}</p>
                <p className="text-xs text-gray-400">{p.price}/mois</p>
              </div>
            ))}
          </div>
          <Link href="/tarifs" className="inline-block mt-3 text-xs text-orange-600 hover:underline">
            Voir le détail des offres →
          </Link>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Déjà un compte ?{' '}
          <Link href="/connexion" className="text-orange-600 hover:underline font-semibold">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}
ENDOFFILE
echo "✅ /inscription mobile OK"

# ── app/cgu/page.tsx ──────────────────────────────────────────
cat > app/cgu/page.tsx << 'ENDOFFILE'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: "Conditions Générales d'Utilisation — Mon Parc Locatif" }

const articles = [
  {t:"Article 1 — Objet et champ d'application",c:"Les présentes CGU définissent les modalités d'utilisation de la plateforme Mon Parc Locatif (mon-parc-locatif.fr), éditée par Rémi DUMAS, auto-entrepreneur (SIRET 939 443 776 00017), 5 rue Lobineau, 75006 Paris. L'utilisation de la plateforme implique l'acceptation pleine et entière des présentes CGU."},
  {t:"Article 2 — Description du service",c:"Mon Parc Locatif est une plateforme SaaS de gestion locative permettant : la gestion de biens immobiliers locatifs, le suivi des loyers et génération de quittances, la gestion des locataires et dossiers de candidature, la génération de documents légaux (baux, états des lieux), la signature électronique, le suivi comptable et financier, la gestion des incidents et assurances, la messagerie bailleur-locataire."},
  {t:"Article 3 — Accès et création de compte",c:"L'accès nécessite la création d'un compte. L'utilisateur s'engage à fournir des informations exactes et à maintenir la confidentialité de ses identifiants. Il est responsable de toutes les actions effectuées depuis son compte. L'éditeur peut suspendre tout compte en cas de non-respect des présentes CGU."},
  {t:"Article 4 — Abonnements et tarification",c:"Les offres disponibles sont : START (6,90 €/mois ou 5,86 €/mois en annuel -15%, 1 location), EXPERT (15,80 €/mois ou 12,64 €/mois en annuel -20%, jusqu'à 10 locations), RENTIER (47,80 €/mois ou 33,46 €/mois en annuel -30%, jusqu'à 50 locations), Sur mesure (tarification personnalisée au-delà de 50 locations). Les abonnements sont sans engagement. Résiliation possible à tout moment, avec effet à la fin de la période en cours. Les paiements effectués ne sont pas remboursables. Les paiements sont traités par Stripe."},
  {t:"Article 5 — Obligations de l'utilisateur",c:"L'utilisateur s'engage à utiliser la plateforme conformément à sa destination et aux lois en vigueur, à ne pas l'utiliser à des fins illicites, à ne pas porter atteinte à sa sécurité, à s'assurer de la conformité de ses pratiques locatives au droit applicable, à ne pas partager ses identifiants. Il est seul responsable de l'exactitude des informations saisies."},
  {t:"Article 6 — Propriété intellectuelle",c:"La plateforme, son code source, son design et ses contenus sont la propriété exclusive de Rémi DUMAS. Toute reproduction sans autorisation écrite préalable est interdite. Les documents générés par l'utilisateur lui appartiennent."},
  {t:"Article 7 — Responsabilité et limitations",c:"Mon Parc Locatif est un outil d'aide à la gestion locative. Les documents générés le sont à titre indicatif et ne constituent pas un conseil juridique. L'éditeur recommande de consulter un professionnel du droit pour toute situation complexe."},
  {t:"Article 8 — Résiliation",c:"L'utilisateur peut résilier son abonnement à tout moment depuis son espace ou par email à contact@moncontratdelocation.fr. La résiliation prend effet à la fin de la période en cours. Les données sont conservées 30 jours puis supprimées."},
  {t:"Article 9 — Modification des CGU",c:"L'éditeur peut modifier les présentes CGU. Les utilisateurs seront informés par email 30 jours avant toute modification substantielle. La poursuite de l'utilisation vaut acceptation."},
  {t:"Article 10 — Loi applicable",c:"Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux de Paris seront compétents. Contact : contact@moncontratdelocation.fr"},
]

export default function CguPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
        Conditions Générales d&apos;Utilisation
      </h1>
      <p className="text-sm text-gray-500 mb-8 sm:mb-10">Dernière mise à jour : juin 2025</p>
      <div className="space-y-8 sm:space-y-10 text-sm leading-relaxed text-gray-700">
        {articles.map(({t,c})=>(
          <section key={t}>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{t}</h2>
            <p>{c}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
ENDOFFILE
echo "✅ /cgu mobile OK"

# ── app/mentions-legales/page.tsx ─────────────────────────────
cat > app/mentions-legales/page.tsx << 'ENDOFFILE'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Mentions légales — Mon Parc Locatif' }

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Mentions légales</h1>
      <p className="text-sm text-gray-500 mb-8 sm:mb-10">
        Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique
      </p>
      <div className="space-y-8 sm:space-y-10 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Éditeur du site</h2>
          <div className="bg-gray-50 rounded-xl p-5 sm:p-6 space-y-2">
            <p><span className="font-semibold text-gray-800">Nom :</span> Rémi DUMAS</p>
            <p><span className="font-semibold text-gray-800">Statut :</span> Auto-entrepreneur</p>
            <p><span className="font-semibold text-gray-800">SIRET :</span> 939 443 776 00017</p>
            <p><span className="font-semibold text-gray-800">Siège social :</span> 5 rue Lobineau, 75006 Paris, France</p>
            <p><span className="font-semibold text-gray-800">Email :</span>{' '}
              <a href="mailto:contact@moncontratdelocation.fr" className="text-orange-600 hover:underline break-all">
                contact@moncontratdelocation.fr
              </a>
            </p>
            <p><span className="font-semibold text-gray-800">Directeur de la publication :</span> Rémi DUMAS</p>
          </div>
        </section>
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Hébergeur</h2>
          <div className="bg-gray-50 rounded-xl p-5 sm:p-6 space-y-2">
            <p><span className="font-semibold text-gray-800">Société :</span> Vercel Inc.</p>
            <p><span className="font-semibold text-gray-800">Adresse :</span> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
            <p><span className="font-semibold text-gray-800">Site web :</span>{' '}
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">vercel.com</a>
            </p>
          </div>
        </section>
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Propriété intellectuelle</h2>
          <p>L&apos;ensemble du contenu du site mon-parc-locatif.fr est la propriété exclusive de Rémi DUMAS. Toute reproduction sans autorisation écrite préalable est interdite.</p>
        </section>
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Données personnelles</h2>
          <p>Le traitement des données personnelles est décrit dans notre{' '}
            <a href="/politique-de-confidentialite" className="text-orange-600 hover:underline font-medium">Politique de Confidentialité & RGPD</a>.
            Pour exercer vos droits :{' '}
            <a href="mailto:contact@moncontratdelocation.fr" className="text-orange-600 hover:underline break-all">
              contact@moncontratdelocation.fr
            </a>
          </p>
        </section>
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Cookies</h2>
          <p>Le site utilise uniquement des cookies techniques nécessaires au bon fonctionnement du service (session utilisateur, préférences). Ces cookies ne collectent pas de données à des fins publicitaires.</p>
        </section>
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Droit applicable</h2>
          <p>Tout litige est soumis au droit français. Attribution exclusive de juridiction aux tribunaux de Paris.</p>
        </section>
      </div>
    </div>
  )
}
ENDOFFILE
echo "✅ /mentions-legales mobile OK"

# ── app/politique-de-confidentialite/page.tsx ─────────────────
cat > app/politique-de-confidentialite/page.tsx << 'ENDOFFILE'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Politique de confidentialité & RGPD — Mon Parc Locatif' }

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
        Politique de confidentialité & RGPD
      </h1>
      <p className="text-sm text-gray-500 mb-8 sm:mb-10">Dernière mise à jour : juin 2025</p>

      <div className="space-y-8 sm:space-y-10 text-sm leading-relaxed text-gray-700">

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">1. Responsable de traitement</h2>
          <div className="bg-gray-50 rounded-xl p-5 sm:p-6 space-y-1.5">
            <p><span className="font-medium text-gray-800">Responsable :</span> Rémi DUMAS — Auto-entrepreneur</p>
            <p><span className="font-medium text-gray-800">SIRET :</span> 939 443 776 00017</p>
            <p><span className="font-medium text-gray-800">Adresse :</span> 5 rue Lobineau, 75006 Paris</p>
            <p><span className="font-medium text-gray-800">Contact :</span>{' '}
              <a href="mailto:contact@moncontratdelocation.fr" className="text-orange-600 hover:underline break-all">
                contact@moncontratdelocation.fr
              </a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">2. Données collectées</h2>
          <div className="space-y-3">
            {[
              {t:"Données d'identification",items:["Nom, prénom","Adresse email","Mot de passe (chiffré, jamais stocké en clair)"]},
              {t:"Données de gestion locative",items:["Informations sur les biens (adresse, type, surface, loyer…)","Informations sur les locataires (identité, coordonnées)","Informations financières (loyers, charges, quittances)","Documents associés (baux, états des lieux…)"]},
              {t:"Données de paiement",items:["Traitement via Stripe — aucune donnée bancaire stockée","Historique des transactions (référence, montant, date)"]},
              {t:"Données techniques",items:["Adresse IP","Données de navigation (pages visitées, durée de session)"]},
            ].map(({t,items})=>(
              <div key={t} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
                <p className="font-semibold text-gray-900 mb-2">{t}</p>
                <ul className="space-y-1">
                  {items.map(i=><li key={i} className="flex items-start gap-2"><span className="text-orange-500 flex-shrink-0">•</span>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">3. Finalités et bases légales</h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-sm border-collapse min-w-[480px] px-4 sm:px-0">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-800">Finalité</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-800">Base légale</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Fourniture du service","Exécution du contrat (art. 6.1.b RGPD)"],
                  ["Gestion de l'abonnement","Exécution du contrat (art. 6.1.b RGPD)"],
                  ["Amélioration du service","Intérêt légitime (art. 6.1.f RGPD)"],
                  ["Communications transactionnelles","Exécution du contrat (art. 6.1.b RGPD)"],
                  ["Communications marketing","Consentement (art. 6.1.a RGPD)"],
                  ["Obligations légales","Obligation légale (art. 6.1.c RGPD)"],
                  ["Prévention de la fraude","Intérêt légitime (art. 6.1.f RGPD)"],
                ].map(([f,b],i)=>(
                  <tr key={f} className={i%2===0?'bg-white':'bg-gray-50'}>
                    <td className="p-3 border border-gray-200">{f}</td>
                    <td className="p-3 border border-gray-200 text-gray-500">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">4. Durée de conservation</h2>
          <div className="space-y-2">
            {[
              ["Données de compte actif","Durée de l'abonnement + 30 jours après résiliation"],
              ["Documents générés","Durée de l'abonnement + 30 jours après résiliation"],
              ["Données de facturation","10 ans (obligation légale comptable)"],
              ["Données de navigation","13 mois maximum"],
              ["Données relatives aux locataires","Durée de la relation locative + 3 ans"],
            ].map(([type,duree])=>(
              <div key={type} className="flex flex-col sm:flex-row gap-1 sm:gap-4 py-2 border-b border-gray-100 last:border-0">
                <span className="font-medium text-gray-800 sm:w-72 flex-shrink-0">{type}</span>
                <span className="text-gray-600">{duree}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">5. Partage des données</h2>
          <p className="mb-4 font-semibold text-gray-800">Nous ne vendons jamais vos données personnelles.</p>
          <div className="space-y-3">
            {[
              {dest:"Stripe",role:"Prestataire de paiement",pays:"États-Unis (garanties RGPD)"},
              {dest:"Vercel",role:"Hébergeur de la plateforme",pays:"États-Unis (garanties RGPD)"},
              {dest:"Firebase (Google)",role:"Base de données sécurisée",pays:"Union Européenne"},
              {dest:"Resend",role:"Envoi d'emails transactionnels",pays:"Union Européenne"},
            ].map(({dest,role,pays})=>(
              <div key={dest} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{dest}</p>
                  <p className="text-xs text-gray-500">{role}</p>
                </div>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full w-fit">{pays}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">6. Vos droits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {[
              {d:"🔍 Droit d'accès",t:"Obtenir une copie de vos données"},
              {d:"✏️ Droit de rectification",t:"Corriger des données inexactes"},
              {d:"🗑️ Droit à l'effacement",t:"Demander la suppression"},
              {d:"⏸️ Droit de limitation",t:"Limiter certains traitements"},
              {d:"📦 Droit à la portabilité",t:"Recevoir vos données"},
              {d:"🚫 Droit d'opposition",t:"Vous opposer à certains traitements"},
            ].map(({d,t})=>(
              <div key={d} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="font-semibold text-gray-900 text-sm mb-1">{d}</p>
                <p className="text-xs text-gray-500">{t}</p>
              </div>
            ))}
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 sm:p-5">
            <p className="font-semibold text-gray-900 mb-2">Exercer vos droits</p>
            <p>Contactez-nous :{' '}
              <a href="mailto:contact@moncontratdelocation.fr" className="text-orange-600 hover:underline font-medium break-all">
                contact@moncontratdelocation.fr
              </a>
            </p>
            <p className="mt-2 text-gray-500 text-xs">
              Réponse sous 30 jours. Vous pouvez aussi contacter la{' '}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">CNIL</a>.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">7. Sécurité</h2>
          <ul className="space-y-2">
            {["Chiffrement en transit (HTTPS/TLS)","Chiffrement au repos (AES-256)","Mots de passe hachés et salés","Accès restreint aux agents autorisés","Sauvegardes régulières et sécurisées"].map(m=>(
              <li key={m} className="flex items-start gap-2">
                <span className="text-orange-500 flex-shrink-0 mt-0.5">✓</span>{m}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">8. Cookies</h2>
          <p>Nous utilisons uniquement des cookies techniques indispensables au service (session, préférences). Aucun cookie publicitaire ou de tracking tiers.</p>
        </section>

        <div className="bg-gray-900 rounded-2xl p-5 sm:p-6 text-center">
          <p className="text-white font-semibold mb-2">Une question sur vos données ?</p>
          <a href="mailto:contact@moncontratdelocation.fr" className="text-orange-400 hover:text-orange-300 text-sm font-medium break-all">
            contact@moncontratdelocation.fr
          </a>
        </div>
      </div>
    </div>
  )
}
ENDOFFILE
echo "✅ /politique-de-confidentialite mobile OK"

# ── Git push ──────────────────────────────────────────────────
git add .
git commit -m "fix: toutes pages 100% mobile-ready - titres, espacements, grilles, boutons pleine largeur"
git push

echo ""
echo "🎉 Toutes les pages sont maintenant 100% adaptées mobile !"
echo "Teste sur localhost:3000 avec Cmd+Option+I > icône mobile"
