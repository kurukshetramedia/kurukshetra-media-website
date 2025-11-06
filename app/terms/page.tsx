import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

          <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Kurukshetra Media, you accept and agree to be bound by the terms and provision of
                this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on
                Kurukshetra Media for personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">3. Disclaimer</h2>
              <p>
                The materials on Kurukshetra Media are provided on an 'as is' basis. Kurukshetra Media makes no
                warranties, expressed or implied, and hereby disclaims and negates all other warranties including,
                without limitation, implied warranties or conditions of merchantability, fitness for a particular
                purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">4. Limitations</h2>
              <p>
                In no event shall Kurukshetra Media or its suppliers be liable for any damages (including, without
                limitation, damages for loss of data or profit, or due to business interruption).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-3">5. Contact</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at
                contact@kurukshetramedia.com
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
