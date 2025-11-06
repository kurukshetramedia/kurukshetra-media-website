"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArticleForm } from "@/components/admin/article-form"
import { Button } from "@/components/ui/button"

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [id, setId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    params.then(({ id }) => {
      setId(id)
      setIsLoading(false)
    })
  }, [params])

  if (isLoading) return <div className="flex h-screen items-center justify-center">Loading...</div>

  return (
    <div className="p-4 md:p-8 max-w-2xl">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        ← Back
      </Button>
      <ArticleForm articleId={id} onSave={() => router.push("/admin/articles")} />
    </div>
  )
}
