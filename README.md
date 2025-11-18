# Worlder - Movie Database App

A modern, feature-rich movie database application built with React, TypeScript, and TMDB API. Features include authentication with Firebase, internationalization, dark/light mode, and comprehensive movie browsing capabilities.

## 🚀 Features

- **Authentication**
  - Email/Password registration and login
  - Social login (Google, Facebook, Apple) via Firebase
  - Protected routes and session management
  - User profile with display name and photo

- **Movie Features**
  - Browse popular, now playing, upcoming, and top-rated movies
  - Advanced search functionality
  - Detailed movie information (synopsis, cast, ratings, trailers)
  - YouTube trailer player integration
  - Favorites management with local storage and Firestore sync

- **User Experience**
  - Dark/Light mode with persistence
  - Internationalization (English & Bahasa Indonesia)
  - Responsive design (mobile, tablet, desktop)
  - Toast notifications for user feedback
  - Smooth animations and transitions

- **Technical Stack**
  - React 18 + TypeScript
  - Vite for build tooling
  - TailwindCSS v4 for styling
  - Zustand for state management
  - React Router for navigation
  - React Hook Form for form handling
  - Firebase (Auth, Firestore, Analytics)
  - Axios for API requests
  - i18next for internationalization
  - Notistack for notifications

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A TMDB API account (get your API key from [TMDB](https://www.themoviedb.org/settings/api))
- A Firebase project (create one at [Firebase Console](https://console.firebase.google.com))

## 🔧 Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Click "Add project" and follow the setup wizard

2. **Enable Authentication**
   - Navigate to Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google provider
   - Enable Facebook provider (requires Facebook App ID and Secret)
   - Enable Apple provider (requires Apple Developer Account)

3. **Setup Firestore Database**
   - Navigate to Firestore Database
   - Click "Create database"
   - Start in production mode
   - Choose your preferred location

4. **Enable Analytics**
   - Navigate to Project Settings > Integrations
   - Enable Google Analytics

5. **Get Firebase Configuration**
   - Navigate to Project Settings > General
   - Scroll down to "Your apps"
   - Click the web icon (</>)
   - Copy the firebaseConfig object

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd worlder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # TMDB API Configuration
   VITE_TMDB_API_KEY=your_tmdb_api_key
   VITE_TMDB_READ_ACCESS_TOKEN=your_tmdb_read_access_token

   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 🚀 Deployment to Vercel

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

   Or connect your GitHub repository to Vercel for automatic deployments.

3. **Configure Environment Variables**
   - Go to your Vercel project settings
   - Add all environment variables from your `.env` file

## 🏗️ Project Structure

```
worlder/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Header.tsx
│   │   ├── MovieCard.tsx
│   │   ├── MovieGrid.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── LanguageToggle.tsx
│   │   ├── Loading.tsx
│   │   └── ProtectedRoute.tsx
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── MovieDetailPage.tsx
│   │   ├── SearchPage.tsx
│   │   └── FavoritesPage.tsx
│   ├── stores/             # Zustand state management
│   │   ├── authStore.ts
│   │   ├── favoritesStore.ts
│   │   └── themeStore.ts
│   ├── services/           # External API services
│   │   ├── firebase.ts
│   │   └── tmdb.ts
│   ├── hooks/              # Custom React hooks
│   │   └── useInput.ts
│   ├── types/              # TypeScript type definitions
│   │   ├── auth.ts
│   │   ├── movie.ts
│   │   └── index.ts
│   ├── locales/            # i18n translations
│   │   ├── en.json
│   │   └── id.json
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # App entry point
│   ├── i18n.ts             # i18n configuration
│   └── index.css           # Global styles
├── public/                 # Static assets
├── .env.example            # Environment variables template
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎨 Key Components

### Authentication (`authStore.ts`)
- Firebase Authentication integration
- Local storage persistence
- Social login support
- Session management

### Favorites (`favoritesStore.ts`)
- Local storage for offline persistence
- Firestore sync for cross-device access
- Add/remove favorites functionality

### Theme Management (`themeStore.ts`)
- Dark/Light mode toggle
- System preference detection
- Persistent theme selection

### Movie Service (`tmdb.ts`)
- TMDB API integration
- Movie data fetching
- Image URL helper functions

## 🔑 API Keys Setup

### TMDB API
1. Visit [TMDB API Settings](https://www.themoviedb.org/settings/api)
2. Request an API key
3. Copy both the API Key and Read Access Token
4. Add them to your `.env` file

### Firebase Social Login

**Google Sign-In**
- Automatically configured when enabled in Firebase Console

**Facebook Sign-In**
1. Create a Facebook App at [Facebook Developers](https://developers.facebook.com)
2. Add Firebase OAuth Redirect URI to Facebook App settings
3. Add Facebook App ID and Secret to Firebase

**Apple Sign-In**
1. Enroll in Apple Developer Program
2. Configure Sign in with Apple
3. Add Service ID and key to Firebase

## 🌐 Internationalization

The app supports:
- **English (en)** - Default language
- **Bahasa Indonesia (id)**

To add more languages:
1. Create a new JSON file in `src/locales/`
2. Add translations following the existing structure
3. Import and register in `src/i18n.ts`

## 📱 Responsive Design

The app is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🧪 Testing (Cypress)

End-to-end tests are written using Cypress. To run the tests:

- **Open Cypress UI:**
   ```bash
   npx cypress open
   ```
   This will launch the Cypress Test Runner where you can run and debug tests interactively.

- **Run all tests in headless mode:**
   ```bash
   npx cypress run
   ```

Test files are located in the `cypress/e2e/` directory:

- `cypress/e2e/login.cy.ts` — Login flow tests
- `cypress/e2e/register.cy.ts` — Registration flow tests
- `cypress/e2e/search.cy.ts` — Movie search tests
- `cypress/e2e/theme-language.cy.ts` — Theme and language toggle tests

You can customize or add more tests in the `cypress/e2e/` folder.

## 📖 Available Scripts

## 🖥️ Electron Desktop App

You can run the app as a desktop application using Electron:

- `npm run electron:dev` — Start Electron in development mode (launches Vite and Electron together)
- `npm run electron:build` — Build the Electron desktop app for your OS

See `package.json` for platform-specific build scripts (e.g., `electron:build:win`, `electron:build:mac`, `electron:build:linux`).

## 📚 Documentation (Docsify)

To serve the documentation site locally:

- Install Docsify CLI (if not already):
   ```bash
   npm install -g docsify-cli
   ```
- Serve the docs:
   ```bash
   docsify serve docs
   ```
   The documentation will be available at `http://localhost:3000`

---

`npm run dev` - Start development server
`npm run build` - Build for production
`npm run preview` - Preview production build
`npm run lint` - Run ESLint

## 🤝 Contributing

This is a demo project. Feel free to fork and customize for your needs.

## 📄 License

MIT License

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org) for the movie database API
- [Firebase](https://firebase.google.com) for authentication and database services
- [React](https://react.dev) and the amazing React ecosystem

## 📞 Support

For issues and questions, please check:
- TMDB API Documentation: https://developers.themoviedb.org/3
- Firebase Documentation: https://firebase.google.com/docs
- React Documentation: https://react.dev

---

Built with ❤️ using React, TypeScript, and TailwindCSS
