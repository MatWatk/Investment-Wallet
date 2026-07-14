# Investment Wallet

A portfolio web application for tracking cryptocurrency holdings across multiple platforms.

The app includes authentication, wallet management, market price monitoring, filtering and sorting, and user-specific investment views.

## Live status

Active development. Core features are implemented and continuously improved.

## Core features

- User authentication (signup, login, logout) with Firebase Auth
- Wallet management with add, edit, and delete flows
- Platform-based portfolio organization (for example exchange accounts)
- Live crypto market prices loaded from CoinGecko API
- Asset search, sorting, and summary calculations
- Route protection for authenticated views
- Error boundaries for key routes

## Tech stack

- React 19
- TypeScript
- Vite 8
- React Router
- Redux Toolkit
- Firebase (Auth + Firestore)
- Tailwind CSS

## Project structure

The project follows a modular frontend architecture:

- src/pages: route-level screens and route actions/loaders
- src/components: reusable UI and feature components
- src/services: API and Firebase integration
- src/hooks: custom hooks for shared behavior
- src/store: global state slices and store setup
- src/utils: helpers, parsers, and request builders

## Getting started

### 1. Install dependencies

npm install

### 2. Run in development

npm run dev

### 3. Build for production

npm run build

### 4. Preview production build locally

npm run preview

## Environment variables

Create a .env.local file in the project root.

Local development (optional direct API fallback):

- VITE_COINGECKO_API_KEY

Example:

VITE_COINGECKO_API_KEY=your_api_key_here

Production on Vercel (required):

- COINGECKO_API_KEY

Example (Vercel Project Settings -> Environment Variables):

COINGECKO_API_KEY=your_api_key_here

Note: In production, market data is fetched through a serverless endpoint at /api/markets, so the API key is not exposed to the browser.

## Scripts

- npm run dev: start local development server
- npm run build: run TypeScript build and Vite production build
- npm run lint: run ESLint
- npm run preview: preview production output locally

## Deploy to Vercel

### Option A: Vercel dashboard

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Framework preset: Vite.
4. Add environment variable in Vercel project settings:
   - COINGECKO_API_KEY
5. Deploy.

### Option B: Vercel CLI

1. Install CLI:
   npm i -g vercel
2. Run:
   vercel
3. For production:
   vercel --prod

## Next improvements

- Unit and integration tests
- End-to-end tests
- CI pipeline for build and test automation
- Additional portfolio analytics (for example profit/loss history)

## Author

Mateusz
