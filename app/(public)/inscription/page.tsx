'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/lib/firebase-client'

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
    if (!cgu) { setError('Vous devez accepter les CGU pour continuer.'); return }
    if (password.length < 8) { setError('Le mot de passe doit contenir au moins 8 caractères.'); return }
    setError('')
    setLoading(true)
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(cred.user, { displayName: `${prenom} ${nom}` })
      const token = await cred.user.getIdToken()
      await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, prenom, nom }),
      })
      router.push('/inscription/plan')
    } catch (err: any) {
      const msg: Record<string, string> = {
        'auth/email-already-in-use': 'Un compte existe déjà avec cet email.',
        'auth/weak-password': 'Mot de passe trop faible (8 caractères minimum).',
        'auth/invalid-email': 'Adresse email invalide.',
      }
      setError(msg[err.code] || 'Une erreur est survenue.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 w-full max-w-md shadow-sm">

        {/* Badge essai */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide">
            🎁 14 jours gratuits — Sans engagement
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Créer mon espace</h1>
          <p className="text-sm text-gray-500">Étape 1 sur 2 — Informations de compte</p>
        </div>

        {/* Étapes visuelles */}
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
              <input type="text" value={prenom} onChange={e => setPrenom(e.target.value)} required placeholder="Jean"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom</label>
              <input type="text" value={nom} onChange={e => setNom(e.target.value)} required placeholder="Dupont"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="jean@example.fr"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Minimum 8 caractères"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
          </div>
          <div className="flex items-start gap-2.5 pt-1">
            <input type="checkbox" id="cgu" checked={cgu} onChange={e => setCgu(e.target.checked)}
              className="mt-0.5 text-orange-600 rounded flex-shrink-0"/>
            <label htmlFor="cgu" className="text-xs text-gray-500 leading-relaxed">
              J&apos;accepte les <Link href="/cgu" className="text-orange-600 hover:underline" target="_blank">CGU</Link> et la{' '}
              <Link href="/politique-de-confidentialite" className="text-orange-600 hover:underline" target="_blank">politique de confidentialité</Link>
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
