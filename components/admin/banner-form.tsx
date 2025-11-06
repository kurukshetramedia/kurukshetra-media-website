"use client"

import type React from "react"

import { useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { Upload } from "lucide-react"

interface BannerFormProps {
  bannerId?: string
  onSave?: () => void
}

export function BannerForm({ bannerId, onSave }: BannerFormProps) {
  const [title, setTitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imagePreview, setImagePreview] = useState("")
  const [linkUrl, setLinkUrl] = useState("")
  const [bannerType, setBannerType] = useState("featured")
  const [position, setPosition] = useState("1")
  const [active, setActive] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      // For now, we'll support both direct URL input and local preview
      // If you add ImageKit integration, use their upload API here
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageUrl && !imagePreview) {
      alert("Please provide an image")
      return
    }

    const supabase = createClient()
    setIsLoading(true)

    try {
      const imageToSave = imageUrl || imagePreview

      if (bannerId) {
        await supabase
          .from("banners")
          .update({
            title,
            image_url: imageToSave,
            link_url: linkUrl || null,
            banner_type: bannerType,
            position: Number.parseInt(position),
            active,
            updated_at: new Date().toISOString(),
          })
          .eq("id", bannerId)
      } else {
        await supabase.from("banners").insert({
          title,
          image_url: imageToSave,
          link_url: linkUrl || null,
          banner_type: bannerType,
          position: Number.parseInt(position),
          active,
        })
      }

      if (onSave) onSave()
    } catch (error) {
      console.error("Error saving banner:", error)
      alert("Error saving banner")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{bannerId ? "Edit Banner" : "Create Banner"}</CardTitle>
        <CardDescription>Create promotional banners for your homepage</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Banner title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Banner Image *</Label>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  ref={fileInputRef}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full gap-2 bg-transparent"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  <Upload size={16} />
                  {isUploading ? "Uploading..." : "Upload Image"}
                </Button>
              </div>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="relative w-full h-40 bg-muted rounded overflow-hidden">
                <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
              </div>
            )}

            {/* Or use direct URL */}
            <div className="text-sm text-muted-foreground">Or paste image URL:</div>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/banner.jpg"
              type="url"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkUrl">Link URL (Optional)</Label>
            <Input
              id="linkUrl"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              type="url"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bannerType">Banner Type</Label>
              <Select value={bannerType} onValueChange={setBannerType}>
                <SelectTrigger id="bannerType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="top-stories">Top Stories</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position (1-10)</Label>
              <Input
                id="position"
                type="number"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                min={1}
                max={10}
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Active Banner</span>
            </label>
          </div>

          <Button type="submit" disabled={isLoading || isUploading} className="w-full">
            {isLoading ? "Saving..." : "Save Banner"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
