'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const TYPES = [
  { id: 'nom-propre', label: 'Nom propre', desc: 'Vous en tant que particulier', icon: '👤', regime: 'Revenus fonciers' },
  { id: 'indivision', label: 'Indivision', desc: 'Propriété partagée entre plusieurs personnes', icon: '👥', regime: 'Revenus fonciers' },
  { id: 'sci', label: 'SCI', desc: 'Société Civile Immobilière (familiale ou non)', icon: '🏛️', regime: 'Impôt sur les sociétés' },
  { id: 'sarl-famille', label: 'SARL de famille', desc: 'Société à responsabilité limitée familiale', icon: '🏢', regime: 'Impôt sur les sociétés' },
  { id: 'lmnp-lmp', label: 'LMNP / LMP', desc: 'Loueur Meublé Non Professionnel ou Professionnel', icon: '🏨', regime: 'BIC' },
  { id: 'autre', label: 'Autre personne morale', desc: 'SA, SAS, ou autre structure', icon: '🏗️', regime: 'Impôt sur les sociétés' },
]

export default function NouveauProfilPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    type: '',
    nom: '',
    siret: '',
    adresse: '',
    codePostal: '',
    ville: '',
  })

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }))

  const selectedType = TYPES.find(t => t.id === form.type)
  const needsSiret = ['sci', 'sarl-famille', 'lmnp-lmp', 'autre'].includes(form.type)

  const handleSubmit = async () => {
    setError('')
    if (!form.nom || !form.adresse || !form.codePostal || !form.ville) {
      setError('Tous les champs obligatoires doivent être remplis.')
      return
    }
    if (needsSiret && !form.siret) {
      setError('Le SIRET est obligatoire pour ce type de structure.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/mpl/profils', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.ok) {
        router.push('/dashboard/profils-bailleurs?created=1')
      } else {
        setError(data.error || 'Erreur lors de la création.')
      }
    } catch {
      setError('Erreur réseau. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard/profils-bailleurs"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Mes profils bailleurs
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Nouveau profil bailleur</h1>
        <p className="text-sm text-gray-500 mt-1">Renseignez votre structure juridique pour gérer vos biens</p>
      </div>

      {/* Étapes */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              step >= s ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>{s}</div>
            {s < 2 && <div className={`h-px w-12 sm:w-20 transition-colors ${step > s ? 'bg-orange-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
        <div className="ml-3 text-xs text-gray-500">
          {step === 1 ? 'Type de structure' : 'Informations'}
        </div>
      </div>

      {/* ── ÉTAPE 1 : Type de structure ── */}
      {step === 1 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quel est votre type de détention ?</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {TYPES.map(type => (
              <button key={type.id} onClick={() => set('type', type.id)}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  form.type === type.id
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-200 bg-white'
                }`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{type.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm">{type.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{type.desc}</p>
                    <span className="inline-block mt-2 text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                      {type.regime}
                    </span>
                  </div>
                  {form.type === type.id && (
                    <div className="w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
          <button onClick={() => { if (form.type) setStep(2) }}
            disabled={!form.type}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-40 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm">
            Continuer →
          </button>
        </div>
      )}

      {/* ── ÉTAPE 2 : Informations ── */}
      {step === 2 && (
        <div>
          {selectedType && (
            <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
              <span className="text-2xl">{selectedType.icon}</span>
              <div>
                <p className="font-bold text-orange-800 text-sm">{selectedType.label}</p>
                <p className="text-xs text-orange-600">Régime fiscal : {selectedType.regime}</p>
              </div>
              <button onClick={() => setStep(1)} className="ml-auto text-xs text-orange-600 hover:underline">
                Modifier
              </button>
            </div>
          )}

          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {needsSiret ? 'Raison sociale *' : 'Nom du profil *'}
              </label>
              <input type="text"
                value={form.nom}
                onChange={e => set('nom', e.target.value)}
                placeholder={needsSiret ? 'Ex: SCI Les Oliviers' : 'Ex: Dupont Jean (perso)'}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
            </div>

            {needsSiret && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">SIRET *</label>
                <input type="text"
                  value={form.siret}
                  onChange={e => set('siret', e.target.value.replace(/\s/g, ''))}
                  placeholder="Ex: 123 456 789 00012"
                  maxLength={14}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
                <p className="text-xs text-gray-400 mt-1">14 chiffres, sans espaces</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {needsSiret ? 'Adresse du siège social *' : 'Adresse de domicile *'}
              </label>
              <input type="text"
                value={form.adresse}
                onChange={e => set('adresse', e.target.value)}
                placeholder="Ex: 5 rue de la Paix"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Code postal *</label>
                <input type="text"
                  value={form.codePostal}
                  onChange={e => set('codePostal', e.target.value)}
                  placeholder="75006"
                  maxLength={5}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Ville *</label>
                <input type="text"
                  value={form.ville}
                  onChange={e => set('ville', e.target.value)}
                  placeholder="Paris"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
              </div>
            </div>

            {/* Récap régime fiscal */}
            {selectedType && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-blue-700 mb-1">📊 Régime fiscal appliqué automatiquement</p>
                <p className="text-sm text-blue-800 font-bold">{selectedType.regime}</p>
                <p className="text-xs text-blue-600 mt-1">
                  {selectedType.regime === 'Revenus fonciers' && 'Déclaration 2044 — Micro-foncier ou régime réel'}
                  {selectedType.regime === 'BIC' && 'Bénéfices Industriels et Commerciaux — Liasse P0i'}
                  {selectedType.regime === 'Impôt sur les sociétés' && 'IS — Liasse fiscale 2065 et annexes'}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={() => setStep(1)}
              className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3.5 rounded-xl text-sm hover:bg-gray-50 transition-colors">
              ← Retour
            </button>
            <button onClick={handleSubmit} disabled={loading}
              className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors">
              {loading ? 'Création...' : 'Créer le profil'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
