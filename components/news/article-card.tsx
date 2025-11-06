"use client"

import Image from "next/image"
import Link from "next/link"

interface ArticleCardProps {
  id: string
  title: string
  excerpt: string
  featured_image_url?: string
  category?: { name: string; color: string }
  created_at: string
  view_count: number
  size?: "small" | "large"
}

export function ArticleCard({
  id,
  title,
  excerpt,
  featured_image_url,
  category,
  created_at,
  view_count,
  size = "small",
}: ArticleCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (size === "large") {
    return (
      <Link href={`/article/${id}`}>
        <article className="group cursor-pointer h-full">
          <div className="relative h-80 overflow-hidden rounded-lg mb-4 bg-muted">
            {featured_image_url ? (
              <Image
                src={featured_image_url || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
            )}
          </div>
          {category && (
            <div
              className="inline-block px-3 py-1 rounded-full text-white text-xs font-semibold mb-3"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </div>
          )}
          <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-muted-foreground mb-3">{excerpt}</p>
          <p className="text-sm text-muted-foreground">
            {formatDate(created_at)} • {view_count} views
          </p>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/article/${id}`}>
      <article className="group cursor-pointer h-full flex flex-col">
        <div className="relative h-48 overflow-hidden rounded-lg mb-3 bg-muted">
          {featured_image_url ? (
            <Image
              src={featured_image_url || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
          )}
        </div>
        {category && (
          <div
            className="inline-block px-2 py-1 rounded-full text-white text-xs font-semibold mb-2 w-fit"
            style={{ backgroundColor: category.color }}
          >
            {category.name}
          </div>
        )}
        <h4 className="font-bold text-sm md:text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h4>
        <p className="text-xs md:text-sm text-muted-foreground mb-2 line-clamp-2">{excerpt}</p>
        <p className="text-xs text-muted-foreground">{formatDate(created_at)}</p>
      </article>
    </Link>
  )
}
