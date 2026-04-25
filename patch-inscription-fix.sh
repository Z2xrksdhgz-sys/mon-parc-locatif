#!/bin/bash
set -e
cd ~/Documents/mon-parc-locatif

# Fix package.json script dev
node -e "
const fs = require('fs');
const p = JSON.parse(fs.readFileSync('package.json', 'utf8'));
p.scripts.dev = 'next dev';
fs.writeFileSync('package.json', JSON.stringify(p, null, 2));
console.log('✅ package.json: script dev corrigé');
"

# Fix session route (sans Firestore Admin)
mkdir -p app/api/auth/session
cat > app/api/auth/session/route.ts << 'ENDOFFILE'
import { NextResponse } from 'next/server'
import { getAdminAuth } from '@/lib/firebase-admin'

export async function POST(req: Request) {
  try {
    const { token } = await req.json()
    const decoded = await getAdminAuth().verifyIdToken(token)
    const uid = decoded.uid
    const res = NextResponse.json({ ok: true, uid })
    res.cookies.set('mpl-session', uid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
    return res
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 })
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete('mpl-session')
  return res
}
ENDOFFILE
echo "✅ api/auth/session/route.ts"

# Fix inscription page (client SDK Firestore, pas Admin)
mkdir -p "app/(public)/inscription"
cat > "app/(public)/inscription/page.tsx" << 'ENDOFFILE'
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase-client'

export default function InscriptionPage() {
  const router = useRouter()
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cgu, setCgu] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cgu) { setError('Vous devez accepter les CGU.'); return }
    if (password.length < 8) { setError('Mot de passe trop court (8 caractères min).'); return }
    setError('')
    setLoading(true)
    try {
      // 1. Créer le compte Firebase Auth
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(cred.user, { displayName: `${prenom} ${nom}` })

      // 2. Créer le doc mpl_users via client SDK (bypass Admin SDK)
      await setDoc(doc(db, 'mpl_users', cred.user.uid), {
        email,
        prenom,
        nom,
        plan: null,
        billing: null,
        subscriptionStatus: null,
        trialEnd: null,
        stripeCustomerId: null,
        stripeSubscriptionId: null,
        profileComplete: false,
        createdAt: new Date().toISOString(),
      })

      // 3. Créer la session cookie (Admin Auth uniquement, pas Firestore)
      const token = await cred.user.getIdToken()
      const res = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      if (!res.ok) throw new Error('Erreur session')

      router.push('/inscription/plan')
    } catch (err: any) {
      const msgs: Record<string, string> = {
        'auth/email-already-in-use': 'Un compte existe déjà avec cet email.',
        'auth/weak-password': 'Mot de passe trop faible (8 caractères min).',
        'auth/invalid-email': 'Adresse email invalide.',
        'auth/too-many-requests': 'Trop de tentatives. Réessayez plus tard.',
      }
      setError(msgs[err.code] || err.message || 'Une erreur est survenue.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 w-full max-w-md shadow-sm">

        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide">
            🎁 14 jours gratuits — Sans engagement
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Créer mon espace</h1>
          <p className="text-sm text-gray-500">Étape 1 sur 2 — Informations de compte</p>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 h-1.5 bg-orange-600 rounded-full" />
          <div className="flex-1 h-1.5 bg-gray-200 rounded-full" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Prénom</label>
              <input type="text" value={prenom} onChange={e => setPrenom(e.target.value)} required
                placeholder="Jean"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom</label>
              <input type="text" value={nom} onChange={e => setNom(e.target.value)} required
                placeholder="Dupont"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="jean@example.fr"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              placeholder="Minimum 8 caractères"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <input type="checkbox" id="cgu" checked={cgu} onChange={e => setCgu(e.target.checked)}
              className="mt-0.5 text-orange-600 rounded flex-shrink-0"/>
            <label htmlFor="cgu" className="text-xs text-gray-500 leading-relaxed">
              J&apos;accepte les{' '}
              <Link href="/cgu" className="text-orange-600 hover:underline" target="_blank">CGU</Link>{' '}
              et la{' '}
              <Link href="/politique-de-confidentialite" className="text-orange-600 hover:underline" target="_blank">
                politique de confidentialité
              </Link>
            </label>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm">
            {loading ? 'Création du compte...' : 'Continuer vers le choix du plan →'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Déjà un compte ?{' '}
          <Link href="/connexion" className="text-orange-600 hover:underline font-semibold">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}
ENDOFFILE
echo "✅ app/(public)/inscription/page.tsx"

# Git
git add .
git commit -m "fix: inscription client SDK + session sans Admin Firestore + script dev"
git push

echo ""
echo "✅ Patch appliqué ! Lance : npm run dev"
echo "Teste sur http://localhost:3000/inscription"
