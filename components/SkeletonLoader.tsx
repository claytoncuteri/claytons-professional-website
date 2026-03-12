export function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <SkeletonBlock className="h-12 w-3/4" />
            <SkeletonBlock className="h-6 w-full" />
            <SkeletonBlock className="h-6 w-2/3" />
            <div className="flex gap-4 pt-4">
              <SkeletonBlock className="h-12 w-40" />
              <SkeletonBlock className="h-12 w-40" />
            </div>
          </div>
          <SkeletonBlock className="w-48 h-48 sm:w-64 sm:h-64 rounded-full" />
        </div>
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center space-y-2">
              <SkeletonBlock className="h-10 w-20 mx-auto" />
              <SkeletonBlock className="h-4 w-24 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SectionSkeleton() {
  return (
    <div className="py-24 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <SkeletonBlock className="h-10 w-64 mx-auto" />
        <SkeletonBlock className="h-1 w-16 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-6 space-y-4">
              <SkeletonBlock className="h-12 w-12 rounded-xl" />
              <SkeletonBlock className="h-6 w-3/4" />
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
