import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { stripe, PLANS, PlanId } from '@/lib/stripe'
import { getAdminDb } from '@/lib/firebase-admin'

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const uid = cookieStore.get('mpl-session')?.value
    if (!uid) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const { planId, billing } = await req.json() as { planId: PlanId; billing: 'monthly' | 'annual' }
    const plan = PLANS[planId]
    if (!plan) return NextResponse.json({ error: 'Plan invalide' }, { status: 400 })

    const db = getAdminDb()
    const userSnap = await db.collection('mpl_users').doc(uid).get()
    const userData = userSnap.data()

    const priceId = billing === 'annual' ? plan.annual : plan.monthly
    const baseUrl = process.env.NEXT_PUBLIC_URL

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        trial_period_days: 14,
        metadata: { uid, planId, billing },
      },
      customer_email: userData?.email,
      metadata: { uid, planId, billing },
      success_url: `${baseUrl}/dashboard?checkout=success&plan=${planId}`,
      cancel_url: `${baseUrl}/inscription/plan`,
      locale: 'fr',
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
