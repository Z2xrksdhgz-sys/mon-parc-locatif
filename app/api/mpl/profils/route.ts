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
