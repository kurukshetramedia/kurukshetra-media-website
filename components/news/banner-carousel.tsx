"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Banner {
  id: string
  title: string
  image_url: string
  link_url?: string
}

interface BannerCarouselProps {
  banners: Banner[]
}

export function BannerCarousel({ banners }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay || banners.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay, banners.length])

  if (banners.length === 0) return null

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
    setAutoPlay(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
    setAutoPlay(false)
  }

  const currentBanner = banners[currentIndex]

  return (
    <div
      className="relative w-full h-64 md:h-96 bg-muted rounded-lg overflow-hidden group"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* Banner Image */}
      <a
        href={currentBanner.link_url || "#"}
        className="block w-full h-full"
        target={currentBanner.link_url ? "_blank" : undefined}
        rel={currentBanner.link_url ? "noopener noreferrer" : undefined}
      >
        <Image
          src={currentBanner.image_url || "/placeholder.svg"}
          alt={currentBanner.title}
          fill
          className="object-cover"
          priority={currentIndex === 0}
        />
      </a>

      {/* Navigation Buttons */}
      {banners.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70"
            onClick={goToPrevious}
          >
            <ChevronLeft className="text-white" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70"
            onClick={goToNext}
          >
            <ChevronRight className="text-white" />
          </Button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-white w-8" : "bg-white/50"
                }`}
                onClick={() => {
                  setCurrentIndex(index)
                  setAutoPlay(false)
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
