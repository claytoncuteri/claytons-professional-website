import { SectionSkeleton } from "@/components/SkeletonLoader";

export default function Loading() {
  return (
    <div className="animate-pulse py-16">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-4">
          <div className="skeleton h-12 w-48 mx-auto" />
          <div className="skeleton h-6 w-96 mx-auto" />
        </div>
        <SectionSkeleton />
      </div>
    </div>
  );
}
