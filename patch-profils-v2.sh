#!/bin/bash
set -e
cd ~/Documents/mon-parc-locatif

mkdir -p app/dashboard/profils-bailleurs/nouveau
mkdir -p app/dashboard/mon-profil
mkdir -p app/api/mpl/profils
mkdir -p app/api/mpl/user-profile

echo "📁 Dossiers créés"

# ── API : user profile (GET + PUT) ────────────────────────────
cat > app/api/mpl/user-profile/route.ts << 'ENDOFFILE'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getAdminDb } from '@/lib/firebase-admin'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const uid = cookieStore.get('mpl-session')?.value
    if (!uid) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    const db = getAdminDb()
    const snap = await db.collection('mpl_users').doc(uid).get()
    return NextResponse.json({ profile: snap.exists ? snap.data() : null })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const cookieStore = await cookies()
    const uid = cookieStore.get('mpl-session')?.value
    if (!uid) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    const body = await req.json()
    const { prenom, nom, dateNaissance, lieuNaissance, telephone, adresse, codePostal, ville } = body
    const db = getAdminDb()
    await db.collection('mpl_users').doc(uid).set({
      prenom: prenom || '',
      nom: nom || '',
      dateNaissance: dateNaissance || '',
      lieuNaissance: lieuNaissance || '',
      telephone: telephone || '',
      adresse: adresse || '',
      codePostal: codePostal || '',
      ville: ville || '',
      profileComplete: !!(prenom && nom && adresse && codePostal && ville),
      updatedAt: new Date().toISOString(),
    }, { merge: true })
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
ENDOFFILE
echo "✅ api/mpl/user-profile/route.ts"

# ── API : profils (sans orderBy pour éviter l'erreur index) ──
cat > app/api/mpl/profils/route.ts << 'ENDOFFILE'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getAdminDb } from '@/lib/firebase-admin'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const uid = cookieStore.get('mpl-session')?.value
    if (!uid) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const db = getAdminDb()
    const snap = await db.collection('mpl_profils')
      .where('ownerId', '==', uid)
      .get()

    const profils = snap.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .sort((a: any, b: any) => (b.createdAt || '').localeCompare(a.createdAt || ''))

    return NextResponse.json({ profils })
  } catch (err: any) {
    console.error('GET profils error:', err)
    return NextResponse.json({ error: err.message, code: err.code }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const uid = cookieStore.get('mpl-session')?.value
    if (!uid) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const body = await req.json()
    const {
      type, nom, siret, adresse, codePostal, ville,
      regimeFiscalChoisi,
      indivisaires,
      autofillFromProfile,
    } = body

    if (!type || !nom || !adresse || !codePostal || !ville) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
    }

    // Régime fiscal : auto ou choisi
    const regimeAuto: Record<string, string> = {
      'nom-propre': 'revenus-fonciers',
      'indivision': 'revenus-fonciers',
      'sci': 'is',
      'sarl-famille': 'is',
      'lmnp-lmp': 'bic',
      'autre': 'is',
    }
    const regimeFiscal = regimeFiscalChoisi || regimeAuto[type] || 'revenus-fonciers'

    const db = getAdminDb()
    const ref = await db.collection('mpl_profils').add({
      ownerId: uid,
      type,
      nom,
      siret: siret || null,
      adresse,
      codePostal,
      ville,
      regimeFiscal,
      indivisaires: indivisaires || [],
      autofillFromProfile: autofillFromProfile || false,
      nbLocations: 0,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ id: ref.id, ok: true })
  } catch (err: any) {
    console.error('POST profils error:', err)
    return NextResponse.json({ error: err.message, code: err.code }, { status: 500 })
  }
}
ENDOFFILE
echo "✅ api/mpl/profils/route.ts"

# ── Page : mon profil utilisateur ─────────────────────────────
cat > app/dashboard/mon-profil/page.tsx << 'ENDOFFILE'
'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/app/providers'

interface UserProfile {
  prenom: string; nom: string; dateNaissance: string; lieuNaissance: string
  telephone: string; adresse: string; codePostal: string; ville: string; email: string
}

