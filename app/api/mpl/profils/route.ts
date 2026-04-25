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
