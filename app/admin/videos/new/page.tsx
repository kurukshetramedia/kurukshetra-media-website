"use client"

import { useRouter } from "next/navigation"
import { VideoForm } from "@/components/admin/video-form"

export default function NewVideoPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen bg-background">
      {/* AdminSidebar is removed as it's now in admin/layout.tsx */}
      <main className="flex-1 md:ml-0">
        <div className="p-4 md:p-8 max-w-2xl">
          <VideoForm onSave={() => router.push("/admin/videos")} />
        </div>
      </main>
    </div>
  )
}
