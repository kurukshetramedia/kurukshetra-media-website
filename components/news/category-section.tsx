"use client"

import { ArticleCard } from "./article-card"

interface CategorySectionProps {
  title: string
  slug: string
  articles: any[]
  color: string
}

export function CategorySection({ title, slug, articles, color }: CategorySectionProps) {
  if (articles.length === 0) return null

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <div className="w-1 h-8 rounded" style={{ backgroundColor: color }} />
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {articles.slice(0, 8).map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </section>
  )
}
