"use client"

import { useRouter } from "next/navigation"
import { PostForm } from "@/components/admin/post-form"

export default function NewPostPage() {
  const router = useRouter()

  return (
    <div className="p-4 md:p-8 max-w-2xl">
      <PostForm onSave={() => router.push("/admin/posts")} />
    </div>
  )
}
