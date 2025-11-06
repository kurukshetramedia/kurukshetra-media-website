"use client"

import { useRouter } from "next/navigation"
import { BannerForm } from "@/components/admin/banner-form"

export default function NewBannerPage() {
  const router = useRouter()

  return (
    <div className="p-4 md:p-8 max-w-2xl">
      <BannerForm onSave={() => router.push("/admin/banners")} />
    </div>
  )
}
