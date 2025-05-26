"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Camera, ChevronRight, ImagePlus } from "lucide-react"
import StarRating from "@/components/ui/star-rating"

export default function NewReviewPage() {
  const [activeTab, setActiveTab] = useState("product")
  const [rating, setRating] = useState(0)

  const skinEffects = [
    { id: "hydration", label: "Hydration" },
    { id: "reduced-redness", label: "Reduced Redness" },
    { id: "smoother-texture", label: "Smoother Texture" },
    { id: "brightening", label: "Brightening" },
    { id: "exfoliation", label: "Exfoliation" },
    { id: "clearer-pores", label: "Clearer Pores" },
    { id: "anti-aging", label: "Anti-Aging" },
    { id: "oil-control", label: "Oil Control" },
  ]

  const skinTypes = [
    { value: "dry", label: "Dry" },
    { value: "oily", label: "Oily" },
    { value: "combination", label: "Combination" },
    { value: "normal", label: "Normal" },
    { value: "sensitive", label: "Sensitive" },
  ]

  const longevityOptions = [
    { value: "1-week", label: "1 week" },
    { value: "2-weeks", label: "2 weeks" },
    { value: "1-month", label: "1 month" },
    { value: "3-months", label: "3 months" },
    { value: "6-plus-months", label: "6+ months" },
  ]

  const handleNextTab = () => {
    if (activeTab === "product") setActiveTab("review")
    if (activeTab === "review") setActiveTab("details")
  }

  const handlePrevTab = () => {
    if (activeTab === "review") setActiveTab("product")
    if (activeTab === "details") setActiveTab("review")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted")
  }

  return (
    <div className="container mx-auto max-w-3xl py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold md:text-3xl">Write a Review</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-3">
          <TabsTrigger value="product">Product</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="product" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input id="product-name" placeholder="Enter product name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input id="brand" placeholder="Enter brand name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cleanser">Cleanser</SelectItem>
                        <SelectItem value="toner">Toner</SelectItem>
                        <SelectItem value="serum">Serum</SelectItem>
                        <SelectItem value="moisturizer">Moisturizer</SelectItem>
                        <SelectItem value="mask">Mask</SelectItem>
                        <SelectItem value="sunscreen">Sunscreen</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Product Image</Label>
                    <div className="flex h-[200px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-muted-foreground/25 bg-muted/50 p-4 transition-colors hover:border-muted-foreground/50">
                      <ImagePlus className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                      <Input type="file" className="hidden" accept="image/*" id="product-image" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="button" onClick={handleNextTab}>
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="review" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Rating</Label>
                    <StarRating rating={rating} onRatingChange={setRating} size="large" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="review-title">Review Title</Label>
                    <Input id="review-title" placeholder="Summarize your experience" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="review-text">Your Review</Label>
                    <Textarea
                      id="review-text"
                      placeholder="Share your experience with this product..."
                      className="min-h-[150px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Before & After (Optional)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex h-[150px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-muted-foreground/25 bg-muted/50 p-4 transition-colors hover:border-muted-foreground/50">
                        <Camera className="h-6 w-6 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Before</p>
                      </div>
                      <div className="flex h-[150px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-muted-foreground/25 bg-muted/50 p-4 transition-colors hover:border-muted-foreground/50">
                        <Camera className="h-6 w-6 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">After</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={handlePrevTab}>
                Back
              </Button>
              <Button type="button" onClick={handleNextTab}>
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="longevity">Product Longevity</Label>
                    <Select>
                      <SelectTrigger id="longevity">
                        <SelectValue placeholder="How long did it last?" />
                      </SelectTrigger>
                      <SelectContent>
                        {longevityOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skin-type">Your Skin Type</Label>
                    <Select>
                      <SelectTrigger id="skin-type">
                        <SelectValue placeholder="Select your skin type" />
                      </SelectTrigger>
                      <SelectContent>
                        {skinTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Effects & Results</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {skinEffects.map((effect) => (
                        <div key={effect.id} className="flex items-center space-x-2">
                          <Checkbox id={effect.id} />
                          <Label htmlFor={effect.id} className="text-sm font-normal">
                            {effect.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2">
                      <Label htmlFor="custom-effect" className="text-sm">
                        Other Effects
                      </Label>
                      <Input id="custom-effect" placeholder="Add other effects..." className="mt-1" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <div className="flex items-center">
                      <span className="mr-2 text-muted-foreground">$</span>
                      <Input id="price" type="number" placeholder="0.00" step="0.01" min="0" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="repurchase" />
                    <Label htmlFor="repurchase">Would purchase again</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={handlePrevTab}>
                Back
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                Submit Review
              </Button>
            </div>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  )
}

