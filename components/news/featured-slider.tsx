"use client"

import { useState, useEffect } from "react"
import { ArticleCard } from "./article-card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FeaturedSliderProps {
  articles: any[]
}

export function FeaturedSlider({ articles }: FeaturedSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [articles.length])

  if (articles.length === 0) return null

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length)
  }

  return (
    <section className="relative mb-8">
      <div className="relative">
        <ArticleCard {...articles[currentIndex]} size="large" />

        {/* Navigation Buttons */}
        {articles.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur"
            >
              <ChevronLeft size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur"
            >
              <ChevronRight size={20} />
            </Button>
          </>
        )}

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {articles.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-primary w-8" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
