import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Créer un compte — Mon Parc Locatif' }

export default function InscriptionPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gray-50">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Créer mon espace</h1>
          <p className="text-sm text-gray-500">Démarrez la gestion de votre parc locatif</p>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Choisissez votre offre</label>
          <div className="space-y-2.5">
            {[
              {id:'start',label:'START',price:'6,90 €/mois',desc:'1 location',featured:false},
              {id:'expert',label:'EXPERT',price:'15,80 €/mois',desc:"Jusqu'à 10 locations",featured:true},
              {id:'rentier',label:'RENTIER',price:'47,80 €/mois',desc:"Jusqu'à 50 locations",featured:false},
            ].map(plan=>(
              <label key={plan.id} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${plan.featured?'border-orange-500 bg-orange-50':'border-gray-200 hover:border-orange-200'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="plan" value={plan.id} defaultChecked={plan.featured} className="text-orange-600"/>
                  <div>
                    <span className="text-sm font-bold text-gray-900">{plan.label}</span>
                    {plan.featured&&<span className="ml-2 text-xs bg-orange-600 text-white px-2 py-0.5 rounded-full">Populaire</span>}
                    <p className="text-xs text-gray-500 mt-0.5">{plan.desc}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">{plan.price}</span>
              </label>
            ))}
          </div>
        </div>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Prénom</label>
              <input type="text" placeholder="Jean" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom</label>
              <input type="text" placeholder="Dupont" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input type="email" placeholder="jean@example.fr" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
            <input type="password" placeholder="Minimum 8 caractères" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
          </div>
          <div className="flex items-start gap-2.5 pt-1">
            <input type="checkbox" id="cgu" className="mt-0.5 text-orange-600 rounded"/>
            <label htmlFor="cgu" className="text-xs text-gray-500 leading-relaxed">
              J&apos;accepte les <Link href="/cgu" className="text-orange-600 hover:underline">CGU</Link> et la <Link href="/politique-de-confidentialite" className="text-orange-600 hover:underline">politique de confidentialité</Link>
            </label>
          </div>
          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm">Créer mon espace</button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">Déjà un compte ? <Link href="/connexion" className="text-orange-600 hover:underline font-semibold">Se connecter</Link></p>
      </div>
    </div>
  )
}
