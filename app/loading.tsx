import { HeroSkeleton, SectionSkeleton } from "@/components/SkeletonLoader";

export default function Loading() {
  return (
    <div className="animate-pulse">
      <HeroSkeleton />
      <SectionSkeleton />
      <SectionSkeleton />
    </div>
  );
}
