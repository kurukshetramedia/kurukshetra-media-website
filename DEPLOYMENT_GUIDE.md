# Kurukshetra Media - Deployment & Setup Guide

## Overview
Kurukshetra Media is a production-ready news platform with:
- Public-facing homepage with featured articles, top stories, and category browsing
- Admin dashboard for content management (articles, videos, banners)
- Professional navigation and SEO-optimized pages
- Supabase integration for database and authentication

## Prerequisites
- Vercel account (for deployment)
- Supabase account (already connected)
- Node.js 18+ locally for development

## Database Setup

### Step 1: Run Migration Scripts
The database scripts are in the `/scripts` folder. You need to execute them in order:

1. **001_create_tables.sql** - Creates all core tables
2. **002_profile_trigger.sql** - Sets up auto-profile creation
3. **003_seed_data.sql** - Seeds initial categories
4. **004_fix_rls_policies.sql** - Fixes RLS policies to prevent infinite recursion

To execute these scripts:
- Use the Supabase SQL Editor in your dashboard
- Copy and paste each script in order
- Or use the v0 Scripts section if available

### Step 2: Create First Admin User
After running the scripts, you need to manually set your first admin:

1. Go to Supabase Dashboard → SQL Editor
2. Run this query:
\`\`\`sql
UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'your-email@example.com';
\`\`\`

## Navigation Structure

### Frontend Navigation
The website has the following public pages:

- **Home** (`/`) - Featured slider, top 10 stories, category sections
- **Categories** (`/categories`) - Browse all news categories
- **Category Detail** (`/category/[slug]`) - View articles in specific category
- **Article Detail** (`/article/[id]`) - Read full article with view tracking
- **About** (`/about`) - About the organization
- **Contact** (`/contact`) - Contact form and information
- **Privacy** (`/privacy`) - Privacy policy
- **Terms** (`/terms`) - Terms of service

### Admin Navigation
Admin users access dashboard at `/admin`:

- **Dashboard** (`/admin`) - Statistics and quick start guide
- **Articles** (`/admin/articles`) - Create, edit, delete articles
- **Videos** (`/admin/videos`) - Manage video content
- **Banners** (`/admin/banners`) - Manage promotional banners
- **Settings** (`/admin/settings`) - Configure display options and social media

## Authentication Flow

### User Signup/Login
1. Navigate to `/auth/sign-up` to create admin account
2. Verify email in inbox
3. Login at `/auth/login`
4. Access admin dashboard at `/admin`

## Content Management

### Adding Articles
1. Login to admin dashboard
2. Click "Articles" in sidebar
3. Click "New Article"
4. Fill in:
   - Title (required)
   - Excerpt (summary)
   - Content (full article text)
   - Featured Image URL (optional)
   - Category
   - Status (draft/published/archived)
   - Featured checkbox for homepage slider
5. Click "Save Article"

### Adding Videos
1. Go to "Videos" section
2. Click "New Video"
3. Provide:
   - Title
   - Description
   - Video URL
   - Thumbnail URL
4. Mark as featured if needed
5. Save

### Adding Banners
1. Navigate to "Banners"
2. Create new banner with:
   - Image URL
   - Link destination
   - Banner type
   - Position
3. Set active status

## Deployment to Vercel

### One-Click Deploy
1. Push code to GitHub
2. Connect GitHub to Vercel
3. Environment variables are auto-configured from Supabase integration

### Manual Deployment
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
\`\`\`

## Environment Variables
All required environment variables are automatically provided by Supabase integration:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

No manual setup needed!

## Production Checklist

- [ ] Database migrations executed in correct order
- [ ] First admin user created and verified
- [ ] Articles/videos/banners added
- [ ] Homepage displays correctly
- [ ] Admin dashboard functions properly
- [ ] All navigation links work
- [ ] Contact form email configured (optional)
- [ ] Deployed to Vercel

## Troubleshooting

### "infinite recursion detected in policy for relation 'profiles'"
This means the RLS policies need to be fixed. Run `004_fix_rls_policies.sql`.

### Admin can't access dashboard
Ensure the user's `is_admin` field is set to `true` in the profiles table.

### Images not loading
Verify image URLs are publicly accessible. Use full HTTPS URLs.

### Articles not appearing on homepage
- Check that status is "published"
- Verify category exists
- Wait for cache to refresh

## Support
For issues or questions, contact: contact@kurukshetramedia.com

## Next Steps
1. Run all SQL scripts in order
2. Create your first admin account
3. Add initial content (categories, articles)
4. Deploy to Vercel
5. Configure custom domain if desired
