#!/bin/bash
cd ~/Documents/mon-parc-locatif

# ── Fix 1 : dashboard layout (spinner infini) ──────────────────
cat > app/dashboard/layout.tsx << 'ENDOFFILE'
'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase-client'
import { useAuth } from '@/app/providers'

const NAV = [
  { label: 'Tableau de bord', href: '/dashboard', icon: '🏠', section: 'Gérer' },
  { label: 'Mon parc locatif', href: '/dashboard/parc-locatif', icon: '🏢', section: 'Gérer' },
  { label: 'Profils bailleurs', href: '/dashboard/profils-bailleurs', icon: '👤', section: 'Gérer' },
  { label: 'Mes locataires', href: '/dashboard/locataires', icon: '👥', section: 'Gérer' },
  { label: 'Mes candidats', href: '/dashboard/candidats', icon: '📋', section: 'Gérer' },
  { label: 'Mes incidents', href: '/dashboard/incidents', icon: '⚠️', section: 'Gérer' },
  { label: 'Messagerie', href: '/dashboard/messagerie', icon: '💬', section: 'Gérer' },
  { label: 'États des lieux', href: '/dashboard/etats-des-lieux', icon: '📝', section: 'Gérer' },
  { label: 'Mes documents', href: '/dashboard/documents', icon: '📁', section: 'Gérer' },
  { label: 'Comptabilité & Finance', href: '/dashboard/comptabilite', icon: '💶', section: 'Optimiser' },
  { label: 'Communauté', href: '/dashboard/communaute', icon: '🤝', section: 'Communauté' },
]

