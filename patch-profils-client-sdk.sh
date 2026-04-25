#!/bin/bash
set -e
cd ~/Documents/mon-parc-locatif

echo "📁 Mise à jour des pages profil bailleur (client SDK Firebase)..."

# ── Page liste : utilise Firebase client SDK ──────────────────
cat > app/dashboard/profils-bailleurs/page.tsx << 'ENDOFFILE'
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase-client'
import { useAuth } from '@/app/providers'

interface Profil {
  id: string; type: string; nom: string; siret?: string
  adresse: string; codePostal: string; ville: string
  regimeFiscal: string; nbLocations: number; createdAt: string
}

const TYPE_LABELS: Record<string, string> = {
  'nom-propre': 'Nom propre', 'indivision': 'Indivision', 'sci': 'SCI',
  'sarl-famille': 'SARL de famille', 'lmnp-lmp': 'LMNP / LMP', 'autre': 'Autre personne morale',
}

const TYPE_ICONS: Record<string, string> = {
  'nom-propre': '👤', 'indivision': '👥', 'sci': '🏛️',
  'sarl-famille': '🏢', 'lmnp-lmp': '🏨', 'autre': '🏗️',
}

const REGIME_LABELS: Record<string, { label: string; color: string }> = {
  'revenus-fonciers': { label: 'Revenus fonciers', color: 'bg-blue-50 text-blue-700' },
  'bic': { label: 'BIC (LMNP/LMP)', color: 'bg-green-50 text-green-700' },
  'is': { label: 'Impôt sur les sociétés', color: 'bg-purple-50 text-purple-700' },
  'ir': { label: 'Impôt sur le revenu', color: 'bg-indigo-50 text-indigo-700' },
}

