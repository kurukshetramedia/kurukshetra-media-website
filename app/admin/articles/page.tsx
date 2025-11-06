"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Plus, Edit, Trash2, AlertCircle } from "lucide-react"

interface Article {
  id: string
  title: string
  status: string
  category_id: string
  featured: boolean
  created_at: string
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const supabase = createClient()
        const { data, error: fetchError } = await supabase
          .from("articles")
          .select("*")
          .order("created_at", { ascending: false })

        if (fetchError) throw fetchError
        if (data) setArticles(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch articles")
      } finally {
        setIsLoading(false)
      }
    }
    fetchArticles()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from("articles").delete().eq("id", id)
      if (error) throw error
      setArticles(articles.filter((a) => a.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete article")
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Articles</h1>
          <p className="text-muted-foreground">Manage your news articles</p>
        </div>
        <Link href="/admin/articles/new">
          <Button className="gap-2">
            <Plus size={20} />
            New Article
          </Button>
        </Link>
      </div>

      {error && (
        <Card className="mb-6 border-destructive bg-destructive/5">
          <CardContent className="pt-6 flex gap-3">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">Loading articles...</p>
          </CardContent>
        </Card>
      ) : articles.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No articles yet. Create your first article!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <Card key={article.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex-1">
                  <h3 className="font-semibold">{article.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Status: <span className="capitalize">{article.status}</span> • Featured:{" "}
                    {article.featured ? "Yes" : "No"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/articles/${article.id}/edit`}>
                    <Button size="sm" variant="outline">
                      <Edit size={16} />
                    </Button>
                  </Link>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(article.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
