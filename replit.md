# Clayton's Professional Website

A Next.js 16 personal/professional website with an admin dashboard.

## Tech Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure

- `app/` — Next.js App Router pages and API routes
  - `app/api/admin/` — Protected admin API routes (auth, contacts, posts)
  - `app/api/contact/` — Public contact form endpoint
  - `app/api/posts/` — Public posts endpoint
  - `app/api/resume/` — Resume endpoint
  - `app/admin/` — Admin dashboard page
  - `app/projects/` — Project detail pages
  - `app/writing/` — Writing/blog pages
- `components/` — Shared React components
- `lib/` — Utility functions and shared logic
- `data/` — Static data files
- `public/` — Static assets

## Running the App

The app runs on port 5000 via the "Start application" workflow using `npm run dev`.

## Environment Variables

- `ADMIN_PASSWORD` — Password for the admin dashboard (defaults to "changeme" if not set — **must be changed in production**)

## Notes

- Migrated from Vercel to Replit: removed `output: "standalone"` from next.config.ts (not needed for Replit dev)
- Dev and start scripts use `-p 5000 -H 0.0.0.0` for Replit compatibility
