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
