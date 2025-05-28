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
import { ArrowLeft, Camera, ChevronRight, ImagePlus, X } from "lucide-react"
import StarRating from "@/components/ui/star-rating"
import Image from "next/image"
import AuthGuard from "@/components/ui/auth-guard"
import { saveReview } from "@/lib/storage"

function NewReviewForm() {
  const [activeTab, setActiveTab] = useState("product")
  const [rating, setRating] = useState(0)
  const [productImage, setProductImage] = useState<string | null>(null)
  const [beforeImage, setBeforeImage] = useState<string | null>(null)
  const [afterImage, setAfterImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form data state
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    category: "",
    reviewTitle: "",
    reviewText: "",
    longevity: "",
    skinType: "",
    price: "",
    customEffect: "",
    effects: {} as Record<string, boolean>,
    wouldBuyAgain: false,
  })

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

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateEffects = (effectId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      effects: {
        ...prev.effects,
        [effectId]: checked,
      },
    }))
  }

  const handleNextTab = () => {
    if (activeTab === "product") setActiveTab("review")
    if (activeTab === "review") setActiveTab("details")
  }

  const handlePrevTab = () => {
    if (activeTab === "review") setActiveTab("product")
    if (activeTab === "details") setActiveTab("review")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Get selected effects
      const selectedEffects = skinEffects.filter((effect) => formData.effects[effect.id]).map((effect) => effect.label)

      // Basic validation
      if (!formData.productName || !formData.brand || !formData.category || rating === 0) {
        alert("Please fill in all required fields and provide a rating.")
        setIsSubmitting(false)
        return
      }

      // Create review object
      const reviewData = {
        productName: formData.productName,
        brand: formData.brand,
        category: formData.category,
        rating,
        title: formData.reviewTitle || `Review of ${formData.productName}`,
        content: formData.reviewText || "",
        productImage,
        beforeImage,
        afterImage,
        effects: selectedEffects,
        customEffects: formData.customEffect || "",
        skinType: formData.skinType || "",
        longevity: formData.longevity || "",
        price: Number.parseFloat(formData.price) || 0,
        wouldBuyAgain: formData.wouldBuyAgain,
      }

      // Save review
      await saveReview(reviewData)

      // Show success message
      alert("Review submitted successfully!")

      // Redirect to activity page
      window.location.href = "/my-activity"
    } catch (error) {
      console.error("Error saving review:", error)
      alert("Error submitting review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProductImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBeforeImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setBeforeImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAfterImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAfterImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
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
                    <Label htmlFor="product-name">Product Name *</Label>
                    <Input
                      id="product-name"
                      value={formData.productName}
                      onChange={(e) => updateFormData("productName", e.target.value)}
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand *</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => updateFormData("brand", e.target.value)}
                      placeholder="Enter brand name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}>
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
                    <div className="space-y-4">
                      <div
                        className="flex h-[200px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-muted-foreground/25 bg-muted/50 p-4 transition-colors hover:border-muted-foreground/50"
                        onClick={() => document.getElementById("product-image")?.click()}
                      >
                        {productImage ? (
                          <div className="relative h-full w-full">
                            <Image
                              src={productImage || "/placeholder.svg"}
                              alt="Product preview"
                              fill
                              className="rounded-lg object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute right-2 top-2"
                              onClick={(e) => {
                                e.stopPropagation()
                                setProductImage(null)
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <ImagePlus className="h-8 w-8 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                          </>
                        )}
                      </div>
                      <Input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        id="product-image"
                        onChange={handleImageUpload}
                      />
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
                    <Label>Rating *</Label>
                    <StarRating rating={rating} onRatingChange={setRating} size="large" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="review-title">Review Title</Label>
                    <Input
                      id="review-title"
                      value={formData.reviewTitle}
                      onChange={(e) => updateFormData("reviewTitle", e.target.value)}
                      placeholder="Summarize your experience"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="review-text">Your Review</Label>
                    <Textarea
                      id="review-text"
                      value={formData.reviewText}
                      onChange={(e) => updateFormData("reviewText", e.target.value)}
                      placeholder="Share your experience with this product..."
                      className="min-h-[150px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Before & After (Optional)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className="flex h-[150px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-muted-foreground/25 bg-muted/50 p-4 transition-colors hover:border-muted-foreground/50"
                        onClick={() => document.getElementById("before-image")?.click()}
                      >
                        {beforeImage ? (
                          <div className="relative h-full w-full">
                            <Image
                              src={beforeImage || "/placeholder.svg"}
                              alt="Before"
                              fill
                              className="rounded-lg object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute right-1 top-1"
                              onClick={(e) => {
                                e.stopPropagation()
                                setBeforeImage(null)
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Camera className="h-6 w-6 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">Before</p>
                          </>
                        )}
                        <Input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          id="before-image"
                          onChange={handleBeforeImageUpload}
                        />
                      </div>
                      <div
                        className="flex h-[150px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-muted-foreground/25 bg-muted/50 p-4 transition-colors hover:border-muted-foreground/50"
                        onClick={() => document.getElementById("after-image")?.click()}
                      >
                        {afterImage ? (
                          <div className="relative h-full w-full">
                            <Image
                              src={afterImage || "/placeholder.svg"}
                              alt="After"
                              fill
                              className="rounded-lg object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute right-1 top-1"
                              onClick={(e) => {
                                e.stopPropagation()
                                setAfterImage(null)
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Camera className="h-6 w-6 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">After</p>
                          </>
                        )}
                        <Input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          id="after-image"
                          onChange={handleAfterImageUpload}
                        />
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
                    <Select value={formData.longevity} onValueChange={(value) => updateFormData("longevity", value)}>
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
                    <Select value={formData.skinType} onValueChange={(value) => updateFormData("skinType", value)}>
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
                          <Checkbox
                            id={effect.id}
                            checked={formData.effects[effect.id] || false}
                            onCheckedChange={(checked) => updateEffects(effect.id, checked as boolean)}
                          />
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
                      <Input
                        id="custom-effect"
                        value={formData.customEffect}
                        onChange={(e) => updateFormData("customEffect", e.target.value)}
                        placeholder="Add other effects..."
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <div className="flex items-center">
                      <span className="mr-2 text-muted-foreground">$</span>
                      <Input
                        id="price"
                        value={formData.price}
                        onChange={(e) => updateFormData("price", e.target.value)}
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="repurchase"
                      checked={formData.wouldBuyAgain}
                      onCheckedChange={(checked) => updateFormData("wouldBuyAgain", checked as boolean)}
                    />
                    <Label htmlFor="repurchase">Would purchase again</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={handlePrevTab}>
                Back
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  )
}

export default function NewReviewPage() {
  return (
    <AuthGuard>
      <NewReviewForm />
    </AuthGuard>
  )
}
