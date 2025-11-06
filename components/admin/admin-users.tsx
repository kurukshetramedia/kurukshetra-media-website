"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserCheck, UserX } from "lucide-react"

interface AdminUser {
  id: string
  email: string
  full_name?: string
  is_admin: boolean
}

export function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("profiles").select("*")
      if (data) setUsers(data)
      setIsLoading(false)
    }
    fetchUsers()
  }, [])

  const toggleAdmin = async (userId: string, currentStatus: boolean) => {
    const supabase = createClient()
    await supabase
      .from("profiles")
      .update({
        is_admin: !currentStatus,
      })
      .eq("id", userId)

    setUsers(users.map((u) => (u.id === userId ? { ...u, is_admin: !currentStatus } : u)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Users</CardTitle>
        <CardDescription>Manage administrator access</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">Loading users...</div>
        ) : users.length === 0 ? (
          <p className="text-sm text-muted-foreground">No users found</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-semibold">{user.full_name || user.email}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <Button
                  size="sm"
                  variant={user.is_admin ? "destructive" : "outline"}
                  onClick={() => toggleAdmin(user.id, user.is_admin)}
                  className="gap-2"
                >
                  {user.is_admin ? (
                    <>
                      <UserX size={16} />
                      Remove Admin
                    </>
                  ) : (
                    <>
                      <UserCheck size={16} />
                      Make Admin
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
