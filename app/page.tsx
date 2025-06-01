"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Star, TrendingUp, Calendar, Target, Menu, X } from "lucide-react"
import { getCurrentUser, logout } from "@/lib/auth"
import { getUserReviews } from "@/lib/storage"
import type { User } from "@/lib/auth"
import type { Review } from "@/lib/storage"

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [userReviews, setUserReviews] = useState<Review[]>([])
  const [recentReviews, setRecentReviews] = useState<Review[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)

    if (currentUser) {
      const reviews = getUserReviews(currentUser.id)
      setUserReviews(reviews)
      // Get 3 most recent reviews
      setRecentReviews(
        reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3),
      )
    }
  }, [])

  const stats = {
    totalReviews: userReviews.length,
    averageRating:
      userReviews.length > 0 ? userReviews.reduce((acc, review) => acc + review.rating, 0) / userReviews.length : 0,
    totalSpent: userReviews.reduce((acc, review) => acc + review.price, 0),
    favoriteCategory:
      userReviews.length > 0
        ? Object.entries(
            userReviews.reduce(
              (acc, review) => {
                acc[review.category] = (acc[review.category] || 0) + 1
                return acc
              },
              {} as Record<string, number>,
            ),
          ).sort(([, a], [, b]) => b - a)[0]?.[0] || "None"
        : "None",
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-full bg-emerald-100 p-1">
              <Star className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="text-lg sm:text-xl font-semibold">SkinReview</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4 lg:gap-6">
            {user && (
              <Link href="/my-activity" className="text-sm font-medium hover:underline">
                My Activity
              </Link>
            )}
            <Link href="/reviews/new" className="text-sm font-medium hover:underline">
              Write Review
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground hidden lg:inline">Welcome, {user.username}!</span>
                <Button variant="outline" size="sm" onClick={logout}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="container px-4 py-4 space-y-3">
              {user && (
                <Link
                  href="/my-activity"
                  className="block text-sm font-medium hover:text-emerald-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Activity
                </Link>
              )}
              <Link
                href="/reviews/new"
                className="block text-sm font-medium hover:text-emerald-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Write Review
              </Link>
              <div className="pt-3 border-t space-y-2">
                {user ? (
                  <>
                    <p className="text-sm text-muted-foreground">Welcome, {user.username}!</p>
                    <Button variant="outline" size="sm" onClick={logout} className="w-full">
                      Log out
                    </Button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button size="sm" className="w-full">
                        Sign up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <section className="container py-8 sm:py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                  Document your skincare journey
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Track, rate, and share your experiences with skincare products. Build your personal skincare database.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link href="/reviews/new" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700">
                    Write a Review
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                {user && (
                  <Link href="/my-activity" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      View My Reviews
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center order-first lg:order-last">
              <div className="relative h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] lg:h-[350px] lg:w-[350px] overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/13933.jpg"
                  alt="My skincare routine and favorite products"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                  <div className="rounded-lg bg-white/90 p-2 sm:p-3 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
                      <span className="text-xs sm:text-sm font-medium">Your Skincare Journey</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Beautiful Image Section */}
        <section className="container py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
            <div className="aspect-[16/9] sm:aspect-[21/9] w-full">
              <Image
                src="/images/24618.jpg"
                alt="My skincare routine and favorite products"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent sm:from-black/40 sm:via-black/20" />
            <div className="absolute inset-0 flex items-center">
              <div className="container px-4 sm:px-8">
                <div className="max-w-lg space-y-3 sm:space-y-4 text-white">
                  <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl lg:text-4xl">
                    Every product tells a story
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-white/90">
                    Document your skincare journey with detailed reviews, photos, and progress tracking.
                  </p>
                  <Link href="/reviews/new">
                    <Button size="lg" className="bg-white text-black hover:bg-white/90 w-full sm:w-auto">
                      Start Your Journey
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/40">
          <div className="container py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <div className="space-y-2">
                <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
                  Why document your skincare journey?
                </h2>
                <p className="max-w-[600px] text-muted-foreground text-sm sm:text-base md:text-lg">
                  Keep track of what works for your skin and build your personal skincare knowledge base.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-4 sm:gap-6 py-8 sm:py-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center gap-3 rounded-lg border bg-background p-4 sm:p-6 text-center shadow-sm">
                <div className="rounded-full bg-emerald-100 p-2 sm:p-3">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold">Track Progress</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Document your skin&apos;s journey and see improvements over time with before/after photos.
                </p>
              </div>
              <div className="flex flex-col items-center gap-3 rounded-lg border bg-background p-4 sm:p-6 text-center shadow-sm">
                <div className="rounded-full bg-blue-100 p-2 sm:p-3">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold">Find What Works</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Identify which products and ingredients work best for your unique skin type and concerns.
                </p>
              </div>
              <div className="flex flex-col items-center gap-3 rounded-lg border bg-background p-4 sm:p-6 text-center shadow-sm sm:col-span-2 lg:col-span-1">
                <div className="rounded-full bg-purple-100 p-2 sm:p-3">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold">Build Your Database</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Create a comprehensive record of every product you&apos;ve tried and their effects on your skin.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Dashboard Section - Only show if user is logged in and has reviews */}
        {user && userReviews.length > 0 && (
          <section className="container py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
              <div className="space-y-2">
                <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">Your Skincare Journey</h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  A quick overview of your progress and recent activity.
                </p>
              </div>
              <Link href="/my-activity">
                <Button variant="outline" className="w-full sm:w-auto">
                  View Full Activity
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 lg:grid-cols-4">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-3 sm:p-4">
                  <p className="text-lg sm:text-2xl font-bold">{stats.totalReviews}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground text-center">Products Tried</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-3 sm:p-4">
                  <div className="flex items-center gap-1">
                    <p className="text-lg sm:text-2xl font-bold">{stats.averageRating.toFixed(1)}</p>
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground text-center">Avg Rating</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-3 sm:p-4">
                  <p className="text-lg sm:text-2xl font-bold">${stats.totalSpent}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground text-center">Total Invested</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-3 sm:p-4">
                  <p className="text-lg sm:text-2xl font-bold capitalize">{stats.favoriteCategory}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground text-center">Top Category</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Reviews Preview */}
            {recentReviews.length > 0 && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Recent Reviews</h3>
                <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {recentReviews.map((review) => (
                    <Card key={review.id} className="overflow-hidden">
                      <CardContent className="p-3 sm:p-4">
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-xs sm:text-sm truncate">{review.productName}</h4>
                              <p className="text-xs text-muted-foreground truncate">{review.brand}</p>
                            </div>
                            <div className="flex items-center gap-1 ml-2">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              <span className="text-xs font-medium">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{review.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="border-t py-4 sm:py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-emerald-100 p-1">
              <Star className="h-4 w-4 text-emerald-600" />
            </div>
            <span className="text-sm font-semibold">SkinReview</span>
          </div>
          <p className="text-center text-xs sm:text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} SkinReview. Your personal skincare companion.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-xs sm:text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-xs sm:text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
