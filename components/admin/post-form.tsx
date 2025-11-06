"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { Upload } from "lucide-react"

interface PostFormProps {
  postId?: string
  onSave?: () => void
}

export function PostForm({ postId, onSave }: PostFormProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imagePreview, setImagePreview] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isLoadingPost, setIsLoadingPost] = useState(!!postId)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!postId) return

    const fetchPost = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.from("posts").select("*").eq("id", postId).single()

        if (error) throw error
        if (data) {
          setTitle(data.title)
          setContent(data.content)
          if (data.image_url) {
            setImageUrl(data.image_url)
            setImagePreview(data.image_url)
          }
        }
      } catch (error) {
        console.error("Error loading post:", error)
        alert("Failed to load post")
      } finally {
        setIsLoadingPost(false)
      }
    }

    fetchPost()
  }, [postId])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
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
    if (!title || !content) {
      alert("Title and content are required")
      return
    }

    const supabase = createClient()
    setIsLoading(true)

    try {
      const imageToSave = imageUrl || imagePreview

      if (postId) {
        await supabase
          .from("posts")
          .update({
            title,
            content,
            image_url: imageToSave || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", postId)
      } else {
        await supabase.from("posts").insert({
          title,
          content,
          image_url: imageToSave || null,
          likes_count: 0,
          comments_count: 0,
        })
      }

      if (onSave) onSave()
    } catch (error) {
      console.error("Error saving post:", error)
      alert("Error saving post")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingPost) {
    return (
      <Card>
        <CardContent className="text-center py-8">Loading post...</CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{postId ? "Edit Post" : "Create Post"}</CardTitle>
        <CardDescription>Create and manage social media posts</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Post Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Post Content *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter post content"
              rows={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Post Image</Label>
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

            {imagePreview && (
              <div className="relative w-full h-40 bg-muted rounded overflow-hidden">
                <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
              </div>
            )}

            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Or paste image URL"
              type="url"
            />
          </div>

          <Button type="submit" disabled={isLoading || isUploading} className="w-full">
            {isLoading ? "Saving..." : "Save Post"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
