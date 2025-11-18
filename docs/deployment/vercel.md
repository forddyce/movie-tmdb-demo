# Deploying to Vercel

Deploy Worlder to Vercel in minutes.

## Prerequisites

- Vercel account (free tier available)
- GitHub/GitLab/Bitbucket repository
- Environment variables ready

## Quick Deploy

### Method 1: Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts

### Method 2: Git Integration

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Vercel auto-detects Vite configuration
5. Add environment variables
6. Click "Deploy"

## Environment Variables

Add these in Vercel Project Settings > Environment Variables:

```
VITE_TMDB_API_KEY
VITE_TMDB_READ_ACCESS_TOKEN
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

## Vercel Configuration

The `vercel.json` file is pre-configured:

```json
{
  \"buildCommand\": \"npm run build\",
  \"outputDirectory\": \"dist\",
  \"devCommand\": \"npm run dev\",
  \"framework\": \"vite\"
}
```

## Custom Domain

1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records
4. Wait for SSL certificate

## Automatic Deployments

Vercel automatically deploys:
- Production branch (main/master)
- Preview deployments for PRs
- All commits get unique URLs

## Build Optimization

### 1. Enable Analytics

Vercel Analytics provides performance metrics:
```bash
npm install @vercel/analytics
```

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <>
      <App />
      <Analytics />
    </>
  );
}
```

### 2. Enable Speed Insights

```bash
npm install @vercel/speed-insights
```

### 3. Image Optimization

Use Vercel Image component for optimized images.

## Monitoring

Monitor your deployment:
- Real-time logs in Vercel dashboard
- Performance metrics
- Error tracking
- Analytics

## Rollback

To rollback to a previous deployment:
1. Go to Deployments
2. Find the working deployment
3. Click "Promote to Production"

## Troubleshooting

### Build Fails

Check build logs in Vercel dashboard:
- Environment variables set correctly?
- Dependencies installed?
- TypeScript errors?

### Runtime Errors

- Check browser console
- Review Vercel function logs
- Verify API keys

### 404 Errors

Ensure SPA routing is configured (already set in vercel.json).

## Security

### Headers

Add security headers in `vercel.json`:

```json
{
  \"headers\": [
    {
      \"source\": \"/(.*)\",
      \"headers\": [
        {
          \"key\": \"X-Frame-Options\",
          \"value\": \"DENY\"
        }
      ]
    }
  ]
}
```

## Performance

Vercel automatically provides:
- Global CDN
- Compression (gzip/brotli)
- HTTP/2
- Smart caching
