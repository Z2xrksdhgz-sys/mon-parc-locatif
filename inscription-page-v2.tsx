import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Créer un compte — Mon Parc Locatif' }

export default function InscriptionPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gray-50">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md shadow-sm">

        <div className="text-center mb-8">
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
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom</label>
              <input type="text" placeholder="Dupont"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input type="email" placeholder="jean@example.fr"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
            <input type="password" placeholder="Minimum 8 caractères"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <input type="checkbox" id="cgu" className="mt-0.5 text-orange-600 rounded" />
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

        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 mb-3">Offres disponibles à partir de</p>
          <div className="flex justify-center gap-4">
            {[
              { name: 'START', price: '6,90 €' },
              { name: 'EXPERT', price: '15,80 €' },
              { name: 'RENTIER', price: '47,80 €' },
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
