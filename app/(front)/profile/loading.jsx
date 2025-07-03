export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div>
                <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-48"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
