"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PostForm } from "@/components/admin/post-form"
import { Button } from "@/components/ui/button"

export default function EditPostPage({
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
      <PostForm postId={id} onSave={() => router.push("/admin/posts")} />
    </div>
  )
}
