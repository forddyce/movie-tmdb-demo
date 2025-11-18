# Installation

Complete installation guide for Worlder.

## System Requirements

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (comes with Node.js)
- **Git**: Latest version

## Step-by-Step Installation

### 1. Install Node.js

If you don't have Node.js installed:

**Windows/macOS:**
- Download from [nodejs.org](https://nodejs.org/)
- Run the installer
- Verify installation: `node --version`

**Linux:**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

### 2. Clone the Repository

```bash
git clone <repository-url>
cd worlder
```

### 3. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React and React Router
- Firebase SDK
- Zustand for state management
- TailwindCSS for styling
- And more...

### 4. Environment Setup

Copy the example environment file:
```bash
cp .env.example .env
```

### 5. Verify Installation

Start the development server:
```bash
npm run dev
```

If successful, you should see:
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port.

### Module Not Found Errors

Try removing node_modules and reinstalling:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

Clear the cache and rebuild:
```bash
rm -rf node_modules/.vite
npm run build
```

## Next Steps

- [Configure your environment variables](configuration.md)
- [Set up Firebase](configuration.md#firebase-setup)
- [Get TMDB API key](configuration.md#tmdb-api)
