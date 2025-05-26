import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function FeaturedReviews() {
  const reviews = [
    {
      id: 1,
      productName: "Hydrating Serum",
      brand: "Hydra Beauty",
      rating: 4.5,
      image: "/placeholder.svg?height=300&width=300",
      username: "skincare_lover",
      timeAgo: "2 days ago",
      effects: ["Hydration", "Reduced Redness"],
      longevity: "3 months",
      skinType: "Dry",
    },
    {
      id: 2,
      productName: "Vitamin C Brightening Cream",
      brand: "Glow Labs",
      rating: 5,
      image: "/placeholder.svg?height=300&width=300",
      username: "glow_getter",
      timeAgo: "1 week ago",
      effects: ["Brightening", "Smoother Texture"],
      longevity: "2 months",
      skinType: "Combination",
    },
    {
      id: 3,
      productName: "Gentle Exfoliating Toner",
      brand: "Pure Skin",
      rating: 4,
      image: "/placeholder.svg?height=300&width=300",
      username: "clear_skin_journey",
      timeAgo: "3 days ago",
      effects: ["Exfoliation", "Clearer Pores"],
      longevity: "6+ months",
      skinType: "Oily",
    },
  ]

  return (
    <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review) => (
        <Link href={`/reviews/${review.id}`} key={review.id}>
          <Card className="h-full overflow-hidden transition-all hover:shadow-md">
            <div className="relative">
              <Image
                src={review.image || "/placeholder.svg"}
                alt={review.productName}
                width={400}
                height={300}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute right-3 top-3 rounded-full bg-white px-2 py-1 shadow-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium">{review.rating}</span>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div>
                  <h3 className="font-semibold">{review.productName}</h3>
                  <p className="text-sm text-muted-foreground">{review.brand}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {review.effects.map((effect) => (
                    <Badge key={effect} variant="outline" className="bg-emerald-50 text-emerald-700">
                      {effect}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="h-5 w-5 rounded-full bg-gray-200"></div>
                    <span>@{review.username}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{review.skinType}</span>
                    <span>•</span>
                    <span>{review.timeAgo}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
