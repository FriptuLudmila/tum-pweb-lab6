"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  onRatingChange: (rating: number) => void
  size?: "small" | "medium" | "large"
  allowHalfStars?: boolean
}

export default function StarRating({
  rating,
  onRatingChange,
  size = "medium",
  allowHalfStars = true,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const totalStars = 5

  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-5 h-5",
    large: "w-7 h-7",
  }

  const containerClasses = {
    small: "gap-1",
    medium: "gap-1.5",
    large: "gap-2",
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement | SVGSVGElement>, index: number) => {
    if (!allowHalfStars) {
      setHoverRating(index)
      return
    }

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const halfWidth = rect.width / 2

    if (x < halfWidth) {
      setHoverRating(index - 0.5)
    } else {
      setHoverRating(index)
    }
  }

  const handleClick = () => {
    onRatingChange(hoverRating)
  }

  const handleMouseLeave = () => {
    setHoverRating(0)
  }

  const renderStar = (index: number) => {
    const activeRating = hoverRating || rating
    const value = index + 1

    let fillClass = ""

    if (allowHalfStars) {
      if (value <= activeRating) {
        fillClass = "fill-amber-400 text-amber-400"
      } else if (value - 0.5 <= activeRating) {
        return (
          <div
            key={index}
            className="relative cursor-pointer"
            onMouseMove={(e) => handleMouseMove(e, value)}
            onClick={handleClick}
          >
            <Star className={`${sizeClasses[size]} text-muted-foreground`} />
            <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
              <Star className={`${sizeClasses[size]} fill-amber-400 text-amber-400`} />
            </div>
          </div>
        )
      } else {
        fillClass = "text-muted-foreground"
      }
    } else {
      fillClass = value <= activeRating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"
    }

    return (
      <Star
        key={index}
        className={`${sizeClasses[size]} cursor-pointer ${fillClass}`}
        onMouseMove={(e) => handleMouseMove(e, value)}
        onClick={handleClick}
      />
    )
  }

  return (
    <div className={`flex ${containerClasses[size]}`} onMouseLeave={handleMouseLeave}>
      {[...Array(totalStars)].map((_, index) => renderStar(index))}
      <span className="ml-2 text-sm text-muted-foreground">{hoverRating || rating || "Not rated"}</span>
    </div>
  )
}
