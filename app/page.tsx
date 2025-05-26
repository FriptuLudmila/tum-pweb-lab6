import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, Star, TrendingUp, Users } from "lucide-react"
import FeaturedReviews from "@/components/ui/featured-reviews"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-full bg-emerald-100 p-1">
              <Star className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="text-xl font-semibold">SkinReview</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/explore" className="text-sm font-medium hover:underline">
              Explore
            </Link>
            <Link href="/products" className="text-sm font-medium hover:underline">
              Products
            </Link>
            <Link href="/reviews/new" className="text-sm font-medium hover:underline">
              Write a Review
            </Link>
          </nav>
          <div className="ml-4 flex items-center gap-2">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 px-4 sm:px-6">
        <section className="container py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Document your skincare journey
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Track, rate, and share your experiences with skincare products. Join our community of skincare
                  enthusiasts.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/reviews/new">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                    Write a Review
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button size="lg" variant="outline">
                    Explore Reviews
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-[350px] overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 to-blue-50 p-4 shadow-lg">
                <div className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">4.5</span>
                  </div>
                </div>
                <div className="h-full w-full rounded-lg bg-white/80 p-6 backdrop-blur-sm">
                  <div className="flex h-full flex-col">
                    <div className="mb-4 h-40 rounded-lg bg-gray-100"></div>
                    <h3 className="text-lg font-semibold">Hydrating Serum</h3>
                    <p className="text-sm text-muted-foreground">Brand Name</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="h-6 w-6 rounded-full bg-gray-200"></div>
                        <span className="text-xs">@username</span>
                      </div>
                      <span className="text-xs text-muted-foreground">2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/40">
          <div className="container py-12 md:py-16 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Why document your skincare journey?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-lg">
                  Keep track of what works for your skin and share your insights with others.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 text-center shadow-sm">
                <div className="rounded-full bg-emerald-100 p-3">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold">Track Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Document your skin&apos;s journey and see improvements over time.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 text-center shadow-sm">
                <div className="rounded-full bg-blue-100 p-3">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Find What Works</h3>
                <p className="text-sm text-muted-foreground">
                  Identify which products and ingredients work best for your skin type.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6 text-center shadow-sm">
                <div className="rounded-full bg-purple-100 p-3">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold">Join Community</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with others who share similar skin concerns and goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Featured Reviews</h2>
              <p className="max-w-[600px] text-muted-foreground">Discover the latest reviews from our community.</p>
            </div>
            <Link href="/explore">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <FeaturedReviews />
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-emerald-100 p-1">
              <Star className="h-4 w-4 text-emerald-600" />
            </div>
            <span className="text-sm font-semibold">SkinReview</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} SkinReview. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
