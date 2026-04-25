import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Se connecter — Mon Parc Locatif' }

export default function ConnexionPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-gray-50">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Connexion</h1>
          <p className="text-sm text-gray-500">Accédez à votre espace bailleur</p>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input type="email" placeholder="votre@email.fr" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
          </div>
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="text-sm font-medium text-gray-700">Mot de passe</label>
              <a href="#" className="text-xs text-orange-600 hover:underline">Mot de passe oublié ?</a>
            </div>
            <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
          </div>
          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm mt-2">Se connecter</button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">Pas encore de compte ? <Link href="/inscription" className="text-orange-600 hover:underline font-semibold">Créer un compte</Link></p>
      </div>
    </div>
  )
}
