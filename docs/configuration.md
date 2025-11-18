# Configuration

Learn how to configure Worlder for your needs.

## Environment Variables

Worlder uses environment variables for sensitive configuration. Create a `.env` file in the root directory:

```env
# TMDB API
VITE_TMDB_API_KEY=your_api_key
VITE_TMDB_READ_ACCESS_TOKEN=your_read_access_token

# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## TMDB API

### Getting Your API Key

1. Visit [TMDB](https://www.themoviedb.org)
2. Create an account or sign in
3. Go to Settings > API
4. Request an API key
5. Copy both the API Key and Read Access Token

### Adding to Your Project

Add the values to your `.env` file:
```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_READ_ACCESS_TOKEN=your_token_here
```

## Firebase Setup

### Creating a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Enter project name
4. Enable Google Analytics (optional)
5. Click "Create project"

### Enable Authentication

1. In Firebase Console, click "Authentication"
2. Click "Get started"
3. Enable sign-in methods:
   - **Email/Password**: Click and enable
   - **Google**: Click, enable, and add support email
   - **Facebook**: Requires Facebook App ID and Secret
   - **Apple**: Requires Apple Developer Account

### Setup Firestore

1. Click "Firestore Database"
2. Click "Create database"
3. Choose production mode
4. Select your location
5. Click "Enable"

### Get Configuration

1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click web icon (</>)
4. Register your app
5. Copy the firebaseConfig object
6. Add values to your `.env` file

## Facebook Login (Optional)

1. Create a Facebook App at [developers.facebook.com](https://developers.facebook.com)
2. Add "Facebook Login" product
3. In Settings > Basic, copy App ID and App Secret
4. Add to Firebase Authentication settings
5. Add Firebase OAuth redirect URI to Facebook app

## Apple Login (Optional)

1. Enroll in Apple Developer Program
2. Create a Service ID
3. Configure "Sign in with Apple"
4. Add credentials to Firebase
5. Configure redirect URIs

## Vercel Configuration

When deploying to Vercel, add environment variables in:
1. Project Settings > Environment Variables
2. Add all `VITE_*` variables
3. Deploy

The `vercel.json` file is already configured for you.

## Testing Configuration

To test if your configuration is working:

```bash
npm run dev
```

Then:
1. Navigate to login page
2. Try social login (should open popup)
3. Try email/password registration
4. Check if movies load on home page

## Troubleshooting

### Firebase Errors

- **"Firebase: Error (auth/invalid-api-key)"**: Check your Firebase API key
- **"Firebase: Error (auth/project-not-found)"**: Verify project ID

### TMDB Errors

- **"401 Unauthorized"**: Check your API token
- **"404 Not Found"**: Check API endpoints in `services/tmdb.ts`

### Environment Variables Not Loading

- Ensure `.env` is in the root directory
- Restart development server after changing `.env`
- Variables must start with `VITE_` prefix
