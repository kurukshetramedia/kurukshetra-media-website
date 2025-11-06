"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    company: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
    resources: [
      { label: "Categories", href: "/categories" },
      { label: "Archive", href: "/archive" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  }

  const social = [
    { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
    { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
  ]

  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link href="/">
              <h3 className="font-bold text-lg mb-4 text-primary hover:text-primary/80 transition">
                Kurukshetra Media
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted source for news, insights, and stories that matter. Professional journalism with historic
              credibility.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {social.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={s.label}
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:contact@kurukshetramedia.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Mail size={14} />
                  Email
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Kurukshetra Media. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">Made with care by Kurukshetra Team</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
