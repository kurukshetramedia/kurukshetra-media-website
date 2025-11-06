import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { ArrowLeft } from "lucide-react"

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch article
  const { data: article } = await supabase
    .from("articles")
    .select(`
      id,
      title,
      content,
      featured_image_url,
      category_id,
      author_id,
      published_at,
      view_count,
      categories:category_id(name, color),
      profiles:author_id(full_name)
    `)
    .eq("id", id)
    .eq("status", "published")
    .single()

  if (!article) notFound()

  // Increment view count
  await supabase
    .from("articles")
    .update({
      view_count: (article.view_count || 0) + 1,
    })
    .eq("id", id)

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Featured Image */}
          {article.featured_image_url && (
            <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8 bg-muted">
              <Image
                src={article.featured_image_url || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Category */}
          {article.categories && (
            <div
              className="inline-block px-4 py-2 rounded-full text-white font-semibold mb-4"
              style={{ backgroundColor: article.categories.color }}
            >
              {article.categories.name}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{article.title}</h1>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-muted-foreground mb-8 pb-8 border-b border-border text-sm md:text-base">
            <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
            {article.profiles && <span>By {article.profiles.full_name}</span>}
            <span>{article.view_count} views</span>
          </div>

          {/* Content */}
          <div className="prose dark:prose-invert max-w-none mb-12">
            <div className="text-lg leading-relaxed whitespace-pre-wrap text-foreground">{article.content}</div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
