"use client"

import { ArticleCard } from "./article-card"

interface TopStoriesProps {
  articles: any[]
}

export function TopStories({ articles }: TopStoriesProps) {
  if (articles.length === 0) return null

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Top 10 Stories</h2>
        <p className="text-muted-foreground">Most read and trending stories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {articles.slice(0, 10).map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </section>
  )
}
