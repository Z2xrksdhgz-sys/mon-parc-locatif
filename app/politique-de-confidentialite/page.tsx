import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Politique de confidentialité & RGPD — Mon Parc Locatif' }

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Politique de confidentialité & RGPD</h1>
      <p className="text-sm text-gray-500 mb-10">Dernière mise à jour : juin 2025</p>
      <div className="space-y-10 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Identité du responsable de traitement</h2>
          <div className="bg-gray-50 rounded-xl p-5 space-y-1.5">
            <p><span className="font-medium text-gray-800">Responsable :</span> Rémi DUMAS — Auto-entrepreneur</p>
            <p><span className="font-medium text-gray-800">SIRET :</span> 939 443 776 00017</p>
            <p><span className="font-medium text-gray-800">Adresse :</span> 5 rue Lobineau, 75006 Paris</p>
            <p><span className="font-medium text-gray-800">Contact :</span> <a href="mailto:contact@moncontratdelocation.fr" className="text-orange-600 hover:underline">contact@moncontratdelocation.fr</a></p>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Données collectées</h2>
          <div className="space-y-3">
            {[
              {t:"Données d'identification",items:["Nom, prénom","Adresse email","Mot de passe (chiffré, jamais stocké en clair)"]},
              {t:"Données de gestion locative",items:["Informations sur les biens (adresse, type, surface, loyer…)","Informations sur les locataires (identité, coordonnées)","Informations financières (loyers, charges, quittances)","Documents associés (baux, états des lieux, diagnostics…)"]},
              {t:"Données de paiement",items:["Traitement via Stripe — aucune donnée bancaire stockée","Historique des transactions (référence, montant, date)"]},
              {t:"Données techniques",items:["Adresse IP","Données de navigation (pages visitées, durée de session)"]},
            ].map(({t,items})=>(
              <div key={t} className="bg-white border border-gray-200 rounded-xl p-5">
                <p className="font-semibold text-gray-900 mb-2">{t}</p>
                <ul className="space-y-1">{items.map(i=><li key={i} className="flex items-start gap-2"><span className="text-orange-500 flex-shrink-0">•</span>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Finalités et bases légales</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-gray-50"><th className="text-left p-3 border border-gray-200 font-semibold text-gray-800">Finalité</th><th className="text-left p-3 border border-gray-200 font-semibold text-gray-800">Base légale</th></tr></thead>
              <tbody>
                {[
                  ["Fourniture du service","Exécution du contrat (art. 6.1.b RGPD)"],
                  ["Gestion de l'abonnement et facturation","Exécution du contrat (art. 6.1.b RGPD)"],
                  ["Amélioration du service","Intérêt légitime (art. 6.1.f RGPD)"],
                  ["Communications transactionnelles","Exécution du contrat (art. 6.1.b RGPD)"],
                  ["Communications marketing","Consentement (art. 6.1.a RGPD)"],
                  ["Obligations légales","Obligation légale (art. 6.1.c RGPD)"],
                  ["Prévention de la fraude","Intérêt légitime (art. 6.1.f RGPD)"],
                ].map(([f,b],i)=>(
                  <tr key={f} className={i%2===0?'bg-white':'bg-gray-50'}><td className="p-3 border border-gray-200">{f}</td><td className="p-3 border border-gray-200 text-gray-500">{b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Durée de conservation</h2>
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
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Partage des données</h2>
          <p className="mb-4 font-semibold text-gray-800">Nous ne vendons jamais vos données personnelles.</p>
          <div className="space-y-3">
            {[
              {dest:"Stripe",role:"Prestataire de paiement",pays:"États-Unis (garanties RGPD)"},
              {dest:"Vercel",role:"Hébergeur de la plateforme",pays:"États-Unis (garanties RGPD)"},
              {dest:"Firebase (Google)",role:"Base de données sécurisée",pays:"Union Européenne"},
              {dest:"Resend",role:"Envoi d'emails transactionnels",pays:"Union Européenne"},
            ].map(({dest,role,pays})=>(
              <div key={dest} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                <div><p className="font-semibold text-gray-900 text-sm">{dest}</p><p className="text-xs text-gray-500">{role}</p></div>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{pays}</span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Vos droits</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-5">
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
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
            <p className="font-semibold text-gray-900 mb-2">Exercer vos droits</p>
            <p>Contactez-nous : <a href="mailto:contact@moncontratdelocation.fr" className="text-orange-600 hover:underline font-medium">contact@moncontratdelocation.fr</a></p>
            <p className="mt-2 text-gray-500 text-xs">Réponse sous 30 jours. Vous pouvez aussi contacter la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">CNIL</a>.</p>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Sécurité</h2>
          <ul className="space-y-2">
            {["Chiffrement en transit (HTTPS/TLS)","Chiffrement au repos (AES-256)","Mots de passe hachés et salés","Accès restreint aux agents autorisés","Sauvegardes régulières et sécurisées"].map(m=>(
              <li key={m} className="flex items-start gap-2"><span className="text-orange-500 flex-shrink-0 mt-0.5">✓</span>{m}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Cookies</h2>
          <p>Nous utilisons uniquement des cookies techniques indispensables au service (session, préférences). Aucun cookie publicitaire ou de tracking tiers.</p>
        </section>
        <div className="bg-gray-900 rounded-2xl p-6 text-center">
          <p className="text-white font-semibold mb-2">Une question sur vos données ?</p>
          <a href="mailto:contact@moncontratdelocation.fr" className="text-orange-400 hover:text-orange-300 text-sm font-medium">contact@moncontratdelocation.fr</a>
        </div>
      </div>
    </div>
  )
}
