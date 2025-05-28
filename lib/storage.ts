// Updated storage utility with user association
import { getCurrentUser } from "./auth"

export interface Review {
  id: string
  userId: string
  productName: string
  brand: string
  category: string
  rating: number
  title: string
  content: string
  productImage: string | null
  beforeImage: string | null
  afterImage: string | null
  effects: string[]
  customEffects: string
  skinType: string
  longevity: string
  price: number
  wouldBuyAgain: boolean
  createdAt: string
}

export const saveReview = (review: Omit<Review, "id" | "createdAt" | "userId">) => {
  const user = getCurrentUser()
  if (!user) {
    throw new Error("User must be logged in to save reviews")
  }

  const reviews = getReviews()
  const newReview: Review = {
    ...review,
    id: Date.now().toString(),
    userId: user.id,
    createdAt: new Date().toISOString(),
  }
  reviews.push(newReview)
  localStorage.setItem("skincare-reviews", JSON.stringify(reviews))
  return newReview
}

export const getReviews = (): Review[] => {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("skincare-reviews")
  return stored ? JSON.parse(stored) : []
}

export const getUserReviews = (userId: string): Review[] => {
  return getReviews().filter((review) => review.userId === userId)
}

export const deleteReview = (id: string) => {
  const reviews = getReviews().filter((review) => review.id !== id)
  localStorage.setItem("skincare-reviews", JSON.stringify(reviews))
}
