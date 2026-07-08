import Container from "@/components/shared/Container"
import { Skeleton } from "@/components/ui/skeleton"

export default function PropertyDetailLoading() {
  return (
    <main className="bg-bg-soft min-h-screen py-8 font-body">
      <Container>
        {/* Breadcrumb skeleton */}
        <div className="flex gap-2 mb-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Gallery grid skeleton */}
        <div className="hidden md:grid grid-cols-4 gap-2 h-[500px] w-full rounded-2xl overflow-hidden mb-8">
          <Skeleton className="col-span-2 row-span-2 h-full w-full" />
          <Skeleton className="h-full w-full" />
          <Skeleton className="h-full w-full" />
          <Skeleton className="h-full w-full" />
          <Skeleton className="h-full w-full" />
        </div>
        <div className="md:hidden space-y-2 mb-6">
          <Skeleton className="aspect-[4/3] w-full rounded-xl" />
          <div className="flex gap-2">
            <Skeleton className="h-14 w-20 rounded-lg" />
            <Skeleton className="h-14 w-20 rounded-lg" />
            <Skeleton className="h-14 w-20 rounded-lg" />
          </div>
        </div>

        {/* Header Title + Price row skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-9 w-3/4 rounded-lg" />
            <Skeleton className="h-5 w-1/2 rounded-lg" />
            <Skeleton className="h-4 w-36 rounded-lg" />
          </div>

          <div className="space-y-3">
            <Skeleton className="h-24 w-full rounded-2xl" />
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1 rounded-lg" />
              <Skeleton className="h-10 flex-1 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Key Features skeleton */}
        <div className="bg-white rounded-2xl border border-border-light p-6 grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg flex-shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Content columns skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          <div className="space-y-8">
            {/* Description section skeleton */}
            <div className="bg-white rounded-2xl border border-border-light p-6 space-y-4">
              <Skeleton className="h-7 w-32 rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-5/6 rounded-lg" />
              <Skeleton className="h-4 w-4/5 rounded-lg" />
            </div>

            {/* Details table skeleton */}
            <div className="bg-white rounded-2xl border border-border-light p-6 space-y-6">
              <Skeleton className="h-7 w-40 rounded-lg" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="flex justify-between border-b border-border-light/60 pb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky sidebar skeleton */}
          <div>
            <div className="bg-white rounded-2xl border border-border-light p-6 space-y-6">
              <Skeleton className="h-6 w-32 rounded-lg" />
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-7 w-48" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-7 w-48" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
