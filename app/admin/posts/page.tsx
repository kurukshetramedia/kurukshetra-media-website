"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Plus, Edit, Trash2, Heart, MessageCircle } from "lucide-react"
import Image from "next/image"

interface Post {
  id: string
  title: string
  content: string
  image_url?: string
  likes_count: number
  comments_count: number
  created_at: string
  updated_at: string
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false })
      if (data) setPosts(data)
      setIsLoading(false)
    }
    fetchPosts()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return
    const supabase = createClient()
    await supabase.from("posts").delete().eq("id", id)
    setPosts(posts.filter((p) => p.id !== id))
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-muted-foreground">Manage your social media posts</p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="gap-2">
            <Plus size={20} />
            New Post
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading posts...</div>
      ) : posts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No posts yet. Create your first post!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col">
              <CardContent className="p-0 flex-1 flex flex-col">
                {post.image_url && (
                  <div className="relative w-full h-48 bg-muted">
                    <Image src={post.image_url || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                )}

                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">{post.content}</p>

                  <div className="flex gap-4 text-sm text-muted-foreground mb-4 pt-4 border-t">
                    <div className="flex items-center gap-1">
                      <Heart size={16} />
                      <span>{post.likes_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={16} />
                      <span>{post.comments_count}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Link href={`/admin/posts/${post.id}/edit`} className="flex-1">
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <Edit size={16} />
                        Edit
                      </Button>
                    </Link>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
                      <Trash2 size={16} />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
