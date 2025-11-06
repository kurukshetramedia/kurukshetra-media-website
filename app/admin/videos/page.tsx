"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"

interface Video {
  id: string
  title: string
  status: string
  featured: boolean
  created_at: string
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchVideos = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("videos").select("*").order("created_at", { ascending: false })
      if (data) setVideos(data)
      setIsLoading(false)
    }
    fetchVideos()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this video?")) return
    const supabase = createClient()
    await supabase.from("videos").delete().eq("id", id)
    setVideos(videos.filter((v) => v.id !== id))
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 md:ml-0">
        <div className="p-4 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Videos</h1>
              <p className="text-muted-foreground">Manage video content</p>
            </div>
            <Link href="/admin/videos/new">
              <Button className="gap-2">
                <Plus size={20} />
                New Video
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading videos...</div>
          ) : videos.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No videos yet. Create your first video!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {videos.map((video) => (
                <Card key={video.id}>
                  <CardContent className="flex items-center justify-between py-4">
                    <div className="flex-1">
                      <h3 className="font-semibold">{video.title}</h3>
                      <p className="text-sm text-muted-foreground">Status: {video.status}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/videos/${video.id}/edit`}>
                        <Button size="sm" variant="outline">
                          <Edit size={16} />
                        </Button>
                      </Link>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(video.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
