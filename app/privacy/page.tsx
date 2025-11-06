import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you contact us or subscribe to our
                newsletter.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">2. How We Use Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, and to communicate
                with you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">3. Information Sharing</h2>
              <p>We do not sell or share your personal information with third parties without your consent.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">4. Security</h2>
              <p>We implement appropriate security measures to protect your personal information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at contact@kurukshetramedia.com
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
