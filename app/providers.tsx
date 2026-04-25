'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase-client'

export interface MplUser {
  uid: string
  email: string
  prenom: string
  nom: string
  plan: 'start' | 'expert' | 'rentier' | null
  billing: 'monthly' | 'annual' | null
  subscriptionStatus: 'trialing' | 'active' | 'past_due' | 'canceled' | null
  trialEnd: { seconds: number } | null
  stripeCustomerId: string | null
}

interface Ctx {
  user: User | null
  mplUser: MplUser | null
  loading: boolean
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<Ctx>({ user: null, mplUser: null, loading: true, refreshUser: async () => {} })

export function Providers({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [mplUser, setMplUser] = useState<MplUser | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchMplUser = async (uid: string) => {
    try {
      const snap = await getDoc(doc(db, 'mpl_users', uid))
      if (snap.exists()) setMplUser({ uid, ...snap.data() } as MplUser)
    } catch {}
  }

  const refreshUser = async () => { if (user) await fetchMplUser(user.uid) }

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u) await fetchMplUser(u.uid)
      else setMplUser(null)
      setLoading(false)
    })
  }, [])

  return <AuthContext.Provider value={{ user, mplUser, loading, refreshUser }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
