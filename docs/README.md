# Worlder - Movie Database App

> A modern, feature-rich movie database application built with React, TypeScript, and TMDB API.

## Features

- 🔐 **Authentication** - Firebase Auth with email/password and social logins (Google, Facebook, Apple)
- 🎬 **Movie Database** - Browse popular, now playing, upcoming, and top-rated movies
- 🔍 **Search** - Find movies by title or keywords
- ⭐ **Favorites** - Save and manage your favorite movies
- 🌓 **Dark Mode** - Beautiful dark and light themes
- 🌍 **i18n** - English and Bahasa Indonesia support
- 📱 **Responsive** - Works seamlessly on mobile, tablet, and desktop

## Quick Start

### Prerequisites

- Node.js 18+
- TMDB API Key ([Get one here](https://www.themoviedb.org/settings/api))
- Firebase Project ([Create one here](https://console.firebase.google.com))

### Installation

```bash
# Install dependencies
npm install

# Create .env file with your credentials
cp .env.example .env

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app.

## Documentation

- [Installation Guide](installation.md)
- [Quick Start](quick-start.md)
- [Configuration](configuration.md)
- [Features](features/authentication.md)
- [Development](development/structure.md)
- [Deployment](deployment/vercel.md)

## Tech Stack

- **Frontend**: React 18, TypeScript, TailwindCSS v4
- **State**: Zustand
- **Routing**: React Router v7
- **Forms**: React Hook Form
- **Backend**: Firebase (Auth, Firestore, Analytics)
- **API**: TMDB API
- **Build**: Vite
- **Testing**: Cypress
- **i18n**: i18next

## Project Structure

```
worlder/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── stores/        # Zustand stores
│   ├── services/      # API services
│   ├── hooks/         # Custom hooks
│   ├── types/         # TypeScript types
│   ├── locales/       # Translations
│   └── routes/        # Route configuration
├── cypress/           # E2E tests
├── docs/             # Documentation
└── public/           # Static assets
```

## Contributing

This is a demo project. Feel free to fork and customize!

## License

MIT License
