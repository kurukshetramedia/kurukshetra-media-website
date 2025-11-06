import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  if (!profile?.is_admin) redirect("/")

  // Fetch stats
  const [articles, videos, banners, posts] = await Promise.all([
    supabase.from("articles").select("id", { count: "exact" }),
    supabase.from("videos").select("id", { count: "exact" }),
    supabase.from("banners").select("id", { count: "exact" }),
    supabase
      .from("posts")
      .select("id", { count: "exact" }), // Added posts count
  ])

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Kurukshetra Media Admin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{articles.count || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{videos.count || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Banners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{banners.count || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{posts.count || 0}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Setup Instructions</CardTitle>
          <CardDescription>First-time setup steps</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">1. Run Database Scripts</h3>
            <p className="text-sm text-muted-foreground">
              Execute scripts 001-006 in your Supabase dashboard to set up tables and initial data. Script 005 will set
              your first user as admin. Script 006 creates the posts table.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">2. Manage Admin Users</h3>
            <p className="text-sm text-muted-foreground">
              Go to{" "}
              <Link href="/admin/users" className="text-primary hover:underline">
                Users
              </Link>{" "}
              to promote other users to admin or manage access.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">3. Creating Articles</h3>
            <p className="text-sm text-muted-foreground">
              Navigate to Articles and click "New Article" to create content. You can upload featured images via URL or
              file upload.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">4. Adding Videos</h3>
            <p className="text-sm text-muted-foreground">
              Go to Videos section to add video content. Provide video URLs and thumbnail images.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">5. Managing Banners</h3>
            <p className="text-sm text-muted-foreground">
              Use the Banners section to create promotional banners for your homepage. Banners auto-display in a
              carousel at the top.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">6. Creating Social Posts</h3>
            <p className="text-sm text-muted-foreground">
              Visit{" "}
              <Link href="/admin/posts" className="text-primary hover:underline">
                Posts
              </Link>{" "}
              to create and manage social media posts.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">7. Configuring Display Settings</h3>
            <p className="text-sm text-muted-foreground">
              Visit Settings to enable/disable different homepage layouts like featured sliders, top 10 news, and
              trending sections. Add your social media handles for future integrations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
