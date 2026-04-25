'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-2.5 font-bold text-gray-900 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
                <path d="M3 12V8.5L11 2.5 19 8.5V12M3 12v8h5.5V15h5V20H19v-8"
                  stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[15px] tracking-tight">
              mon-parc-locatif<span className="text-orange-600">.fr</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-500">
            <Link href="/fonctionnalites" className="hover:text-gray-900 transition-colors font-medium">Fonctionnalités</Link>
            <Link href="/tarifs" className="hover:text-gray-900 transition-colors font-medium">Tarifs</Link>
            <Link href="/a-propos" className="hover:text-gray-900 transition-colors font-medium">À propos</Link>
            <Link href="/contact" className="hover:text-gray-900 transition-colors font-medium">Contact</Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/connexion" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">
              Se connecter
            </Link>
            <Link href="/inscription" className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              Démarrer
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-gray-200"
            aria-label="Menu"
          >
            <span className={`w-4 h-px bg-gray-700 transition-all block ${open ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`w-4 h-px bg-gray-700 transition-all block ${open ? 'opacity-0' : ''}`} />
            <span className={`w-4 h-px bg-gray-700 transition-all block ${open ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>

        {open && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3">
            {[
              { l: 'Fonctionnalités', h: '/fonctionnalites' },
              { l: 'Tarifs', h: '/tarifs' },
              { l: 'À propos', h: '/a-propos' },
              { l: 'Contact', h: '/contact' },
              { l: 'Se connecter', h: '/connexion' },
            ].map(n => (
              <Link key={n.l} href={n.h} onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium text-gray-700 border-b border-gray-50 last:border-0">
                {n.l}
              </Link>
            ))}
            <Link href="/inscription" onClick={() => setOpen(false)}
              className="block mt-3 bg-orange-600 text-white text-center text-sm font-semibold py-3 rounded-lg">
              Démarrer
            </Link>
          </div>
        )}
      </header>
      <div className="h-16" />
    </>
  )
}
