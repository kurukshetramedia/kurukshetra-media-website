"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"
import Image from "next/image"

interface Banner {
  id: string
  title: string
  image_url: string
  banner_type: string
  active: boolean
  position: number
  created_at: string
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBanners = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("banners").select("*").order("position")
      if (data) setBanners(data)
      setIsLoading(false)
    }
    fetchBanners()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this banner?")) return
    const supabase = createClient()
    await supabase.from("banners").delete().eq("id", id)
    setBanners(banners.filter((b) => b.id !== id))
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Banners</h1>
          <p className="text-muted-foreground">Manage promotional banners</p>
        </div>
        <Link href="/admin/banners/new">
          <Button className="gap-2">
            <Plus size={20} />
            New Banner
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading banners...</div>
      ) : banners.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No banners yet. Create your first banner!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {banners.map((banner) => (
            <Card key={banner.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row gap-4 p-4">
                  <div className="relative w-full md:w-48 h-32 bg-muted rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={banner.image_url || "/placeholder.svg"}
                      alt={banner.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{banner.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Type: <span className="font-medium">{banner.banner_type}</span> • Position:{" "}
                        <span className="font-medium">{banner.position}</span> • Status:{" "}
                        <span className={`font-medium ${banner.active ? "text-green-600" : "text-red-600"}`}>
                          {banner.active ? "Active" : "Inactive"}
                        </span>
                      </p>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Link href={`/admin/banners/${banner.id}/edit`}>
                        <Button size="sm" variant="outline">
                          <Edit size={16} />
                          Edit
                        </Button>
                      </Link>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(banner.id)}>
                        <Trash2 size={16} />
                        Delete
                      </Button>
                    </div>
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