export default function MonProfilPage() {
  const { user, mplUser, refreshUser } = useAuth()
  const [form, setForm] = useState<UserProfile>({
    prenom: '', nom: '', dateNaissance: '', lieuNaissance: '',
    telephone: '', adresse: '', codePostal: '', ville: '', email: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/mpl/user-profile')
      .then(r => r.json())
      .then(d => {
        if (d.profile) {
          setForm(f => ({ ...f, ...d.profile, email: user?.email || '' }))
        } else {
          setForm(f => ({
            ...f,
            prenom: mplUser?.prenom || '',
            nom: mplUser?.nom || '',
            email: user?.email || '',
          }))
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [user, mplUser])

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }))

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSaved(false)
    try {
      const res = await fetch('/api/mpl/user-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.ok) { setSaved(true); await refreshUser() }
      else setError(data.error || 'Erreur lors de la sauvegarde.')
    } catch { setError('Erreur réseau.') }
    finally { setSaving(false) }
  }

  const isComplete = !!(form.prenom && form.nom && form.adresse && form.codePostal && form.ville)

  if (loading) return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto flex justify-center py-20">
      <div className="w-6 h-6 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
          <span className="text-3xl">👤</span>Mon profil
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Ces informations servent à pré-remplir vos documents et profils bailleurs.
        </p>
      </div>

      {!isComplete && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-6 flex gap-3">
          <span className="text-xl flex-shrink-0">⚠️</span>
          <div>
            <p className="text-sm font-semibold text-orange-800">Profil incomplet</p>
            <p className="text-sm text-orange-700">Complétez votre profil pour bénéficier du pré-remplissage automatique de vos documents.</p>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-5">

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Prénom *</label>
            <input type="text" value={form.prenom} onChange={e => set('prenom', e.target.value)}
              placeholder="Jean"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom *</label>
            <input type="text" value={form.nom} onChange={e => set('nom', e.target.value)}
              placeholder="Dupont"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"/>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <input type="email" value={form.email} disabled
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"/>
          <p className="text-xs text-gray-400 mt-1">L&apos;email ne peut pas être modifié ici</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone</label>
          <input type="tel" value={form.telephone} onChange={e => set('telephone', e.target.value)}
            placeholder="06 12 34 56 78"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"/>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Date de naissance</label>
            <input type="date" value={form.dateNaissance} onChange={e => set('dateNaissance', e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Lieu de naissance</label>
            <input type="text" value={form.lieuNaissance} onChange={e => set('lieuNaissance', e.target.value)}
              placeholder="Paris (75)"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"/>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-5">
          <p className="text-sm font-semibold text-gray-700 mb-3">Adresse postale actuelle *</p>
          <div className="space-y-3">
            <input type="text" value={form.adresse} onChange={e => set('adresse', e.target.value)}
              placeholder="5 rue de la Paix"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"/>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" value={form.codePostal} onChange={e => set('codePostal', e.target.value)}
                placeholder="75006" maxLength={5}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"/>
              <input type="text" value={form.ville} onChange={e => set('ville', e.target.value)}
                placeholder="Paris"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"/>
            </div>
          </div>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>}
        {saved && <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">✅ Profil mis à jour avec succès</div>}

        <button onClick={handleSave} disabled={saving}
          className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors">
          {saving ? 'Sauvegarde...' : 'Sauvegarder mon profil'}
        </button>
      </div>
    </div>
  )
}
ENDOFFILE
echo "✅ dashboard/mon-profil/page.tsx"

# ── Formulaire création profil v2 (toutes corrections) ────────
cat > app/dashboard/profils-bailleurs/nouveau/page.tsx << 'ENDOFFILE'
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const TYPES = [
  { id: 'nom-propre', label: 'Nom propre', desc: 'Vous en tant que particulier', icon: '👤',
    regimes: [{ id: 'revenus-fonciers', label: 'Revenus fonciers', desc: 'Régime par défaut pour les particuliers' }],
    needsSiret: false, hasIndivisaires: false },
  { id: 'indivision', label: 'Indivision', desc: 'Propriété partagée entre plusieurs personnes', icon: '👥',
    regimes: [{ id: 'revenus-fonciers', label: 'Revenus fonciers', desc: 'Chaque indivisaire déclare sa quote-part' }],
    needsSiret: false, hasIndivisaires: true },
  { id: 'sci', label: 'SCI', desc: 'Société Civile Immobilière', icon: '🏛️',
    regimes: [
      { id: 'ir', label: 'Impôt sur le revenu (IR)', desc: 'Option par défaut pour les SCI — chaque associé déclare sa part' },
      { id: 'is', label: 'Impôt sur les sociétés (IS)', desc: 'Résultat imposé au niveau de la société' },
    ],
    needsSiret: true, hasIndivisaires: false },
  { id: 'sarl-famille', label: 'SARL de famille', desc: 'Société à responsabilité limitée familiale', icon: '🏢',
    regimes: [
      { id: 'ir', label: 'Impôt sur le revenu (IR)', desc: 'Option possible pour SARL de famille' },
      { id: 'is', label: 'Impôt sur les sociétés (IS)', desc: 'Régime standard des sociétés' },
    ],
    needsSiret: true, hasIndivisaires: false },
  { id: 'lmnp-lmp', label: 'LMNP / LMP', desc: 'Loueur Meublé Non Professionnel ou Professionnel', icon: '🏨',
    regimes: [{ id: 'bic', label: 'BIC', desc: 'Bénéfices Industriels et Commerciaux — micro-BIC ou réel' }],
    needsSiret: true, hasIndivisaires: false },
  { id: 'autre', label: 'Autre personne morale', desc: 'SA, SAS, ou autre structure', icon: '🏗️',
    regimes: [
      { id: 'ir', label: 'Impôt sur le revenu (IR)', desc: 'Si option applicable' },
      { id: 'is', label: 'Impôt sur les sociétés (IS)', desc: 'Régime standard' },
    ],
    needsSiret: true, hasIndivisaires: false },
]

interface Indivisaire {
  prenom: string; nom: string; email: string; quotePart: string
}

export default function NouveauProfilPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userProfile, setUserProfile] = useState<any>(null)

  const [form, setForm] = useState({
    type: '',
    regimeFiscalChoisi: '',
    nom: '',
    siret: '',
    adresse: '',
    codePostal: '',
    ville: '',
    autofillFromProfile: false,
    indivisaires: [] as Indivisaire[],
  })

  // Charger le profil utilisateur pour pré-remplissage
  useEffect(() => {
    fetch('/api/mpl/user-profile')
      .then(r => r.json())
      .then(d => setUserProfile(d.profile))
      .catch(() => {})
  }, [])

  const set = (key: string, val: any) => setForm(f => ({ ...f, [key]: val }))
  const selectedType = TYPES.find(t => t.id === form.type)

  // Pré-remplissage depuis le profil utilisateur (nom propre)
  const handleAutofill = (checked: boolean) => {
    set('autofillFromProfile', checked)
    if (checked && userProfile) {
      setForm(f => ({
        ...f,
        autofillFromProfile: true,
        nom: `${userProfile.prenom || ''} ${userProfile.nom || ''}`.trim(),
        adresse: userProfile.adresse || '',
        codePostal: userProfile.codePostal || '',
        ville: userProfile.ville || '',
      }))
    } else if (!checked) {
      setForm(f => ({ ...f, autofillFromProfile: false, nom: '', adresse: '', codePostal: '', ville: '' }))
    }
  }

  // Gestion des indivisaires
  const addIndivisaire = () => {
    setForm(f => ({
      ...f,
      indivisaires: [...f.indivisaires, { prenom: '', nom: '', email: '', quotePart: '' }]
    }))
  }
  const updateIndivisaire = (idx: number, key: keyof Indivisaire, val: string) => {
    setForm(f => ({
      ...f,
      indivisaires: f.indivisaires.map((ind, i) => i === idx ? { ...ind, [key]: val } : ind)
    }))
  }
  const removeIndivisaire = (idx: number) => {
    setForm(f => ({ ...f, indivisaires: f.indivisaires.filter((_, i) => i !== idx) }))
  }

  const handleSubmit = async () => {
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
      const res = await fetch('/api/mpl/profils', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.ok) router.push('/dashboard/profils-bailleurs?created=1')
      else setError(data.error || `Erreur (${data.code || 'inconnu'})`)
    } catch { setError('Erreur réseau. Réessayez.') }
    finally { setLoading(false) }
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
        <div className="ml-3 text-xs text-gray-500">
          {step === 1 ? 'Type de structure' : step === 2 ? 'Régime fiscal' : 'Informations'}
        </div>
      </div>

      {/* ── ÉTAPE 1 : Type ── */}
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
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-40 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors">
            Continuer →
          </button>
        </div>
      )}

      {/* ── ÉTAPE 2 : Régime fiscal ── */}
      {step === 2 && selectedType && (
        <div>
          <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
            <span className="text-2xl">{selectedType.icon}</span>
            <p className="font-bold text-orange-800 text-sm">{selectedType.label}</p>
            <button onClick={() => setStep(1)} className="ml-auto text-xs text-orange-600 hover:underline">Modifier</button>
          </div>

          <h2 className="text-lg font-bold text-gray-900 mb-2">Quel est votre régime fiscal ?</h2>
          <p className="text-sm text-gray-500 mb-5">
            Vous pourrez le modifier ultérieurement si vous changez d&apos;option fiscale.
          </p>

          <div className="space-y-3 mb-8">
            {selectedType.regimes.map(regime => (
              <button key={regime.id}
                onClick={() => set('regimeFiscalChoisi', regime.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  form.regimeFiscalChoisi === regime.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-200 bg-white'
                }`}>
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    form.regimeFiscalChoisi === regime.id ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                  }`}>
                    {form.regimeFiscalChoisi === regime.id && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
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
            <button onClick={() => setStep(1)} className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3.5 rounded-xl text-sm hover:bg-gray-50">
              ← Retour
            </button>
            <button
              onClick={() => {
                if (!form.regimeFiscalChoisi && selectedType.regimes.length > 0) {
                  set('regimeFiscalChoisi', selectedType.regimes[0].id)
                }
                setStep(3)
              }}
              disabled={selectedType.regimes.length > 1 && !form.regimeFiscalChoisi}
              className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:opacity-40 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors">
              Continuer →
            </button>
          </div>
        </div>
      )}

      {/* ── ÉTAPE 3 : Informations ── */}
      {step === 3 && selectedType && (
        <div>
          <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
            <span className="text-2xl">{selectedType.icon}</span>
            <div>
              <p className="font-bold text-orange-800 text-sm">{selectedType.label}</p>
              <p className="text-xs text-orange-600">
                {TYPES.find(t => t.id === form.type)?.regimes.find(r => r.id === form.regimeFiscalChoisi)?.label || ''}
              </p>
            </div>
            <button onClick={() => setStep(1)} className="ml-auto text-xs text-orange-600 hover:underline">Modifier</button>
          </div>

          <div className="space-y-4">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>}

            {/* Auto-fill pour nom propre */}
            {form.type === 'nom-propre' && (
              <div className={`border rounded-xl p-4 transition-colors ${form.autofillFromProfile ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200'}`}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.autofillFromProfile}
                    onChange={e => handleAutofill(e.target.checked)}
                    className="mt-0.5 text-orange-600 rounded flex-shrink-0"/>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Je suis la personne physique concernée</p>
                    <p className="text-xs text-gray-500 mt-0.5">Pré-remplir avec mes informations personnelles</p>
                    {profileIncomplete && (
                      <p className="text-xs text-orange-600 mt-1">
                        ⚠️ Votre profil personnel est incomplet.{' '}
                        <a href="/dashboard/mon-profil" className="underline font-semibold">Complétez-le d&apos;abord</a>
                      </p>
                    )}
                  </div>
                </label>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {selectedType.needsSiret ? 'Raison sociale *' : form.type === 'nom-propre' ? 'Nom complet *' : 'Nom du profil *'}
              </label>
              <input type="text" value={form.nom} onChange={e => set('nom', e.target.value)}
                disabled={form.autofillFromProfile}
                placeholder={selectedType.needsSiret ? 'Ex: SCI Les Oliviers' : 'Ex: Jean Dupont'}
                className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${form.autofillFromProfile ? 'bg-gray-50 text-gray-500' : ''}`}/>
            </div>

            {selectedType.needsSiret && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">SIRET *</label>
                <input type="text" value={form.siret} onChange={e => set('siret', e.target.value.replace(/\D/g, '').slice(0, 14))}
                  placeholder="12345678900012"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                <p className="text-xs text-gray-400 mt-1">14 chiffres</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {selectedType.needsSiret ? 'Adresse du siège social *' : 'Adresse de domicile *'}
              </label>
              <input type="text" value={form.adresse} onChange={e => set('adresse', e.target.value)}
                disabled={form.autofillFromProfile}
                placeholder="5 rue de la Paix"
                className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${form.autofillFromProfile ? 'bg-gray-50 text-gray-500' : ''}`}/>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Code postal *</label>
                <input type="text" value={form.codePostal} onChange={e => set('codePostal', e.target.value)} maxLength={5}
                  disabled={form.autofillFromProfile}
                  placeholder="75006"
                  className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${form.autofillFromProfile ? 'bg-gray-50 text-gray-500' : ''}`}/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Ville *</label>
                <input type="text" value={form.ville} onChange={e => set('ville', e.target.value)}
                  disabled={form.autofillFromProfile}
                  placeholder="Paris"
                  className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${form.autofillFromProfile ? 'bg-gray-50 text-gray-500' : ''}`}/>
              </div>
            </div>

            {/* Section indivisaires */}
            {selectedType.hasIndivisaires && (
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-bold text-gray-900">Indivisaires</p>
                    <p className="text-xs text-gray-500">Ajoutez les autres propriétaires et leurs quotes-parts</p>
                  </div>
                  <button onClick={addIndivisaire}
                    className="text-xs font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors">
                    + Ajouter
                  </button>
                </div>

                {form.indivisaires.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-4">Aucun indivisaire ajouté</p>
                )}

                {form.indivisaires.map((ind, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4 mb-3">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-semibold text-gray-600">Indivisaire {idx + 1}</p>
                      <button onClick={() => removeIndivisaire(idx)} className="text-xs text-red-500 hover:text-red-700">Supprimer</button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input type="text" value={ind.prenom} onChange={e => updateIndivisaire(idx, 'prenom', e.target.value)}
                        placeholder="Prénom"
                        className="border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"/>
                      <input type="text" value={ind.nom} onChange={e => updateIndivisaire(idx, 'nom', e.target.value)}
                        placeholder="Nom"
                        className="border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"/>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="email" value={ind.email} onChange={e => updateIndivisaire(idx, 'email', e.target.value)}
                        placeholder="email@example.fr"
                        className="border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"/>
                      <div className="relative">
                        <input type="number" value={ind.quotePart} onChange={e => updateIndivisaire(idx, 'quotePart', e.target.value)}
                          placeholder="50" min="0" max="100"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"/>
                        <span className="absolute right-3 top-2 text-xs text-gray-400">%</span>
                      </div>
                    </div>
                  </div>
                ))}

                {form.indivisaires.length > 0 && (
                  <div className={`flex items-center justify-between text-xs px-2 mt-2 ${
                    Math.abs(totalQuotePart - 100) > 0.01 ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    <span>Total des quotes-parts</span>
                    <span className="font-bold">{totalQuotePart.toFixed(0)}% / 100%</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={() => setStep(2)} className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3.5 rounded-xl text-sm hover:bg-gray-50">
              ← Retour
            </button>
            <button onClick={handleSubmit} disabled={loading}
              className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors">
              {loading ? 'Création...' : 'Créer le profil ✓'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
ENDOFFILE
echo "✅ profils-bailleurs/nouveau/page.tsx (v2)"

# ── Ajout lien Mon Profil dans le sidebar ─────────────────────
# Mettre à jour le layout pour inclure Mon Profil dans la nav
sed -i '' "s/{ label: 'Tableau de bord', href: '\/dashboard', icon: '🏠', section: 'Gérer' },/{ label: 'Tableau de bord', href: '\/dashboard', icon: '🏠', section: 'Gérer' },\n  { label: 'Mon profil', href: '\/dashboard\/mon-profil', icon: '🙍', section: 'Gérer' },/" app/dashboard/layout.tsx
echo "✅ Lien Mon profil ajouté dans la sidebar"

# ── Git ────────────────────────────────────────────────────────
git add .
git commit -m "feat: profil bailleur v2 - régime fiscal choix, auto-fill, indivisaires + page mon-profil"
git push

echo ""
echo "🎉 Patch appliqué !"
echo ""
echo "⚠️  N'oublie pas de mettre à jour les règles Firestore :"
echo "   Ajoute 'mpl_profils' dans les règles de sécurité Firebase"
echo ""
echo "Teste sur http://localhost:3000/dashboard/profils-bailleurs/nouveau"
