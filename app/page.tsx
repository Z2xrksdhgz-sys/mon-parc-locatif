import Link from 'next/link'

const MONCONTRAT = 'https://moncontratdelocation.fr'
const INSCRIPTION = '/inscription'
const CONNEXION = '/connexion'

// ─── Icône checkmark réutilisable ──────────────────────────────
function Check() {
  return (
    <svg
      className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M3 8l4 4 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Flèche droite réutilisable ────────────────────────────────
function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M3 7h8M7.5 3.5l4 3.5-4 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── FEATURES data ─────────────────────────────────────────────
const features = [
  {
    icon: '🏡',
    tag: '01 — Gérer',
    title: 'Gestion quotidienne',
    desc: 'Tableau de bord, suivi des loyers, quittances automatiques, gestion des locataires, messagerie et coffre-fort documentaire.',
    items: [
      'Tableau de bord avec KPIs en temps réel',
      'Suivi des loyers + relances automatiques',
      'Génération de quittances PDF en 1 clic',
      'Gestion des candidatures et dossiers',
      'États des lieux et inventaires signés',
      'Messagerie bailleur / locataire',
      'Coffre-fort documentaire',
    ],
  },
  {
    icon: '📊',
    tag: '02 — Optimiser',
    title: 'Patrimoine & comptabilité',
    desc: 'Comptabilité locative par bien, suivi des recettes et charges, aide à la déclaration (LMNP, SCI, revenus fonciers…).',
    items: [
      'Profils bailleurs multiples (SCI, LMNP…)',
      'Comptabilité locative par bien',
      'Recettes, charges et résultat net',
      'Rendement locatif calculé automatiquement',
      'Aide déclaration fiscale',
      'Export comptable PDF / CSV',
    ],
  },
  {
    icon: '🛡️',
    tag: '03 — Protéger',
    title: 'Risques & assurances',
    desc: 'Suivi PNO et GLI, gestion des incidents, alertes diagnostics et procédure de recouvrement intégrée.',
    items: [
      'Suivi assurances PNO et GLI',
      'Gestion structurée des incidents',
      'Alertes DPE, amiante, diagnostics',
      'Procédure recouvrement à J+30',
      'Espace locataire pour déclarer un incident',
    ],
  },
]

// ─── STEPS data ────────────────────────────────────────────────
const steps = [
  {
    num: '01',
    title: 'Créez votre espace',
    desc: 'Inscrivez-vous en 2 minutes avec votre email. Si vous avez déjà généré un contrat sur moncontratdelocation.fr, retrouvez vos infos automatiquement.',
  },
  {
    num: '02',
    title: 'Ajoutez votre bien',
    desc: 'Renseignez votre bien, votre locataire et les paramètres du loyer — montant, charges, périodicité, révision IRL annuelle.',
  },
  {
    num: '03',
    title: 'Pilotez en temps réel',
    desc: 'Validez les paiements, générez les quittances, recevez les alertes et gérez les incidents depuis votre tableau de bord unifié.',
  },
]

// ─── PLAN Essentiel features ───────────────────────────────────
const planEssentiel = [
  '1 bien, 1 locataire',
  'Tableau de bord',
  'Suivi des loyers mensuel',
  'Génération de quittances PDF',
  'Coffre-fort documentaire',
  'Messagerie bailleur / locataire',
  'Espace locataire dédié',
]

// ─── PLAN Pro features ─────────────────────────────────────────
const planPro = [
  'Tout le plan Essentiel',
  'Biens et locataires illimités',
  'Relances automatiques (J+10, J+30)',
  'Gestion des candidatures et dossiers',
  'États des lieux et inventaires',
  'Gestion des incidents et sinistres',
  'Suivi assurances PNO et GLI',
  'Comptabilité locative par bien',
  'Alertes DPE et diagnostics',
]

// ──────────────────────────────────────────────────────────────
// PAGE PRINCIPALE
// ──────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">

      {/* ════════════════════════════════════════
          NAVIGATION
      ════════════════════════════════════════ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-semibold text-gray-900">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 8.5V6L8 1.5 14 6v2.5M2 8.5v5.25h4V10h4v3.75H14V8.5"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-base tracking-tight">
  mon-parc-locatif<span className="text-orange-600">.fr</span>
</span>
          </Link>

          {/* Links desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-500">
            <Link href="#fonctionnalites" className="hover:text-gray-900 transition-colors">
              Fonctionnalités
            </Link>
            <Link href="#comment" className="hover:text-gray-900 transition-colors">
              Comment ça marche
            </Link>
            <Link href="#tarifs" className="hover:text-gray-900 transition-colors">
              Tarifs
            </Link>
            <Link
              href={MONCONTRAT}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              moncontratdelocation.fr ↗
            </Link>
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href={CONNEXION}
              className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Se connecter
            </Link>
            <Link
              href={INSCRIPTION}
              className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Démarrer
            </Link>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-700 text-sm font-medium px-3.5 py-1.5 rounded-full mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            Par l&apos;équipe de moncontratdelocation.fr
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] mb-6 max-w-4xl">
            Gérez votre parc locatif,{' '}
            <span className="text-orange-600">simplement.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl font-normal">
            Loyers, quittances, locataires, documents, incidents — tout ce dont un bailleur autonome a besoin pour piloter son patrimoine sans comptable ni gestionnaire externe.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link
              href={INSCRIPTION}
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3.5 rounded-xl text-base transition-colors"
            >
              Démarrer pour 5,90 €/mois
              <ArrowRight />
            </Link>
            <Link
              href="#fonctionnalites"
              className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-900 font-medium text-base transition-colors"
            >
              Voir les fonctionnalités
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 3v8M3 7l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-100">
            {[
              { n: '11', l: 'modules de gestion' },
              { n: '100%', l: 'conforme droit locatif français' },
              { n: '< 5 min', l: "pour créer votre espace" },
              { n: '2 plans', l: 'clairs et sans surprise' },
            ].map(({ n, l }) => (
              <div key={l}>
                <div className="text-2xl font-bold text-gray-900">{n}</div>
                <div className="text-sm text-gray-400 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PITCH RAPIDE (bande orange)
      ════════════════════════════════════════ */}
      <div className="bg-orange-600 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white text-xl font-semibold mb-1">
              Vous avez déjà un contrat sur moncontratdelocation.fr ?
            </p>
            <p className="text-orange-100 text-sm">
              Créez votre espace Mon Parc Locatif — votre bien et votre locataire sont déjà reconnus.
            </p>
          </div>
          <Link
            href={INSCRIPTION}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-orange-700 hover:bg-orange-50 font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            Créer mon espace maintenant
            <ArrowRight />
          </Link>
        </div>
      </div>

      {/* ════════════════════════════════════════
          FEATURES
      ════════════════════════════════════════ */}
      <section id="fonctionnalites" className="py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-14">
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">
              Fonctionnalités
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tout ce qu&apos;il faut,<br />rien de superflu.
            </h2>
            <p className="text-lg text-gray-500 max-w-xl font-normal leading-relaxed">
              Mon Parc Locatif couvre l&apos;intégralité de la gestion locative — du premier loyer à la comptabilité annuelle.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {features.map(({ icon, tag, title, desc, items }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-gray-200 p-7 hover:border-orange-200 hover:shadow-sm transition-all"
              >
                <div className="text-3xl mb-5">{icon}</div>
                <p className="text-xs text-orange-600 font-semibold uppercase tracking-wider mb-2">
                  {tag}
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 font-normal">{desc}</p>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════ */}
      <section id="comment" className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">
              Comment ça marche
            </p>
            <h2 className="text-4xl font-bold text-gray-900">
              Opérationnel en moins de 10 minutes.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 relative">
            {/* Ligne de connexion desktop */}
            <div className="hidden md:block absolute top-7 left-[22%] right-[22%] h-px bg-gray-200" />

            {steps.map(({ num, title, desc }) => (
              <div key={num} className="text-center">
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center text-orange-700 font-bold text-lg relative z-10 bg-white">
                  {num}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-normal">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PRICING
      ════════════════════════════════════════ */}
      <section id="tarifs" className="py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">
              Tarifs
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Simple et transparent.
            </h2>
            <p className="text-lg text-gray-500 font-normal">
              Sans engagement. Résiliable à tout moment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">

            {/* ── Plan Essentiel ── */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
              <div className="text-sm text-gray-400 uppercase tracking-wider font-medium mb-2">
                Essentiel
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-bold text-gray-900">5,90</span>
                <span className="text-gray-400 text-lg">€/mois</span>
              </div>
              <p className="text-sm text-gray-400 mb-7">
                1 bien · sans engagement
              </p>
              <div className="border-t border-gray-100 pt-6 mb-8 flex-1">
                <ul className="space-y-3">
                  {planEssentiel.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={`${INSCRIPTION}?plan=essentiel`}
                className="block text-center bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 rounded-xl transition-colors"
              >
                Démarrer avec Essentiel
              </Link>
            </div>

            {/* ── Plan Pro ── */}
            <div className="bg-white rounded-2xl border-2 border-orange-500 p-8 flex flex-col relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs font-semibold px-5 py-1.5 rounded-full whitespace-nowrap">
                Le plus complet
              </div>
              <div className="text-sm text-orange-600 uppercase tracking-wider font-medium mb-2">
                Pro
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-bold text-gray-900">11,90</span>
                <span className="text-gray-400 text-lg">€/mois</span>
              </div>
              <p className="text-sm text-gray-400 mb-7">
                Biens illimités · sans engagement
              </p>
              <div className="border-t border-gray-100 pt-6 mb-8 flex-1">
                <ul className="space-y-3">
                  {planPro.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={`${INSCRIPTION}?plan=pro`}
                className="block text-center bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3.5 rounded-xl transition-colors"
              >
                Démarrer avec Pro
              </Link>
            </div>
          </div>

          {/* Note bas de tableau */}
          <p className="text-center text-sm text-gray-400 mt-8">
            Vous avez généré un bail sur{' '}
            <Link
              href={MONCONTRAT}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:underline"
            >
              moncontratdelocation.fr
            </Link>{' '}
            ? Utilisez le même email pour retrouver vos informations.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA FINAL
      ════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            {/* Fond déco */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-orange-500 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-orange-600 blur-3xl" />
            </div>

            <div className="relative z-10">
              <p className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-4">
                Commencez aujourd&apos;hui
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                Votre parc, votre règle,<br />votre logiciel.
              </h2>
              <p className="text-lg text-gray-400 mb-10 max-w-lg mx-auto font-normal leading-relaxed">
                Rejoignez les bailleurs qui pilotent leur patrimoine locatif depuis un espace unique. Sans engagement, résiliable à tout moment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={INSCRIPTION}
                  className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
                >
                  Créer mon espace — 5,90 €/mois
                  <ArrowRight />
                </Link>
                <Link
                  href={MONCONTRAT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-gray-200 font-medium px-8 py-4 rounded-xl transition-colors"
                >
                  ← moncontratdelocation.fr
                </Link>
              </div>
              <p className="text-gray-600 text-sm mt-6">
                Sans carte bancaire pour commencer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer className="border-t border-gray-100 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 font-semibold text-gray-900">
            <div className="w-7 h-7 bg-orange-600 rounded-lg flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 8.5V6L8 1.5 14 6v2.5M2 8.5v5.25h4V10h4v3.75H14V8.5"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            mon-parc-locatif<span className="text-orange-600">.fr</span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-gray-400">
            <Link href="/cgu" className="hover:text-gray-900 transition-colors">
              CGU
            </Link>
            <Link href="/politique-de-confidentialite" className="hover:text-gray-900 transition-colors">
              Confidentialité
            </Link>
            <Link href="/mentions-legales" className="hover:text-gray-900 transition-colors">
              Mentions légales
            </Link>
            <Link
              href={MONCONTRAT}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              moncontratdelocation.fr ↗
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-gray-300">
            © 2026 Rémi DUMAS — SIRET 939 443 776 00017
          </p>
        </div>
      </footer>

    </div>
  )
}