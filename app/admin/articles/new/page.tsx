"use client"

import { useRouter } from "next/navigation"
import { ArticleForm } from "@/components/admin/article-form"

export default function NewArticlePage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen bg-background">
      <div className="p-4 md:p-8 max-w-2xl">
        <ArticleForm onSave={() => router.push("/admin/articles")} />
      </div>
    </div>
  )
}
