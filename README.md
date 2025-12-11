# BetoBar 🍸

by Alex

A Next.js web app for managing your home bar with style.

## Features

This app is for a home bar. It will be a NextJS web app that is styled with Tailwinds. The website has three main components:

1. **Bar Inventory** - A list of the different liquors, mixers, garnishes, and bitters that the home has.
2. **Recipe Book** - A recipe book that a guest can scroll through to make a choice of cocktail the host will prepare.
3. **Sign-In Book** - A guest can enter a form that included their name, what drink they had, a 0 to 5 star rating and a comment. The page has a way to see all the past sign ins.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Vercel Postgres

## Getting Started

### 1. Install Dependencies

```bash
yarn install
```

### 2. Set up Vercel Postgres

1. Create a Vercel project and add a Postgres database from the Storage tab
2. Copy the environment variables from Vercel dashboard
3. Create a `.env.local` file in the root directory:

   ```bash
   cp .env.local.example .env.local
   ```

4. Paste your Vercel Postgres credentials into `.env.local`

### 3. Initialize Database

Run the database initialization script to create tables:

```bash
npx tsx scripts/init-db.ts
```

### 4. Start Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```text
betobar/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── sign-ins/      # Sign-in CRUD endpoints
│   ├── inventory/         # Inventory page
│   ├── recipes/           # Recipe book page
│   └── sign-in/           # Guest sign-in page
├── components/            # React components
│   └── Navigation.tsx     # Main navigation bar
├── data/                  # Static data
│   ├── inventory.ts       # Bar inventory items
│   └── recipes.ts         # Cocktail recipes
├── lib/                   # Utilities
│   └── db.ts              # Database client
├── scripts/               # Utility scripts
│   └── init-db.ts         # Database initialization
└── types/                 # TypeScript types
    └── index.ts           # Type definitions
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add a Postgres database from the Storage tab
4. Vercel will automatically set the environment variables
5. After deployment, run the database initialization:

```bash
vercel env pull .env.local
npx tsx scripts/init-db.ts
```

The app will be live at your Vercel URL!

## Future Enhancements

- [ ] Add authentication for admin features
- [ ] Allow editing/deleting of inventory items
- [ ] Add custom recipe creation
- [ ] Photo uploads for drinks
- [ ] Search and filter functionality
- [ ] Favorite recipes
- [ ] Icons for glassware type
- [ ] Shopping List Maker
- [ ] On sign-ins add a _user also likes_ field
