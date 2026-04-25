import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
})

export const PLANS = {
  start: {
    name: 'START', label: 'Démarrer avec 1 bien',
    monthly: process.env.STRIPE_PRICE_START_MONTHLY!,
    annual:  process.env.STRIPE_PRICE_START_ANNUAL!,
    monthlyPrice: 6.90, annualPrice: 5.86, discount: 15,
    locations: 1, color: 'gray',
    features: ['Pilotage locatif','Documents légaux','Comptabilité & Finance','Espace locataire','Stockage documents'],
    extra: 'Signature électronique : 2-3 € / unité',
  },
  expert: {
    name: 'EXPERT', label: 'Le plus populaire',
    monthly: process.env.STRIPE_PRICE_EXPERT_MONTHLY!,
    annual:  process.env.STRIPE_PRICE_EXPERT_ANNUAL!,
    monthlyPrice: 15.80, annualPrice: 12.64, discount: 20,
    locations: 10, color: 'orange',
    features: ['Tout START inclus','Jusqu\'à 10 locations','Signatures électroniques','Multi-profils bailleurs','Support téléphonique','Rapports avancés','Accès communauté'],
    extra: null,
  },
  rentier: {
    name: 'RENTIER', label: 'Grands patrimoines',
    monthly: process.env.STRIPE_PRICE_RENTIER_MONTHLY!,
    annual:  process.env.STRIPE_PRICE_RENTIER_ANNUAL!,
    monthlyPrice: 47.80, annualPrice: 33.46, discount: 30,
    locations: 50, color: 'dark',
    features: ['Tout EXPERT inclus','Jusqu\'à 50 locations','Support prioritaire','Onboarding dédié'],
    extra: null,
  },
} as const

export type PlanId = keyof typeof PLANS
