"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

interface DisplaySettings {
  featured_slider_enabled: boolean
  top_10_news_enabled: boolean
  trending_news_enabled: boolean
  category_display_layout: string[]
  items_per_page: number
}

interface SocialCredentials {
  facebook_page_id?: string
  twitter_handle?: string
  instagram_handle?: string
  youtube_channel_id?: string
}

export default function SettingsPage() {
  const [displaySettings, setDisplaySettings] = useState<DisplaySettings>({
    featured_slider_enabled: true,
    top_10_news_enabled: true,
    trending_news_enabled: true,
    category_display_layout: ["grid"],
    items_per_page: 12,
  })

  const [socialCredentials, setSocialCredentials] = useState<SocialCredentials>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      const supabase = createClient()

      const { data: settings } = await supabase.from("display_settings").select("*")

      if (settings) {
        const settingsMap: any = {}
        settings.forEach((s: any) => {
          settingsMap[s.setting_key] = s.setting_value
        })

        setDisplaySettings({
          featured_slider_enabled: settingsMap.featured_slider_enabled ?? true,
          top_10_news_enabled: settingsMap.top_10_news_enabled ?? true,
          trending_news_enabled: settingsMap.trending_news_enabled ?? true,
          category_display_layout: settingsMap.category_display_layout ?? ["grid"],
          items_per_page: settingsMap.items_per_page ?? 12,
        })

        setSocialCredentials(settingsMap.social_credentials ?? {})
      }
    }

    fetchSettings()
  }, [])

  const handleSaveSettings = async () => {
    const supabase = createClient()
    setIsLoading(true)

    try {
      const updates = [
        { setting_key: "featured_slider_enabled", setting_value: displaySettings.featured_slider_enabled },
        { setting_key: "top_10_news_enabled", setting_value: displaySettings.top_10_news_enabled },
        { setting_key: "trending_news_enabled", setting_value: displaySettings.trending_news_enabled },
        { setting_key: "category_display_layout", setting_value: displaySettings.category_display_layout },
        { setting_key: "items_per_page", setting_value: displaySettings.items_per_page },
        { setting_key: "social_credentials", setting_value: socialCredentials },
      ]

      for (const update of updates) {
        await supabase.from("display_settings").upsert(update, { onConflict: "setting_key" })
      }

      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    } catch (error) {
      console.error("Error saving settings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure homepage display options and social media integration</p>
      </div>

      {isSaved && (
        <div className="mb-4 p-4 bg-green-500/10 text-green-700 rounded-lg">Settings saved successfully!</div>
      )}

      {/* Display Settings */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Homepage Display</CardTitle>
          <CardDescription>Enable or disable different sections on the homepage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={displaySettings.featured_slider_enabled}
              onCheckedChange={(checked) =>
                setDisplaySettings({ ...displaySettings, featured_slider_enabled: !!checked })
              }
            />
            <Label htmlFor="featured" className="cursor-pointer">
              Featured Slider
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="top10"
              checked={displaySettings.top_10_news_enabled}
              onCheckedChange={(checked) => setDisplaySettings({ ...displaySettings, top_10_news_enabled: !!checked })}
            />
            <Label htmlFor="top10" className="cursor-pointer">
              Top 10 Stories
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="trending"
              checked={displaySettings.trending_news_enabled}
              onCheckedChange={(checked) =>
                setDisplaySettings({ ...displaySettings, trending_news_enabled: !!checked })
              }
            />
            <Label htmlFor="trending" className="cursor-pointer">
              Trending News
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="items">Items Per Page</Label>
            <Input
              id="items"
              type="number"
              value={displaySettings.items_per_page}
              onChange={(e) =>
                setDisplaySettings({ ...displaySettings, items_per_page: Number.parseInt(e.target.value) })
              }
              min={6}
              max={48}
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Media Integration */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Social Media Integration</CardTitle>
          <CardDescription>Add your social media handles to sync posts and content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-start gap-3">
              <Facebook className="w-5 h-5 text-blue-600 mt-1" />
              <div className="flex-1">
                <Label className="font-semibold flex items-center gap-2">Facebook Page ID</Label>
                <Input
                  placeholder="123456789"
                  value={socialCredentials.facebook_page_id || ""}
                  onChange={(e) => setSocialCredentials({ ...socialCredentials, facebook_page_id: e.target.value })}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">Enter your Facebook Page ID to fetch posts</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-start gap-3">
              <Twitter className="w-5 h-5 text-blue-400 mt-1" />
              <div className="flex-1">
                <Label className="font-semibold">Twitter Handle</Label>
                <Input
                  placeholder="@yourhandle"
                  value={socialCredentials.twitter_handle || ""}
                  onChange={(e) => setSocialCredentials({ ...socialCredentials, twitter_handle: e.target.value })}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">Enter your Twitter handle to display your tweets</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-start gap-3">
              <Instagram className="w-5 h-5 text-pink-600 mt-1" />
              <div className="flex-1">
                <Label className="font-semibold">Instagram Handle</Label>
                <Input
                  placeholder="@yourhandle"
                  value={socialCredentials.instagram_handle || ""}
                  onChange={(e) => setSocialCredentials({ ...socialCredentials, instagram_handle: e.target.value })}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">Enter your Instagram handle to display your posts</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-start gap-3">
              <Youtube className="w-5 h-5 text-red-600 mt-1" />
              <div className="flex-1">
                <Label className="font-semibold">YouTube Channel ID</Label>
                <Input
                  placeholder="UCxxxxxxxxxxxxxx"
                  value={socialCredentials.youtube_channel_id || ""}
                  onChange={(e) => setSocialCredentials({ ...socialCredentials, youtube_channel_id: e.target.value })}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter your YouTube Channel ID to display your videos
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use Social Media Integration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Facebook</h4>
            <p className="text-sm text-muted-foreground">
              1. Go to facebook.com and find your Page ID in the URL
              <br />
              2. Paste it here to fetch your page's recent posts
              <br />
              3. Posts will appear in a dedicated social feed section
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Twitter/X</h4>
            <p className="text-sm text-muted-foreground">
              1. Enter your Twitter handle (without @)
              <br />
              2. Recent tweets will be fetched and displayed
              <br />
              3. Update frequency: Every hour
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Instagram</h4>
            <p className="text-sm text-muted-foreground">
              1. Enter your Instagram username
              <br />
              2. Recent posts with hashtags will appear
              <br />
              3. Images and captions are synced automatically
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">YouTube</h4>
            <p className="text-sm text-muted-foreground">
              1. Find your Channel ID in YouTube settings
              <br />
              2. Recent uploads will be displayed
              <br />
              3. Videos appear with thumbnails and descriptions
            </p>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSaveSettings} className="mt-8 w-full md:w-auto" disabled={isLoading} size="lg">
        {isLoading ? "Saving..." : "Save Settings"}
      </Button>
    </div>
  )
}
