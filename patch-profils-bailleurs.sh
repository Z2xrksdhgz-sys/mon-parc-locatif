#!/bin/bash
set -e
cd ~/Documents/mon-parc-locatif

mkdir -p app/dashboard/profils-bailleurs/nouveau
mkdir -p app/api/mpl/profils

echo "📁 Dossiers créés"

# ── API : liste + création des profils ────────────────────────
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
      .orderBy('createdAt', 'desc')
      .get()

    const profils = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    return NextResponse.json({ profils })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const uid = cookieStore.get('mpl-session')?.value
    if (!uid) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const body = await req.json()
    const { type, nom, siret, adresse, codePostal, ville } = body

    if (!type || !nom || !adresse || !codePostal || !ville) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
    }

    // Régime fiscal automatique
    const regimeFiscal: Record<string, string> = {
      'nom-propre': 'revenus-fonciers',
      'indivision': 'revenus-fonciers',
      'sci': 'is',
      'sarl-famille': 'is',
      'lmnp-lmp': 'bic',
      'autre': 'is',
    }

    const db = getAdminDb()
    const ref = await db.collection('mpl_profils').add({
      ownerId: uid,
      type,
      nom,
      siret: siret || null,
      adresse,
      codePostal,
      ville,
      regimeFiscal: regimeFiscal[type] || 'revenus-fonciers',
      nbLocations: 0,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ id: ref.id, ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
ENDOFFILE
echo "✅ api/mpl/profils/route.ts"

# ── Page : liste des profils bailleurs ───────────────────────
cat > app/dashboard/profils-bailleurs/page.tsx << 'ENDOFFILE'
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Profil {
  id: string
  type: string
  nom: string
  siret?: string
  adresse: string
  codePostal: string
  ville: string
  regimeFiscal: string
  nbLocations: number
  createdAt: string
}

const TYPE_LABELS: Record<string, string> = {
  'nom-propre': 'Nom propre',
  'indivision': 'Indivision',
  'sci': 'SCI',
  'sarl-famille': 'SARL de famille',
  'lmnp-lmp': 'LMNP / LMP',
  'autre': 'Autre personne morale',
}

const REGIME_LABELS: Record<string, { label: string; color: string }> = {
  'revenus-fonciers': { label: 'Revenus fonciers', color: 'bg-blue-50 text-blue-700' },
  'bic': { label: 'BIC (LMNP/LMP)', color: 'bg-green-50 text-green-700' },
  'is': { label: 'Impôt sur les sociétés', color: 'bg-purple-50 text-purple-700' },
}

export default function ProfilsBailleursPage() {
  const [profils, setProfils] = useState<Profil[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/mpl/profils')
      .then(r => r.json())
      .then(d => { setProfils(d.profils || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <span className="text-3xl">👤</span>
            Mes profils bailleurs
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Gérez vos structures juridiques (SCI, LMNP, nom propre…)
          </p>
        </div>
        <Link href="/dashboard/profils-bailleurs/nouveau"
          className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Nouveau profil
        </Link>
      </div>

      {/* Infos pédagogiques */}
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 sm:p-5 mb-6 flex gap-3">
        <span className="text-xl flex-shrink-0">💡</span>
        <div>
          <p className="text-sm font-semibold text-orange-800 mb-1">Pourquoi créer un profil bailleur ?</p>
          <p className="text-sm text-orange-700 leading-relaxed">
            Chaque profil représente une structure juridique (vous en nom propre, une SCI, un LMNP…).
            Vos biens et locations y seront rattachés pour un suivi comptable et fiscal distinct.
          </p>
        </div>
      </div>

      {/* Liste vide */}
      {profils.length === 0 && (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-10 sm:p-16 text-center">
          <div className="text-5xl mb-4">👤</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Aucun profil bailleur</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
            Créez votre premier profil pour commencer à gérer vos biens. Vous pouvez avoir plusieurs profils (ex: vous en nom propre + une SCI).
          </p>
          <Link href="/dashboard/profils-bailleurs/nouveau"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Créer mon premier profil
          </Link>
        </div>
      )}

      {/* Liste des profils */}
      {profils.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {profils.map(profil => {
            const regime = REGIME_LABELS[profil.regimeFiscal]
            return (
              <div key={profil.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 hover:border-orange-200 hover:shadow-sm transition-all flex flex-col">

                {/* Header carte */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 text-lg">
                    {profil.type === 'sci' ? '🏛️' :
                     profil.type === 'lmnp-lmp' ? '🏨' :
                     profil.type === 'sarl-famille' ? '🏢' : '👤'}
                  </div>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                    {TYPE_LABELS[profil.type] || profil.type}
                  </span>
                </div>

                {/* Nom */}
                <h3 className="text-lg font-bold text-gray-900 mb-1">{profil.nom}</h3>

                {/* Adresse */}
                <p className="text-sm text-gray-500 mb-3">
                  {profil.adresse}, {profil.codePostal} {profil.ville}
                </p>

                {/* SIRET */}
                {profil.siret && (
                  <p className="text-xs text-gray-400 mb-3">SIRET : {profil.siret}</p>
                )}

                {/* Régime fiscal */}
                <div className="mb-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${regime?.color || 'bg-gray-100 text-gray-600'}`}>
                    {regime?.label || profil.regimeFiscal}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-auto">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{profil.nbLocations}</p>
                      <p className="text-xs text-gray-400">location{profil.nbLocations > 1 ? 's' : ''}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/dashboard/profils-bailleurs/${profil.id}`}
                        className="text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors">
                        Voir →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Carte ajouter */}
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

# ── Page : formulaire création profil ────────────────────────
cat > app/dashboard/profils-bailleurs/nouveau/page.tsx << 'ENDOFFILE'
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
ENDOFFILE
echo "✅ profils-bailleurs/nouveau/page.tsx"

# ── Mise à jour dashboard home : onboarding step 1 ───────────
cat > app/dashboard/page.tsx << 'ENDOFFILE'
'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/app/providers'

function KpiCard({ icon, label, value, sub, color = 'gray' }: {
  icon: string; label: string; value: string | number; sub?: string; color?: string
}) {
  const colors: Record<string, string> = {
    orange: 'bg-orange-50 border-orange-200',
    green: 'bg-green-50 border-green-200',
    red: 'bg-red-50 border-red-200',
    gray: 'bg-white border-gray-200',
  }
  return (
    <div className={`rounded-xl border p-4 sm:p-5 ${colors[color]}`}>
      <div className="text-xl sm:text-2xl mb-3">{icon}</div>
      <p className="text-2xl sm:text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-sm font-medium text-gray-600 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  )
}

export default function DashboardPage() {
  const { mplUser } = useAuth()
  const searchParams = useSearchParams()
  const isNewCheckout = searchParams?.get('checkout') === 'success'
  const [nbProfils, setNbProfils] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/mpl/profils')
      .then(r => r.json())
      .then(d => setNbProfils((d.profils || []).length))
      .catch(() => setNbProfils(0))
  }, [])

  const hasPlan = !!mplUser?.plan
  const hasProfil = nbProfils !== null && nbProfils > 0

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">

      {/* Bienvenue après checkout */}
      {isNewCheckout && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-5 mb-6 flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">🎉</span>
          <div>
            <p className="font-bold text-green-800">Bienvenue sur Mon Parc Locatif !</p>
            <p className="text-sm text-green-700 mt-0.5">
              Votre essai gratuit de 14 jours a démarré. Commencez par créer votre profil bailleur.
            </p>
          </div>
        </div>
      )}

      {/* Sans plan */}
      {!hasPlan && !isNewCheckout && (
        <div className="bg-orange-600 rounded-2xl p-5 sm:p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-white text-lg">Démarrez votre essai gratuit</p>
            <p className="text-orange-100 text-sm mt-0.5">14 jours gratuits · Aucun débit avant J+14 · Sans engagement</p>
          </div>
          <Link href="/inscription/plan"
            className="flex-shrink-0 w-full sm:w-auto text-center bg-white text-orange-700 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-orange-50 transition-colors">
            Choisir mon offre →
          </Link>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Bonjour {mplUser?.prenom || ''} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">Voici l&apos;état de votre parc locatif</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <KpiCard icon="🏠" label="Biens actifs" value={0} sub="Aucun bien ajouté" />
        <KpiCard icon="✅" label="Loyers perçus" value="0 €" sub="Ce mois-ci" color="green" />
        <KpiCard icon="⏳" label="En attente" value="0 €" sub="À percevoir" color="orange" />
        <KpiCard icon="📋" label="Locations actives" value={0} sub="Aucun locataire" />
      </div>

      {/* Onboarding */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-4 text-sm sm:text-base">🚀 Démarrer en 3 étapes</h2>
        <div className="space-y-3">
          {[
            {
              n: 1,
              done: hasProfil,
              label: 'Créer votre profil bailleur',
              sub: 'Nom propre, SCI, LMNP… choisissez votre structure juridique',
              href: '/dashboard/profils-bailleurs/nouveau',
            },
            {
              n: 2,
              done: false,
              label: 'Ajouter votre premier bien',
              sub: 'Renseignez l\'adresse, le type et la surface',
              href: '/dashboard/parc-locatif',
            },
            {
              n: 3,
              done: false,
              label: 'Créer votre première location',
              sub: 'Associez un locataire et paramétrez le loyer',
              href: '/dashboard/parc-locatif',
            },
          ].map(step => (
            <Link key={step.n} href={step.done ? '#' : step.href}
              className={`flex items-center gap-4 p-3 sm:p-4 rounded-xl border transition-all ${
                step.done
                  ? 'border-green-200 bg-green-50 cursor-default'
                  : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50'
              }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                step.done ? 'bg-green-500 text-white' : 'bg-orange-100 text-orange-700'
              }`}>
                {step.done ? '✓' : step.n}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${step.done ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                  {step.label}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{step.sub}</p>
              </div>
              {!step.done && (
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Actions rapides */}
      <div className="mb-6">
        <h2 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">Actions rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          <Link href="/dashboard/profils-bailleurs/nouveau"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-orange-600 hover:bg-orange-700 text-white transition-all">
            <span className="text-lg">👤</span>Créer un profil
          </Link>
          <Link href="/dashboard/parc-locatif"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 transition-all">
            <span className="text-lg">🏠</span>Ajouter un bien
          </Link>
          <Link href="/dashboard/locataires"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 transition-all">
            <span className="text-lg">👥</span>Inviter un locataire
          </Link>
          <Link href="/dashboard/comptabilite"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 transition-all">
            <span className="text-lg">💶</span>Déclarer un loyer
          </Link>
        </div>
      </div>

      {/* Événements + Activité */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <h2 className="font-bold text-gray-900 mb-3 text-sm">📅 Prochains événements</h2>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <span className="text-3xl mb-2">📭</span>
            <p className="text-sm text-gray-500">Aucun événement prévu</p>
            <p className="text-xs text-gray-400 mt-1">Révisions IRL, fins de bail, DPE…</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <h2 className="font-bold text-gray-900 mb-3 text-sm">🔔 Activité récente</h2>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <span className="text-3xl mb-2">📭</span>
            <p className="text-sm text-gray-500">Aucune activité récente</p>
            <p className="text-xs text-gray-400 mt-1">Paiements, messages, documents…</p>
          </div>
        </div>
      </div>

      {/* Upsell */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-5">
          <div className="text-2xl mb-3">🛡️</div>
          <h3 className="font-bold text-blue-900 mb-1 text-sm">Assurances locatives</h3>
          <p className="text-xs text-blue-700 mb-3 leading-relaxed">PNO, GLI, protection juridique.</p>
          <Link href="/dashboard/assurances" className="text-xs font-bold text-blue-700 hover:underline">Découvrir →</Link>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-5">
          <div className="text-2xl mb-3">📊</div>
          <h3 className="font-bold text-purple-900 mb-1 text-sm">Comptabilité & Fiscalité</h3>
          <p className="text-xs text-purple-700 mb-3 leading-relaxed">Déclarations fiscales, liasses LMNP.</p>
          <Link href="/dashboard/comptabilite" className="text-xs font-bold text-purple-700 hover:underline">Activer →</Link>
        </div>
      </div>
    </div>
  )
}
ENDOFFILE
echo "✅ dashboard/page.tsx mis à jour"

# ── Git ────────────────────────────────────────────────────────
git add .
git commit -m "feat: module Profil bailleur complet (liste + création 2 étapes)"
git push

echo ""
echo "🎉 Module Profil bailleur déployé !"
echo "Teste sur http://localhost:3000/dashboard/profils-bailleurs"
