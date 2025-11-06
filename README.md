# Kurukshetra Media - Professional News Platform

A modern, production-ready news website built with Next.js, Supabase, and Tailwind CSS.

## Features

### Public Features
- Responsive homepage with featured article slider
- Top 10 stories section based on view count
- Category-based news browsing
- Individual article pages with view tracking
- Professional navigation and footer with social links
- About, Contact, Privacy, and Terms pages
- Mobile-friendly design

### Admin Features
- Complete article management (create, read, update, delete)
- Video and banner content management
- Article status control (draft, published, archived)
- Featured content selection for homepage
- Category management
- Display settings configuration
- User authentication and admin verification

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Deployment**: Vercel

## Quick Start

### 1. Prerequisites
- Node.js 18+
- Supabase account
- Vercel account (for deployment)

### 2. Installation

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd kurukshetra-media

# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Database Setup

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed database setup instructions.

### 4. Create First Admin

Execute in Supabase SQL Editor:
\`\`\`sql
UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'your-email@example.com';
\`\`\`

## File Structure

\`\`\`
app/
├── (public pages)
│   ├── page.tsx              # Homepage
│   ├── categories/           # Categories listing
│   ├── category/[slug]/      # Category detail
│   ├── article/[id]/         # Article detail
│   ├── about/                # About page
│   ├── contact/              # Contact page
│   └── ...                   # Privacy, Terms
├── admin/                    # Admin dashboard
│   ├── layout.tsx            # Admin wrapper
│   ├── page.tsx              # Dashboard
│   ├── articles/             # Article management
│   ├── videos/               # Video management
│   ├── banners/              # Banner management
│   └── settings/             # Settings
└── auth/                     # Authentication
    ├── login/
    ├── sign-up/
    └── check-email/

components/
├── navigation/
│   ├── header.tsx            # Site header with nav
│   └── footer.tsx            # Site footer
├── news/                     # News display components
│   ├── article-card.tsx
│   ├── featured-slider.tsx
│   ├── top-stories.tsx
│   └── category-section.tsx
└── admin/                    # Admin components
    ├── sidebar.tsx
    ├── article-form.tsx
    ├── video-form.tsx
    └── banner-form.tsx

lib/supabase/
├── client.ts                 # Client-side Supabase
├── server.ts                 # Server-side Supabase
└── middleware.ts             # Auth middleware

scripts/
├── 001_create_tables.sql     # Table creation
├── 002_profile_trigger.sql   # Profile trigger
├── 003_seed_data.sql         # Initial data
└── 004_fix_rls_policies.sql  # RLS fixes
\`\`\`

## Key Features Explained

### Row-Level Security (RLS)
All data is protected with RLS policies:
- **Public articles**: Anyone can read published articles
- **Admin operations**: Only authenticated admins can create/edit content
- **User data**: Users can only see their own profiles

### View Tracking
Article view count automatically increments when users visit article pages.

### Featured Content
Admins can mark articles as "featured" to appear in the homepage slider.

### Category System
Organize articles by category with custom colors for visual distinction.

## Customization

### Branding
Edit company name in:
- `components/navigation/header.tsx`
- `components/navigation/footer.tsx`
- `app/layout.tsx` (metadata)

### Colors
Modify design tokens in `app/globals.css` for brand colors.

### Social Links
Update social media URLs in `components/navigation/footer.tsx`.

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repo to Vercel
3. Environment variables auto-configured
4. Click Deploy

### Manual Deployment
\`\`\`bash
npm run build
vercel --prod
\`\`\`

## Performance Optimizations

- Static generation for public pages
- Image optimization with Next.js Image
- Efficient Supabase queries with RLS
- CSS-in-JS with Tailwind
- Automatic code splitting

## SEO

- Meta tags configured in layout
- Open Graph tags for social sharing
- Semantic HTML structure
- Mobile-responsive design
- Fast page load times

## Support

For issues or questions, refer to:
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

## License

All rights reserved © 2025 Kurukshetra Media
