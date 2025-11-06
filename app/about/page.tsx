import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">About Kurukshetra Media</h1>
            <p className="text-lg text-muted-foreground">Your trusted source for professional journalism and news.</p>
          </div>

          {/* Mission Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  At Kurukshetra Media, we are committed to delivering accurate, timely, and insightful news to our
                  readers. Our mission is to inform, educate, and inspire through quality journalism.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We envision a world where access to quality information is available to everyone. By maintaining
                  editorial integrity and professional standards, we strive to be a beacon of truth in media.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Integrity:</strong> We uphold the highest standards of journalistic ethics
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Accuracy:</strong> We verify facts and provide reliable information
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Independence:</strong> We report without bias or external influence
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Transparency:</strong> We are open about our processes and sources
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Team Section */}
          <Card>
            <CardHeader>
              <CardTitle>Our Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Kurukshetra Media is driven by a team of experienced journalists, editors, and content creators
                dedicated to bringing you the stories that matter.
              </p>
              <p className="text-muted-foreground">
                For inquiries or collaborations, please reach out to our team at contact@kurukshetramedia.com
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
