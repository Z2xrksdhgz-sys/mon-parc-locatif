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
