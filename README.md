This is a [Next.js](https://nextjs.org) project for House of Gon, a travel blog website.

## Getting Started

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

- Travel blog with Netlify DB (serverless Postgres)
- API routes for managing blog posts
- Responsive design with Tailwind CSS
- Deployed on Netlify

## Database Setup

This app uses Netlify DB for the database. To set up:

1. In your Netlify dashboard, enable Netlify DB for your site.
2. The DATABASE_URL environment variable will be automatically set.
3. Run `node seed.js` to populate sample data (requires DATABASE_URL set).

For local development, you can set DATABASE_URL to a local Postgres instance or use a service like Neon.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Netlify

The easiest way to deploy your Next.js app is to use Netlify.

Connect your GitHub repository to Netlify and deploy. Enable Netlify DB in the site settings.
