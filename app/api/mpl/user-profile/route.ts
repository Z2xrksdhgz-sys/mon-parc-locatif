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