const BOTTOM_NAV = [
  { label: 'Accueil', href: '/dashboard', icon: '🏠' },
  { label: 'Parc', href: '/dashboard/parc-locatif', icon: '🏢' },
  { label: 'Finances', href: '/dashboard/comptabilite', icon: '💶' },
  { label: 'Messages', href: '/dashboard/messagerie', icon: '💬' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, mplUser, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), 3000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!loading && !user) router.push('/connexion')
  }, [user, loading, router])

  if (loading && !timedOut) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Chargement de votre espace…</p>
        </div>
      </div>
    )
  }

  const handleLogout = async () => {
    await signOut(auth)
    await fetch('/api/auth/session', { method: 'DELETE' })
    router.push('/connexion')
  }

  const sections = [...new Set(NAV.map(n => n.section))]
  const planBadge = mplUser?.plan?.toUpperCase() || 'ESSAI'
  const initials = `${mplUser?.prenom?.[0] || user?.email?.[0] || 'U'}`.toUpperCase()
  const displayName = mplUser ? `${mplUser.prenom} ${mplUser.nom}`.trim() : (user?.email || '')

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* ── SIDEBAR DESKTOP ── */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 fixed left-0 top-0 bottom-0 z-40 overflow-y-auto">
        <div className="p-4 border-b border-gray-100">
          <Link href="/dashboard" className="flex items-center gap-2.5 font-bold text-gray-900">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg width="15" height="15" viewBox="0 0 22 22" fill="none">
                <path d="M3 12V8.5L11 2.5 19 8.5V12M3 12v8h5.5V15h5V20H19v-8" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-sm tracking-tight">mon-parc-locatif<span className="text-orange-600">.fr</span></span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-2">
          {sections.map(section => (
            <div key={section} className="mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1.5">{section}</p>
              {NAV.filter(n => n.section === section).map(item => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all mb-0.5 ${
                      active
                        ? 'bg-orange-50 text-orange-700 border-l-2 border-orange-600 pl-2.5'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}>
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-700">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{displayName}</p>
              <span className="text-xs px-1.5 py-0.5 rounded font-bold bg-orange-100 text-orange-700">{planBadge}</span>
            </div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-gray-700 transition-colors flex-shrink-0" title="Déconnexion">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M13 15l5-5-5-5M18 10H7M7 3H4a1 1 0 00-1 1v12a1 1 0 001 1h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* ── MOBILE HEADER ── */}
      <div className="md:hidden fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-100 h-14 flex items-center justify-between px-4">
        <button onClick={() => setDrawerOpen(true)} className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-gray-900">
          <div className="w-7 h-7 bg-orange-600 rounded-md flex items-center justify-center">
            <svg width="13" height="13" viewBox="0 0 22 22" fill="none">
              <path d="M3 12V8.5L11 2.5 19 8.5V12M3 12v8h5.5V15h5V20H19v-8" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-sm">Mon Parc Locatif</span>
        </Link>
        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-xs font-bold text-orange-700">{initials}</div>
      </div>

      {/* ── MOBILE DRAWER ── */}
      {drawerOpen && (
        <>
          <div className="md:hidden fixed inset-0 bg-black/40 z-50" onClick={() => setDrawerOpen(false)} />
          <div className="md:hidden fixed left-0 top-0 bottom-0 w-72 bg-white z-50 overflow-y-auto flex flex-col shadow-xl">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <span className="font-bold text-gray-900 text-sm">Menu</span>
              <button onClick={() => setDrawerOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
            <nav className="flex-1 px-3 py-2">
              {sections.map(section => (
                <div key={section} className="mb-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1.5">{section}</p>
                  {NAV.filter(n => n.section === section).map(item => {
                    const active = pathname === item.href
                    return (
                      <Link key={item.href} href={item.href} onClick={() => setDrawerOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-0.5 ${active ? 'bg-orange-50 text-orange-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <span className="text-base">{item.icon}</span>
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              ))}
            </nav>
            <div className="p-3 border-t border-gray-100">
              <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg font-medium">
                Se déconnecter
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 md:ml-64">
        <div className="pt-14 md:pt-0 pb-20 md:pb-0">
          {children}
        </div>
      </div>

      {/* ── MOBILE BOTTOM NAV ── */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 z-40 flex">
        {BOTTOM_NAV.map(item => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 ${active ? 'text-orange-600' : 'text-gray-500'}`}>
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
        <button onClick={() => setMoreOpen(!moreOpen)}
          className="flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 text-gray-500">
          <span className="text-xl">☰</span>
          <span className="text-[10px] font-medium">Plus</span>
        </button>
        {moreOpen && (
          <>
            <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setMoreOpen(false)} />
            <div className="fixed bottom-16 inset-x-0 bg-white rounded-t-2xl shadow-xl z-50 p-4 max-h-[60vh] overflow-y-auto">
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
              <div className="grid grid-cols-3 gap-3">
                {NAV.map(item => (
                  <Link key={item.href} href={item.href} onClick={() => setMoreOpen(false)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl text-center ${pathname === item.href ? 'bg-orange-50 text-orange-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-medium leading-tight">{item.label}</span>
                  </Link>
                ))}
              </div>
              <button onClick={handleLogout} className="w-full mt-4 flex items-center justify-center gap-2 py-3 text-sm text-red-600 font-medium border-t border-gray-100">
                Déconnexion
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
ENDOFFILE
echo "✅ dashboard/layout.tsx"

# ── Fix 2 : create-checkout route ─────────────────────────────
cat > app/api/stripe/create-checkout/route.ts << 'ENDOFFILE'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { stripe, PLANS, PlanId } from '@/lib/stripe'
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin'

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const uid = cookieStore.get('mpl-session')?.value
    if (!uid) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const { planId, billing } = await req.json() as { planId: PlanId; billing: 'monthly' | 'annual' }
    const plan = PLANS[planId]
    if (!plan) return NextResponse.json({ error: 'Plan invalide' }, { status: 400 })

    const priceId = billing === 'annual' ? plan.annual : plan.monthly
    const baseUrl = process.env.NEXT_PUBLIC_URL

    let customerEmail: string | undefined
    try {
      const userRecord = await getAdminAuth().getUser(uid)
      customerEmail = userRecord.email ?? undefined
    } catch {}

    try {
      const db = getAdminDb()
      await db.collection('mpl_users').doc(uid).set(
        { plan: planId, billing },
        { merge: true }
      )
    } catch {}

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        trial_period_days: 14,
        metadata: { uid, planId, billing },
      },
      customer_email: customerEmail,
      metadata: { uid, planId, billing },
      success_url: `${baseUrl}/dashboard?checkout=success&plan=${planId}`,
      cancel_url: `${baseUrl}/inscription/plan`,
      locale: 'fr',
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
ENDOFFILE
echo "✅ api/stripe/create-checkout/route.ts"

# ── Fix 3 : middleware renommé en proxy (Next.js 16) ───────────
if [ -f middleware.ts ]; then
  cp middleware.ts proxy.ts
  rm middleware.ts
  echo "✅ middleware.ts → proxy.ts"
fi

# ── Git ────────────────────────────────────────────────────────
git add .
git commit -m "fix: dashboard spinner timeout + checkout cookie + middleware→proxy"
git push

echo ""
echo "✅ Patch appliqué ! Lance : npm run dev"