export default function ProfilsBailleursPage() {
  const { user } = useAuth()
  const [profils, setProfils] = useState<Profil[]>([])
  const [loading, setLoading] = useState(true)
  const [justCreated] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search)
      return p.get('created') === '1'
    }
    return false
  })

  useEffect(() => {
    if (!user) return
    const q = query(collection(db, 'mpl_profils'), where('ownerId', '==', user.uid))
    getDocs(q)
      .then(snap => {
        const data = snap.docs
          .map(d => ({ id: d.id, ...d.data() } as Profil))
          .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
        setProfils(data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user])

  if (loading) return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto flex justify-center py-20">
      <div className="w-6 h-6 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <span className="text-3xl">👤</span>Mes profils bailleurs
          </h1>
          <p className="text-sm text-gray-500 mt-1">Gérez vos structures juridiques (SCI, LMNP, nom propre…)</p>
        </div>
        <Link href="/dashboard/profils-bailleurs/nouveau"
          className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Nouveau profil
        </Link>
      </div>

      {justCreated && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <span className="text-xl">🎉</span>
          <p className="text-sm font-semibold text-green-800">Profil bailleur créé avec succès !</p>
        </div>
      )}

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 sm:p-5 mb-6 flex gap-3">
        <span className="text-xl flex-shrink-0">💡</span>
        <div>
          <p className="text-sm font-semibold text-orange-800 mb-1">Pourquoi créer un profil bailleur ?</p>
          <p className="text-sm text-orange-700 leading-relaxed">
            Chaque profil représente une structure juridique. Vos biens et locations y seront rattachés pour un suivi comptable et fiscal distinct.
          </p>
        </div>
      </div>

      {profils.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-10 sm:p-16 text-center">
          <div className="text-5xl mb-4">👤</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Aucun profil bailleur</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
            Créez votre premier profil pour commencer à gérer vos biens.
          </p>
          <Link href="/dashboard/profils-bailleurs/nouveau"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
            Créer mon premier profil
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {profils.map(profil => {
            const regime = REGIME_LABELS[profil.regimeFiscal]
            return (
              <div key={profil.id} className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 hover:border-orange-200 hover:shadow-sm transition-all flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-lg">
                    {TYPE_ICONS[profil.type] || '👤'}
                  </div>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                    {TYPE_LABELS[profil.type] || profil.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{profil.nom}</h3>
                <p className="text-sm text-gray-500 mb-3">{profil.adresse}, {profil.codePostal} {profil.ville}</p>
                {profil.siret && <p className="text-xs text-gray-400 mb-3">SIRET : {profil.siret}</p>}
                <div className="mb-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${regime?.color || 'bg-gray-100 text-gray-600'}`}>
                    {regime?.label || profil.regimeFiscal}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-4 mt-auto flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{profil.nbLocations || 0}</p>
                    <p className="text-xs text-gray-400">location{(profil.nbLocations || 0) > 1 ? 's' : ''}</p>
                  </div>
                  <Link href={`/dashboard/profils-bailleurs/${profil.id}`}
                    className="text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors">
                    Voir →
                  </Link>
                </div>
              </div>
            )
          })}
          <Link href="/dashboard/profils-bailleurs/nouveau"
            className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-5 sm:p-6 hover:border-orange-300 hover:bg-orange-50 transition-all flex flex-col items-center justify-center text-center gap-3 min-h-[200px]">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4v12M4 10h12" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">Ajouter un profil</p>
              <p className="text-xs text-gray-400 mt-0.5">SCI, LMNP, nom propre…</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}
ENDOFFILE
echo "✅ profils-bailleurs/page.tsx"

# ── Formulaire : utilise Firebase client SDK pour créer ───────
cat > app/dashboard/profils-bailleurs/nouveau/page.tsx << 'ENDOFFILE'
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase-client'
import { useAuth } from '@/app/providers'

const TYPES = [
  { id: 'nom-propre', label: 'Nom propre', desc: 'Vous en tant que particulier', icon: '👤',
    regimes: [{ id: 'revenus-fonciers', label: 'Revenus fonciers', desc: 'Régime par défaut pour les particuliers' }],
    needsSiret: false, hasIndivisaires: false },
  { id: 'indivision', label: 'Indivision', desc: 'Propriété partagée entre plusieurs personnes', icon: '👥',
    regimes: [{ id: 'revenus-fonciers', label: 'Revenus fonciers', desc: 'Chaque indivisaire déclare sa quote-part' }],
    needsSiret: false, hasIndivisaires: true },
  { id: 'sci', label: 'SCI', desc: 'Société Civile Immobilière', icon: '🏛️',
    regimes: [
      { id: 'ir', label: 'Impôt sur le revenu (IR)', desc: 'Option classique — chaque associé déclare sa part' },
      { id: 'is', label: 'Impôt sur les sociétés (IS)', desc: 'Résultat imposé au niveau de la société' },
    ],
    needsSiret: true, hasIndivisaires: false },
  { id: 'sarl-famille', label: 'SARL de famille', desc: 'SARL entre membres d\'une même famille', icon: '🏢',
    regimes: [
      { id: 'ir', label: 'Impôt sur le revenu (IR)', desc: 'Option possible pour SARL de famille' },
      { id: 'is', label: 'Impôt sur les sociétés (IS)', desc: 'Régime standard des sociétés' },
    ],
    needsSiret: true, hasIndivisaires: false },
  { id: 'lmnp-lmp', label: 'LMNP / LMP', desc: 'Loueur Meublé Non / Professionnel', icon: '🏨',
    regimes: [{ id: 'bic', label: 'BIC', desc: 'Bénéfices Industriels et Commerciaux — micro-BIC ou réel' }],
    needsSiret: true, hasIndivisaires: false },
  { id: 'autre', label: 'Autre personne morale', desc: 'SA, SAS, ou autre structure', icon: '🏗️',
    regimes: [
      { id: 'ir', label: 'Impôt sur le revenu (IR)', desc: 'Si option applicable' },
      { id: 'is', label: 'Impôt sur les sociétés (IS)', desc: 'Régime standard' },
    ],
    needsSiret: true, hasIndivisaires: false },
]

interface Indivisaire { prenom: string; nom: string; email: string; quotePart: string }

export default function NouveauProfilPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userProfile, setUserProfile] = useState<any>(null)

  const [form, setForm] = useState({
    type: '', regimeFiscalChoisi: '', nom: '', siret: '',
    adresse: '', codePostal: '', ville: '',
    autofillFromProfile: false,
    indivisaires: [] as Indivisaire[],
  })

  useEffect(() => {
    fetch('/api/mpl/user-profile')
      .then(r => r.json())
      .then(d => setUserProfile(d.profile))
      .catch(() => {})
  }, [])

  const set = (key: string, val: any) => setForm(f => ({ ...f, [key]: val }))
  const selectedType = TYPES.find(t => t.id === form.type)

  const handleAutofill = (checked: boolean) => {
    if (checked && userProfile) {
      setForm(f => ({
        ...f, autofillFromProfile: true,
        nom: `${userProfile.prenom || ''} ${userProfile.nom || ''}`.trim(),
        adresse: userProfile.adresse || '',
        codePostal: userProfile.codePostal || '',
        ville: userProfile.ville || '',
      }))
    } else {
      setForm(f => ({ ...f, autofillFromProfile: false, nom: '', adresse: '', codePostal: '', ville: '' }))
    }
  }

  const addIndivisaire = () => setForm(f => ({
    ...f, indivisaires: [...f.indivisaires, { prenom: '', nom: '', email: '', quotePart: '' }]
  }))
  const updateInd = (idx: number, key: keyof Indivisaire, val: string) =>
    setForm(f => ({ ...f, indivisaires: f.indivisaires.map((ind, i) => i === idx ? { ...ind, [key]: val } : ind) }))
  const removeInd = (idx: number) =>
    setForm(f => ({ ...f, indivisaires: f.indivisaires.filter((_, i) => i !== idx) }))

  const handleSubmit = async () => {
    if (!user) { setError('Non authentifié'); return }
    setError('')
    if (!form.nom || !form.adresse || !form.codePostal || !form.ville) {
      setError('Tous les champs obligatoires doivent être remplis.')
      return
    }
    if (selectedType?.needsSiret && !form.siret) {
      setError('Le SIRET est obligatoire pour ce type de structure.')
      return
    }
    setLoading(true)
    try {
      const regimeAuto: Record<string, string> = {
        'nom-propre': 'revenus-fonciers', 'indivision': 'revenus-fonciers',
        'sci': 'ir', 'sarl-famille': 'ir', 'lmnp-lmp': 'bic', 'autre': 'is',
      }
      await addDoc(collection(db, 'mpl_profils'), {
        ownerId: user.uid,
        type: form.type,
        nom: form.nom,
        siret: form.siret || null,
        adresse: form.adresse,
        codePostal: form.codePostal,
        ville: form.ville,
        regimeFiscal: form.regimeFiscalChoisi || regimeAuto[form.type] || 'revenus-fonciers',
        indivisaires: form.indivisaires,
        autofillFromProfile: form.autofillFromProfile,
        nbLocations: 0,
        createdAt: new Date().toISOString(),
      })
      router.push('/dashboard/profils-bailleurs?created=1')
    } catch (err: any) {
      console.error(err)
      setError(`Erreur : ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const totalQuotePart = form.indivisaires.reduce((s, i) => s + (parseFloat(i.quotePart) || 0), 0)
  const profileIncomplete = !userProfile?.prenom || !userProfile?.adresse

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/dashboard/profils-bailleurs"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Mes profils bailleurs
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Nouveau profil bailleur</h1>
        <p className="text-sm text-gray-500 mt-1">Configurez votre structure juridique</p>
      </div>

      {/* Étapes */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              step >= s ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>{s}</div>
            {s < 3 && <div className={`h-px w-8 sm:w-16 ${step > s ? 'bg-orange-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
        <span className="ml-3 text-xs text-gray-500">
          {step === 1 ? 'Type de structure' : step === 2 ? 'Régime fiscal' : 'Informations'}
        </span>
      </div>

      {/* ÉTAPE 1 */}
      {step === 1 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quel est votre type de détention ?</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {TYPES.map(type => (
              <button key={type.id} onClick={() => set('type', type.id)}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  form.type === type.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-200 bg-white'
                }`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{type.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm">{type.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{type.desc}</p>
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
          <button onClick={() => { if (form.type) setStep(2) }} disabled={!form.type}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-40 text-white font-semibold py-3.5 rounded-xl text-sm">
            Continuer →
          </button>
        </div>
      )}

      {/* ÉTAPE 2 */}
      {step === 2 && selectedType && (
        <div>
          <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
            <span className="text-2xl">{selectedType.icon}</span>
            <p className="font-bold text-orange-800 text-sm">{selectedType.label}</p>
            <button onClick={() => setStep(1)} className="ml-auto text-xs text-orange-600 hover:underline">Modifier</button>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Quel est votre régime fiscal ?</h2>
          <p className="text-sm text-gray-500 mb-5">Modifiable ultérieurement si vous changez d&apos;option.</p>
          <div className="space-y-3 mb-8">
            {selectedType.regimes.map(regime => (
              <button key={regime.id} onClick={() => set('regimeFiscalChoisi', regime.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  form.regimeFiscalChoisi === regime.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-200 bg-white'
                }`}>
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    form.regimeFiscalChoisi === regime.id ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                  }`}>
                    {form.regimeFiscalChoisi === regime.id && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{regime.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{regime.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3.5 rounded-xl text-sm hover:bg-gray-50">← Retour</button>
            <button
              onClick={() => {
                if (!form.regimeFiscalChoisi && selectedType.regimes.length === 1) {
                  set('regimeFiscalChoisi', selectedType.regimes[0].id)
                }
                setStep(3)
              }}
              disabled={selectedType.regimes.length > 1 && !form.regimeFiscalChoisi}
              className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:opacity-40 text-white font-semibold py-3.5 rounded-xl text-sm">
              Continuer →
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 3 */}
      {step === 3 && selectedType && (
        <div>
          <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
            <span className="text-2xl">{selectedType.icon}</span>
            <div>
              <p className="font-bold text-orange-800 text-sm">{selectedType.label}</p>
              <p className="text-xs text-orange-600">
                {selectedType.regimes.find(r => r.id === form.regimeFiscalChoisi)?.label || ''}
              </p>
            </div>
            <button onClick={() => setStep(1)} className="ml-auto text-xs text-orange-600 hover:underline">Modifier</button>
          </div>

          <div className="space-y-4">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>}

            {/* Auto-fill nom propre */}
            {form.type === 'nom-propre' && (
              <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                form.autofillFromProfile ? 'border-orange-300 bg-orange-50' : 'border-gray-200 bg-gray-50'
              }`}>
                <input type="checkbox" checked={form.autofillFromProfile}
                  onChange={e => handleAutofill(e.target.checked)}
                  className="mt-0.5 text-orange-600 rounded flex-shrink-0"/>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Je suis la personne physique concernée</p>
                  <p className="text-xs text-gray-500 mt-0.5">Pré-remplir avec mes informations personnelles</p>
                  {profileIncomplete && (
                    <p className="text-xs text-orange-600 mt-1.5 font-medium">
                      ⚠️ Votre profil personnel est incomplet.{' '}
                      <Link href="/dashboard/mon-profil" className="underline">Complétez-le d&apos;abord →</Link>
                    </p>
                  )}
                </div>
              </label>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {selectedType.needsSiret ? 'Raison sociale *' : form.type === 'nom-propre' ? 'Nom complet *' : 'Nom du profil *'}
              </label>
              <input type="text" value={form.nom} onChange={e => set('nom', e.target.value)}
                disabled={form.autofillFromProfile}
                placeholder={selectedType.needsSiret ? 'Ex: SCI Les Oliviers' : 'Ex: Jean Dupont'}
                className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${form.autofillFromProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}/>
            </div>

            {selectedType.needsSiret && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">SIRET *</label>
                <input type="text" value={form.siret}
                  onChange={e => set('siret', e.target.value.replace(/\D/g, '').slice(0, 14))}
                  placeholder="12345678900012"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                <p className="text-xs text-gray-400 mt-1">{form.siret.length}/14 chiffres</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {selectedType.needsSiret ? 'Adresse du siège social *' : 'Adresse de domicile *'}
              </label>
              <input type="text" value={form.adresse} onChange={e => set('adresse', e.target.value)}
                disabled={form.autofillFromProfile}
                placeholder="5 rue de la Paix"
                className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${form.autofillFromProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}/>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Code postal *</label>
                <input type="text" value={form.codePostal} onChange={e => set('codePostal', e.target.value)}
                  disabled={form.autofillFromProfile} maxLength={5} placeholder="75006"
                  className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${form.autofillFromProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Ville *</label>
                <input type="text" value={form.ville} onChange={e => set('ville', e.target.value)}
                  disabled={form.autofillFromProfile} placeholder="Paris"
                  className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${form.autofillFromProfile ? 'bg-gray-100 cursor-not-allowed' : ''}`}/>
              </div>
            </div>

            {/* Indivisaires */}
            {selectedType.hasIndivisaires && (
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-bold text-gray-900">Co-indivisaires</p>
                    <p className="text-xs text-gray-500">Ajoutez les autres propriétaires et leurs quotes-parts</p>
                  </div>
                  <button onClick={addIndivisaire}
                    className="text-xs font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg">
                    + Ajouter
                  </button>
                </div>
                {form.indivisaires.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-4">Aucun co-indivisaire ajouté</p>
                )}
                {form.indivisaires.map((ind, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-3 mb-2">
                    <div className="flex justify-between mb-2">
                      <p className="text-xs font-semibold text-gray-600">Co-indivisaire {idx + 1}</p>
                      <button onClick={() => removeInd(idx)} className="text-xs text-red-500 hover:text-red-700">Supprimer</button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input type="text" value={ind.prenom} onChange={e => updateInd(idx, 'prenom', e.target.value)}
                        placeholder="Prénom"
                        className="border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"/>
                      <input type="text" value={ind.nom} onChange={e => updateInd(idx, 'nom', e.target.value)}
                        placeholder="Nom"
                        className="border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"/>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="email" value={ind.email} onChange={e => updateInd(idx, 'email', e.target.value)}
                        placeholder="email@example.fr"
                        className="border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"/>
                      <div className="relative">
                        <input type="number" value={ind.quotePart} onChange={e => updateInd(idx, 'quotePart', e.target.value)}
                          placeholder="50" min="0" max="100"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"/>
                        <span className="absolute right-3 top-2 text-xs text-gray-400">%</span>
                      </div>
                    </div>
                  </div>
                ))}
                {form.indivisaires.length > 0 && (
                  <p className={`text-xs text-right font-semibold mt-1 ${Math.abs(totalQuotePart - 100) > 0.01 ? 'text-orange-600' : 'text-green-600'}`}>
                    Total : {totalQuotePart.toFixed(0)}% / 100%
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={() => setStep(2)} className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3.5 rounded-xl text-sm hover:bg-gray-50">
              ← Retour
            </button>
            <button onClick={handleSubmit} disabled={loading}
              className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl text-sm">
              {loading ? 'Création...' : 'Créer le profil ✓'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
ENDOFFILE
echo "✅ profils-bailleurs/nouveau/page.tsx"

git add .
git commit -m "fix: profil bailleur utilise Firebase client SDK (plus d'erreur Admin SDK)"
git push

echo ""
echo "🎉 Patch appliqué !"
echo "Teste sur http://localhost:3000/dashboard/profils-bailleurs/nouveau"
