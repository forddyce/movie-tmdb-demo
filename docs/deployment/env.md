# Environment Variables

Complete guide to configuring environment variables.

## Required Variables

### TMDB API

```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_READ_ACCESS_TOKEN=your_read_access_token_here
```

**Where to get:**
1. Sign up at [themoviedb.org](https://www.themoviedb.org)
2. Go to Settings > API
3. Request an API key
4. Copy both API Key and Read Access Token

### Firebase

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Where to get:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to Project Settings
4. Scroll to \"Your apps\"
5. Copy the firebaseConfig values

## Environment Files

### `.env`
Main environment file (not committed to git):
```env
VITE_TMDB_API_KEY=actual_key
VITE_FIREBASE_API_KEY=actual_key
```

### `.env.example`
Template file (committed to git):
```env
VITE_TMDB_API_KEY=your_api_key
VITE_FIREBASE_API_KEY=your_firebase_key
```

### `.env.local`
Local overrides (not committed):
```env
VITE_TMDB_API_KEY=local_test_key
```

## Usage in Code

Access environment variables:

```typescript
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ...
};
```

## Validation

Validate required variables at startup:

```typescript
const requiredEnvVars = [
  'VITE_TMDB_READ_ACCESS_TOKEN',
  'VITE_FIREBASE_API_KEY',
  // ...
];

requiredEnvVars.forEach(varName => {
  if (!import.meta.env[varName]) {
    console.error(`Missing environment variable: ${varName}`);
  }
});
```

## Production

### Vercel

Add variables in:
1. Project Settings > Environment Variables
2. Choose scope: Production, Preview, Development
3. Click \"Save\"

### Netlify

Add in:
1. Site settings > Build & deploy > Environment
2. Click \"Edit variables\"

### Docker

Pass via command line:
```bash
docker run -e VITE_TMDB_API_KEY=key app
```

Or use `.env` file:
```bash
docker run --env-file .env app
```

## Security

### Do NOT:
- ❌ Commit `.env` to git
- ❌ Hardcode secrets in code
- ❌ Share API keys publicly
- ❌ Use production keys in development

### DO:
- ✅ Use `.env.example` as template
- ✅ Add `.env` to `.gitignore`
- ✅ Rotate keys if exposed
- ✅ Use separate keys per environment

## Troubleshooting

### Variables Not Loading

1. Check file name is exactly `.env`
2. Restart development server
3. Variables must start with `VITE_`
4. Check for typos in variable names

### Production Errors

1. Verify all variables are set in platform
2. Check for correct scope (production/preview)
3. Redeploy after adding variables

## Best Practices

1. **Document all variables** in `.env.example`
2. **Use descriptive names** following `VITE_SERVICE_PURPOSE` pattern
3. **Separate environments** use different Firebase projects
4. **Rotate keys regularly** especially after team changes
5. **Monitor usage** check API quotas and limits
