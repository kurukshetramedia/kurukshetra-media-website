# ImageKit Integration Setup Guide

This guide helps you set up ImageKit for image and video uploads in Kurukshetra Media.

## Why ImageKit?

ImageKit provides:
- Easy image and video uploads
- Automatic image optimization
- CDN delivery for fast loading
- Real-time transformations
- Video transcoding support

## Current Implementation

The platform currently supports:
- **Direct URL uploads** - Paste image URLs directly
- **Local file uploads** - Upload files from your computer (stored as base64)
- **ImageKit integration** - Ready for future enhancement

## Setup Steps (Optional - For Future Use)

### 1. Create ImageKit Account
1. Go to [https://imagekit.io](https://imagekit.io)
2. Sign up for a free account
3. Create a new project (or use default)

### 2. Get Your Credentials
In ImageKit Dashboard:
1. Go to **Settings** → **API Keys**
2. Copy your:
   - **URL Endpoint** (looks like: `https://ik.imagekit.io/your_id`)
   - **Public Key**
   - **Private Key** (keep this secret - server-only!)

### 3. Security Best Practices

**IMPORTANT**: Never expose your Private Key to the client!

- Private Key → Only in server environment variables
- Public Key → Can be in `NEXT_PUBLIC_` variables
- Auth Token → Generated server-side, sent to client temporarily

### 4. Server-Side Upload Endpoint (Optional)

Create a secure upload endpoint at `/api/upload/imagekit`:

\`\`\`typescript
// app/api/upload/imagekit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Get file from request
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

    // TODO: Upload to ImageKit using server-side credentials
    // const imageKitPrivateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    // const imageKitPublicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
    // const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

    // Upload logic here...
    
    return NextResponse.json({ 
      success: true, 
      message: 'Upload endpoint ready for ImageKit integration'
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
\`\`\`

### 5. Client-Side Upload (Safe)

Use the server endpoint for uploads:

\`\`\`typescript
// Client component
const handleUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload/imagekit', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  return data.url;
};
\`\`\`

## Current Upload Methods (Secure)

### Banners
1. Click "Upload Image" to select from computer → stored securely
2. Or paste image URL directly

### Posts
1. Click "Upload Image" to select from computer → stored securely
2. Or paste image URL directly

## Tips

- Keep images under 5MB for best performance
- Use JPG for photos, PNG for graphics
- ImageKit automatically optimizes images
- All uploads are secure and private by default
- Never commit `.env.local` to git
\`\`\`
