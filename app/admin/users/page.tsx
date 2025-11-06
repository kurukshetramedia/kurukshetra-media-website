"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Profile {
  id: string
  email: string
  is_admin: boolean
  created_at: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, is_admin, created_at")
        .order("created_at", { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleAdminStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase.from("profiles").update({ is_admin: !currentStatus }).eq("id", userId)

      if (error) throw error
      fetchUsers()
      setShowDialog(false)
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">User Management</h1>
        <p className="text-muted-foreground">Manage admin access for users</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
          <CardDescription>Total users: {users.length}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-muted-foreground">{new Date(user.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.is_admin
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                    }`}
                  >
                    {user.is_admin ? "Admin" : "User"}
                  </span>
                  <Button
                    variant={user.is_admin ? "destructive" : "default"}
                    size="sm"
                    onClick={() => {
                      setSelectedUser(user)
                      setShowDialog(true)
                    }}
                  >
                    {user.is_admin ? "Remove Admin" : "Make Admin"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{selectedUser?.is_admin ? "Remove Admin Access" : "Grant Admin Access"}</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedUser?.is_admin
                ? `This will remove admin access from ${selectedUser.email}. They will no longer be able to access the admin dashboard.`
                : `This will grant admin access to ${selectedUser?.email}. They will be able to manage content and settings.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction
            onClick={() => selectedUser && toggleAdminStatus(selectedUser.id, selectedUser.is_admin)}
            className={selectedUser?.is_admin ? "bg-destructive" : ""}
          >
            {selectedUser?.is_admin ? "Remove Admin" : "Make Admin"}
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
