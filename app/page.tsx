import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { FeaturedSlider } from "@/components/news/featured-slider"
import { TopStories } from "@/components/news/top-stories"
import { CategorySection } from "@/components/news/category-section"
import { BannerCarousel } from "@/components/news/banner-carousel"

export default async function HomePage() {
  const supabase = await createClient()

  try {
    // Fetch banner images
    const { data: banners, error: bannersError } = await supabase
      .from("banners")
      .select("*")
      .eq("active", true)
      .order("position", { ascending: true })
      .limit(5)

    if (bannersError) {
      console.error("[v0] Banners error:", bannersError)
    }

    // Fetch featured articles
    const { data: featured, error: featuredError } = await supabase
      .from("articles")
      .select(`
        id,
        title,
        excerpt,
        featured_image_url,
        category_id,
        created_at,
        view_count,
        categories:category_id(name, color)
      `)
      .eq("status", "published")
      .eq("featured", true)
      .order("published_at", { ascending: false })
      .limit(5)

    if (featuredError) {
      console.error("[v0] Featured articles error:", featuredError)
    }

    // Fetch top stories
    const { data: topStories, error: topError } = await supabase
      .from("articles")
      .select(`
        id,
        title,
        excerpt,
        featured_image_url,
        category_id,
        created_at,
        view_count,
        categories:category_id(name, color)
      `)
      .eq("status", "published")
      .order("view_count", { ascending: false })
      .limit(10)

    if (topError) {
      console.error("[v0] Top stories error:", topError)
    }

    // Fetch all categories
    const { data: categories, error: categoriesError } = await supabase.from("categories").select("*")

    if (categoriesError) {
      console.error("[v0] Categories error:", categoriesError)
    }

    // Fetch articles by category
    const articlesByCategory: any = {}
    if (categories) {
      for (const category of categories) {
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
          .limit(8)

        if (articlesError) {
          console.error(`[v0] Articles for category ${category.slug} error:`, articlesError)
        }

        if (articles && articles.length > 0) {
          articlesByCategory[category.slug] = {
            title: category.name,
            color: category.color,
            articles: articles,
          }
        }
      }
    }

    return (
      <>
        <Header />
        <main className="min-h-screen bg-background">
          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Banner Carousel */}
            {banners && banners.length > 0 ? (
              <div className="mb-12">
                <BannerCarousel banners={banners} />
              </div>
            ) : null}

            {/* Featured Slider */}
            {featured && featured.length > 0 ? (
              <FeaturedSlider articles={featured} />
            ) : (
              <div className="text-center py-8 text-muted-foreground">No featured articles available</div>
            )}

            {/* Top Stories */}
            {topStories && topStories.length > 0 ? (
              <TopStories articles={topStories} />
            ) : (
              <div className="text-center py-8 text-muted-foreground">No articles available</div>
            )}

            {/* Category Sections */}
            {Object.entries(articlesByCategory).map(([slug, { title, color, articles }]) => (
              <CategorySection key={slug} slug={slug} title={title} color={color} articles={articles} />
            ))}
          </div>
        </main>
        <Footer />
      </>
    )
  } catch (error) {
    console.error("[v0] Homepage error:", error)
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
            <p className="text-muted-foreground">Please try again later</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }
}
