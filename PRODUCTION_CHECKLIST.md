# Production Deployment Checklist

Follow this checklist before deploying Kurukshetra Media to production.

## Database Setup ✓
- [ ] Run SQL script 001 - Create tables
- [ ] Run SQL script 002 - Setup profile trigger
- [ ] Run SQL script 003 - Seed initial data
- [ ] Run SQL script 004 - Fix RLS policies
- [ ] Run SQL script 005 - Set first admin
- [ ] Run SQL script 006 - Create posts table
- [ ] Verify all tables exist in Supabase

## Authentication ✓
- [ ] Create first admin account via /auth/sign-up
- [ ] Confirm email
- [ ] Login to /admin dashboard
- [ ] Test logout functionality
- [ ] Verify /admin pages are protected

## Admin Features ✓
- [ ] Create test article with featured image
- [ ] Test article edit and delete
- [ ] Create test video
- [ ] Test video management
- [ ] Create test banner
- [ ] Verify banner displays on homepage
- [ ] Create test post
- [ ] Test post management
- [ ] Add other admin users via /admin/users
- [ ] Configure settings at /admin/settings

## Frontend Display ✓
- [ ] Banner carousel displays on homepage
- [ ] Featured articles show in slider
- [ ] Top 10 stories section displays
- [ ] Category sections render correctly
- [ ] Article detail page works
- [ ] Images load properly
- [ ] Mobile responsive design verified
- [ ] Navigation works on all devices

## Performance ✓
- [ ] Test homepage load time
- [ ] Verify database queries are optimized
- [ ] Check Lighthouse score (aim for 80+)
- [ ] Test with slow 3G connection
- [ ] Verify images are optimized

## Security ✓
- [ ] Enable Supabase RLS on all tables
- [ ] Verify admin-only pages require auth
- [ ] Test SQL injection prevention
- [ ] Check for sensitive data in logs
- [ ] Enable HTTPS enforcement
- [ ] Set secure headers
- [ ] Test CORS configuration

## Environment Variables ✓
- [ ] All required env vars set in Vercel
- [ ] No sensitive keys in code
- [ ] NEXT_PUBLIC_ prefix for client vars only
- [ ] Private keys in server-only env vars

## SEO & Metadata ✓
- [ ] Add meta descriptions to pages
- [ ] Create Open Graph tags
- [ ] Setup sitemap
- [ ] Add robots.txt
- [ ] Test social media preview

## Monitoring & Logs ✓
- [ ] Setup error tracking (e.g., Sentry)
- [ ] Monitor Supabase logs
- [ ] Setup uptime monitoring
- [ ] Configure email alerts
- [ ] Test error handling

## Content Preparation ✓
- [ ] Create initial articles
- [ ] Upload banner images
- [ ] Setup homepage categories
- [ ] Configure display settings
- [ ] Test all content types display

## Launch ✓
- [ ] Final full testing
- [ ] Brief team on deployment
- [ ] Have rollback plan ready
- [ ] Deploy to production
- [ ] Monitor for issues post-launch
- [ ] Share access with team
