import { NextResponse } from 'next/server'
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin'

export async function POST(req: Request) {
  try {
    const { token, prenom, nom } = await req.json()
    const decoded = await getAdminAuth().verifyIdToken(token)
    const uid = decoded.uid
    const email = decoded.email || ''

    const db = getAdminDb()
    const userRef = db.collection('mpl_users').doc(uid)
    const snap = await userRef.get()

    if (!snap.exists) {
      await userRef.set({
        email,
        prenom: prenom || '',
        nom: nom || '',
        plan: null,
        billing: null,
        subscriptionStatus: null,
        trialEnd: null,
        stripeCustomerId: null,
        stripeSubscriptionId: null,
        createdAt: new Date().toISOString(),
      })
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set('mpl-session', uid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 jours
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
