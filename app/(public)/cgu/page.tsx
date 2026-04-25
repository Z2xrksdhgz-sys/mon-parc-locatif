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
