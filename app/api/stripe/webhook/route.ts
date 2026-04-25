import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getAdminDb } from '@/lib/firebase-admin'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') || ''

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const db = getAdminDb()

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any
    const uid = session.metadata?.uid
    const planId = session.metadata?.planId
    const billing = session.metadata?.billing
    const subId = session.subscription

    if (uid && subId) {
      const sub = await stripe.subscriptions.retrieve(subId)
      await db.collection('mpl_users').doc(uid).update({
        plan: planId,
        billing,
        stripeCustomerId: session.customer,
        stripeSubscriptionId: subId,
        subscriptionStatus: sub.status,
        trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000).toISOString() : null,
      })
    }
  }

  if (event.type === 'customer.subscription.updated') {
    const sub = event.data.object as any
    const uid = sub.metadata?.uid
    if (uid) {
      await db.collection('mpl_users').doc(uid).update({
        subscriptionStatus: sub.status,
        trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000).toISOString() : null,
      })
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as any
    const uid = sub.metadata?.uid
    if (uid) {
      await db.collection('mpl_users').doc(uid).update({
        subscriptionStatus: 'canceled',
      })
    }
  }

  return NextResponse.json({ received: true })
}
