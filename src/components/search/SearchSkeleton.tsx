export function SearchSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="hidden lg:block w-64 shrink-0">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-card space-y-4">
          <div className="h-5 bg-gray-200 rounded w-20 animate-pulse" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="h-10 bg-gray-100 rounded-full mb-6 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="aspect-square bg-gray-200 animate-pulse" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-100 rounded animate-pulse" />
                <div className="h-5 bg-gray-200 rounded w-24 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
