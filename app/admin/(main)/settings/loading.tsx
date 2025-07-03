export default function SettingsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mt-2 animate-pulse"></div>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
