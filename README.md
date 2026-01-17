# House of Gon

A modern web application built with Vite, React, and TypeScript for exploring nations' travel destinations, foods, and toys.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Backend**: Netlify Functions (serverless)
- **Database**: Netlify DB (Postgres via Neon)
- **Authentication**: Netlify Identity
- **Testing**: Vitest + React Testing Library
- **CI/CD**: GitHub Actions
- **Deployment**: Netlify

## Features

- 🗺️ **Travel Destinations**: Explore iconic travel spots from nations around the world
- 🍜 **Culinary Delights**: Discover authentic foods from different cultures
- 🧸 **Playful Toys**: Find fun toys and games from various nations
- 🔐 **Admin Dashboard**: Protected admin interface for managing content
- 🎨 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🧪 **Unit Testing**: Comprehensive test suite with Vitest
- 🚀 **CI/CD**: Automated testing and deployment with GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Netlify CLI (optional, for local development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/house-of-gon.git
cd house-of-gon
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view the app.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:run     # Run tests once
npm run lint         # Run ESLint
```

## Database Setup

This app uses Netlify DB (serverless Postgres). To set up:

1. In your Netlify dashboard, enable Netlify DB for your site
2. The `NETLIFY_DATABASE_URL` environment variable will be automatically set
3. Run the seed script to populate sample data:
```bash
node seed.js
```

## Authentication Setup

This app uses Netlify Identity for authentication:

1. In your Netlify dashboard, enable Identity for your site
2. Configure Identity settings (allow signup, email templates, etc.)
3. The `JWT_SECRET` environment variable will be automatically set

## Testing

Run the test suite:

```bash
npm run test          # Interactive mode
npm run test:run      # Run once
npm run test:ui       # With UI
```

## Project Structure

```
src/
├── pages/           # React components (pages)
├── test/            # Test utilities
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── globals.css      # Global styles

netlify/
└── functions/       # Serverless functions

.github/
└── workflows/       # GitHub Actions
```

## API Endpoints

- `GET/POST /.netlify/functions/nations` - Manage nations
- `GET/POST /.netlify/functions/travel` - Travel items
- `GET/POST /.netlify/functions/food` - Food items
- `GET/POST /.netlify/functions/toy` - Toy items

## Deployment

### Automatic Deployment (GitHub Actions)

1. Push to the `main` branch
2. GitHub Actions will:
   - Run tests and linting
   - Build the application
   - Deploy to Netlify

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to Netlify:
```bash
netlify deploy --prod --dir=dist
```

## Environment Variables

Required environment variables (automatically set by Netlify):

- `NETLIFY_DATABASE_URL` - Database connection string
- `JWT_SECRET` - JWT signing secret for authentication

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.
