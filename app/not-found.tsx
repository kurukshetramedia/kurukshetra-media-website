import Link from "next/link"
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md w-full px-4 text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
            <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist or has been moved.</p>
          </div>
          <Link href="/">
            <Button size="lg" className="w-full">
              Return to Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
