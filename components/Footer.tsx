import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8 sm:mb-10">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-orange-600 rounded-md flex items-center justify-center flex-shrink-0">
                <svg width="13" height="13" viewBox="0 0 22 22" fill="none">
                  <path d="M3 12V8.5L11 2.5 19 8.5V12M3 12v8h5.5V15h5V20H19v-8" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm font-bold text-white tracking-tight">
                mon-parc-locatif<span className="text-orange-500">.fr</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-gray-500">La gestion locative simple pour les bailleurs autonomes.</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Produit</p>
            <ul className="space-y-2.5">
              {[{l:'Fonctionnalités',h:'/fonctionnalites'},{l:'Tarifs',h:'/tarifs'},{l:'Se connecter',h:'/connexion'},{l:'Créer un compte',h:'/inscription'}].map(i=>(
                <li key={i.l}><Link href={i.h} className="text-xs sm:text-sm hover:text-white transition-colors">{i.l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Société</p>
            <ul className="space-y-2.5">
              {[{l:'À propos',h:'/a-propos'},{l:'Contact',h:'/contact'}].map(i=>(
                <li key={i.l}><Link href={i.h} className="text-xs sm:text-sm hover:text-white transition-colors">{i.l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Légal</p>
            <ul className="space-y-2.5">
              {[{l:'CGU',h:'/cgu'},{l:'Mentions légales',h:'/mentions-legales'},{l:'Confidentialité',h:'/politique-de-confidentialite'}].map(i=>(
                <li key={i.l}><Link href={i.h} className="text-xs sm:text-sm hover:text-white transition-colors">{i.l}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
          <p className="text-xs text-gray-600">© {year} Rémi DUMAS — SIRET 939 443 776 00017 — 5 rue Lobineau, 75006 Paris</p>
          <p className="text-xs text-gray-600">Hébergé par Vercel · Paiement sécurisé Stripe</p>
        </div>
      </div>
    </footer>
  )
}
