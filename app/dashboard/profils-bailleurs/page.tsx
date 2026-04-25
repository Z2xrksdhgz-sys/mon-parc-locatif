export default function Page() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
          <span className="text-3xl">👤</span>
          Mes profils bailleurs
        </h1>
        <p className="text-sm text-gray-500 mt-1">SCI, LMNP, nom propre — gérez vos structures</p>
      </div>
      <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-10 sm:p-16 text-center">
        <div className="text-5xl mb-4">🚧</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">En cours de développement</h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Ce module sera disponible très prochainement. Toutes les fonctionnalités décrites sont planifiées.
        </p>
      </div>
    </div>
  )
}
