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
