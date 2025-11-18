# Quick Start

Get up and running with Worlder in minutes.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- TMDB API key
- Firebase project

## Installation

1. Clone the repository:
```bash
git clone <your-repo>
cd worlder
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Add your API keys to `.env`:
```env
VITE_TMDB_READ_ACCESS_TOKEN=your_token
VITE_FIREBASE_API_KEY=your_key
# ... other variables
```

5. Start development server:
```bash
npm run dev
```

Visit `http://localhost:5173` to see your app!

## Next Steps

- [Configure Firebase](configuration.md#firebase-setup)
- [Set up TMDB API](configuration.md#tmdb-api)
- [Learn about features](features/authentication.md)
