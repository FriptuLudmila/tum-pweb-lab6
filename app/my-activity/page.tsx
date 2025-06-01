"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Plus, Calendar, TrendingUp, Heart, ArrowLeft } from "lucide-react"
import AuthGuard from "@/components/ui/auth-guard"
import { getCurrentUser } from "@/lib/auth"
import { getUserReviews } from "@/lib/storage"
import type { Review } from "@/lib/storage"

function MyActivityContent() {
  const [userReviews, setUserReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      const reviews = getUserReviews(user.id)
      setUserReviews(reviews)
    }
    setIsLoading(false)
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

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-6xl py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p>Loading your activity...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-6xl py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-6 sm:mb-8 flex items-start gap-3 sm:gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon" className="mt-1">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Home</span>
          </Button>
        </Link>
        <div className="flex-1 flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">My Activity</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Track your skincare journey and reviews</p>
          </div>
          <Link href="/reviews/new" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              New Review
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="mb-6 sm:mb-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-3 sm:p-4">
            <p className="text-lg sm:text-2xl font-bold">{stats.totalReviews}</p>
            <p className="text-xs sm:text-sm text-muted-foreground text-center">Reviews</p>
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
            <p className="text-xs sm:text-sm text-muted-foreground text-center">Total Spent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-3 sm:p-4">
            <p className="text-lg sm:text-2xl font-bold capitalize">{stats.favoriteCategory}</p>
            <p className="text-xs sm:text-sm text-muted-foreground text-center">Top Category</p>
          </CardContent>
        </Card>
      </div>

      {userReviews.length === 0 ? (
        <Card className="p-6 sm:p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <Star className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
            <div>
              <h3 className="text-base sm:text-lg font-semibold">No reviews yet</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Start your skincare journey by writing your first review!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Link href="/reviews/new" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Write Your First Review
                </Button>
              </Link>
              <Link href="/" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto">
                  Explore Reviews
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      ) : (
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="reviews" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Star className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline sm:hidden lg:inline">My Reviews</span>
              <span className="xs:hidden sm:inline lg:hidden">Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline sm:hidden lg:inline">Timeline</span>
              <span className="xs:hidden sm:inline lg:hidden">Timeline</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline sm:hidden lg:inline">Insights</span>
              <span className="xs:hidden sm:inline lg:hidden">Stats</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="mt-4 sm:mt-6">
            <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {userReviews.map((review) => (
                <Card key={review.id} className="overflow-hidden">
                  <div className="relative">
                    {review.productImage ? (
                      <Image
                        src={review.productImage || "/placeholder.svg"}
                        alt={review.productName}
                        width={400}
                        height={250}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    ) : (
                      <div className="aspect-[4/3] w-full bg-muted flex items-center justify-center">
                        <Star className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute right-2 top-2 sm:right-3 sm:top-3 rounded-full bg-white px-2 py-1 shadow-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-medium">{review.rating}</span>
                      </div>
                    </div>
                    <Badge className="absolute left-2 top-2 sm:left-3 sm:top-3 bg-emerald-600 capitalize text-xs">
                      {review.category}
                    </Badge>
                  </div>
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-2 sm:space-y-3">
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base truncate">{review.productName}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{review.brand}</p>
                      </div>

                      <h4 className="text-xs sm:text-sm font-medium line-clamp-1">{review.title}</h4>

                      {review.content && <p className="text-xs text-muted-foreground line-clamp-2">{review.content}</p>}

                      <div className="flex flex-wrap gap-1">
                        {review.effects.slice(0, 2).map((effect) => (
                          <Badge key={effect} variant="outline" className="bg-emerald-50 text-emerald-700 text-xs">
                            {effect}
                          </Badge>
                        ))}
                        {review.effects.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{review.effects.length - 2}
                          </Badge>
                        )}
                      </div>

                      {(review.beforeImage || review.afterImage) && (
                        <div className="flex gap-2">
                          {review.beforeImage && (
                            <div className="flex-1">
                              <p className="text-xs text-muted-foreground mb-1">Before</p>
                              <Image
                                src={review.beforeImage || "/placeholder.svg"}
                                alt="Before"
                                width={100}
                                height={80}
                                className="aspect-[5/4] w-full rounded object-cover"
                              />
                            </div>
                          )}
                          {review.afterImage && (
                            <div className="flex-1">
                              <p className="text-xs text-muted-foreground mb-1">After</p>
                              <Image
                                src={review.afterImage || "/placeholder.svg"}
                                alt="After"
                                width={100}
                                height={80}
                                className="aspect-[5/4] w-full rounded object-cover"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                        <div className="flex items-center gap-2">
                          {review.price > 0 && <span>${review.price}</span>}
                          {review.wouldBuyAgain && <Heart className="h-3 w-3 fill-red-400 text-red-400" />}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="mt-4 sm:mt-6">
            <div className="space-y-4 sm:space-y-6">
              {userReviews
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((review) => (
                  <div key={review.id} className="flex gap-3 sm:gap-4">
                    <div className="flex flex-col items-center">
                      <div className="rounded-full bg-emerald-100 p-2">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
                      </div>
                      <div className="h-full w-px bg-border"></div>
                    </div>
                    <div className="flex-1 pb-6 sm:pb-8">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                        {review.productImage ? (
                          <Image
                            src={review.productImage || "/placeholder.svg"}
                            alt={review.productName}
                            width={80}
                            height={80}
                            className="aspect-square rounded-lg object-cover w-16 h-16 sm:w-20 sm:h-20"
                          />
                        ) : (
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-lg flex items-center justify-center">
                            <Star className="h-4 w-4 sm:h-6 sm:w-6 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                            <h3 className="font-semibold text-sm sm:text-base truncate">{review.productName}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              <span className="text-xs sm:text-sm">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-2">{review.brand}</p>
                          <p className="text-xs sm:text-sm mb-2 line-clamp-2">{review.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="mt-4 sm:mt-6">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Category Breakdown</h3>
                  <div className="space-y-2 sm:space-y-3">
                    {Object.entries(
                      userReviews.reduce(
                        (acc, review) => {
                          acc[review.category] = (acc[review.category] || 0) + 1
                          return acc
                        },
                        {} as Record<string, number>,
                      ),
                    ).map(([category, count]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm capitalize">{category}</span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-12 sm:w-16 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-600 rounded-full"
                              style={{ width: `${(count / userReviews.length) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs sm:text-sm font-medium">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Most Common Effects</h3>
                  <div className="space-y-2 sm:space-y-3">
                    {Object.entries(
                      userReviews.reduce(
                        (acc, review) => {
                          review.effects.forEach((effect) => {
                            acc[effect] = (acc[effect] || 0) + 1
                          })
                          return acc
                        },
                        {} as Record<string, number>,
                      ),
                    )
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 5)
                      .map(([effect, count]) => (
                        <div key={effect} className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm">{effect}</span>
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 text-xs">
                            {count}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

export default function MyActivityPage() {
  return (
    <AuthGuard>
      <MyActivityContent />
    </AuthGuard>
  )
}
