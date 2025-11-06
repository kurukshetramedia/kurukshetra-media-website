import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kurukshetra Media - Premium News Platform",
  description: "Your trusted source for news, insights, and stories with historic and professional journalism",
  keywords: "news, journalism, media, articles, videos",
  authors: [{ name: "Kurukshetra Media" }],
  creator: "Kurukshetra Media",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kurukshetramedia.com",
    title: "Kurukshetra Media - Premium News Platform",
    description: "Your trusted source for news, insights, and stories with historic and professional journalism",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kurukshetra Media",
    description: "Premium news platform with professional journalism",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
