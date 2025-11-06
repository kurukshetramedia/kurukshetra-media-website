import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { ArticleCard } from "@/components/news/article-card"
import { Badge } from "@/components/ui/badge"

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch category
  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single()

  if (categoryError || !category) {
    notFound()
  }

  // Fetch articles in this category
  const { data: articles, error: articlesError } = await supabase
    .from("articles")
    .select(`
      id,
      title,
      excerpt,
      featured_image_url,
      created_at,
      view_count,
      categories:category_id(name, color)
    `)
    .eq("status", "published")
    .eq("category_id", category.id)
    .order("published_at", { ascending: false })

  if (articlesError) {
    console.error("[v0] Category articles error:", articlesError)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl font-bold">{category.name}</h1>
              <Badge
                style={{
                  backgroundColor: category.color || "#000000",
                  color: "#ffffff",
                }}
              >
                Category
              </Badge>
            </div>
            {category.description && <p className="text-lg text-muted-foreground">{category.description}</p>}
          </div>

          {/* Articles Grid */}
          {articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} {...article} size="medium" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No articles available in this category yet.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
