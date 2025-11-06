"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user)
    })

    return () => subscription?.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <h1 className="text-2xl md:text-3xl font-bold text-primary hover:text-primary/80 transition">
            Kurukshetra Media
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {user && (
            <Link
              href="/admin"
              className="px-4 py-2 text-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors flex items-center gap-2"
            >
              <LayoutDashboard size={16} />
              <span className="hidden lg:inline">Admin</span>
            </Link>
          )}
          {user ? (
            <Button variant="ghost" size="sm" onClick={handleLogout} className="ml-2">
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          ) : (
            <Link href="/auth/login" className="ml-2">
              <Button size="sm">Login</Button>
            </Link>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <nav className="flex flex-col gap-2 mt-8">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className="px-4 py-3 text-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors block"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
              {user && (
                <SheetClose asChild>
                  <Link
                    href="/admin"
                    className="px-4 py-3 text-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors flex items-center gap-2"
                  >
                    <LayoutDashboard size={16} />
                    Admin Dashboard
                  </Link>
                </SheetClose>
              )}
              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                {user ? (
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={handleLogout}>
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                ) : (
                  <Link href="/auth/login" className="flex-1">
                    <Button className="w-full">Login</Button>
                  </Link>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
