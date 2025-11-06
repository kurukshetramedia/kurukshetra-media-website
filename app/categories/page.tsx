import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function CategoriesPage() {
  const supabase = await createClient()

  const { data: categories = [], error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true })

  if (error) {
    console.error("[v0] Categories fetch error:", error)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">News Categories</h1>
            <p className="text-lg text-muted-foreground">
              Browse all news categories to find content that interests you.
            </p>
          </div>

          {/* Categories Grid */}
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link key={category.id} href={`/category/${category.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl">{category.name}</CardTitle>
                        <Badge
                          style={{
                            backgroundColor: category.color || "#000000",
                            color: "#ffffff",
                          }}
                        >
                          News
                        </Badge>
                      </div>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Click to view all {category.name} articles</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No categories available yet.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
