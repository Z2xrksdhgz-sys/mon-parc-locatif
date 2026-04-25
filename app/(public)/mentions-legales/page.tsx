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
