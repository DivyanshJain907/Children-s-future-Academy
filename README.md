# School Website MVP

A modern, production-ready school website built with Next.js, MongoDB, and Tailwind CSS.

## Features

- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔐 Admin panel with password protection
- 📝 Dynamic notices management
- 🖼️ Gallery with Cloudinary integration
- 📧 Admission and contact forms
- 🗄️ MongoDB database with Mongoose

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB Atlas with Mongoose
- **Image Storage:** Cloudinary
- **Authentication:** Simple password-based admin auth

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account
- Cloudinary account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd school-website-mvp
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file (copy from `.env.local.example`):
```bash
cp .env.local.example .env.local
```

4. Update `.env.local` with your credentials:
   - MongoDB URI from MongoDB Atlas
   - Admin password (create a strong password)
   - Cloudinary credentials

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
school-website-mvp/
├── app/
│   ├── (public)/          # Public pages
│   │   ├── about/
│   │   ├── academics/
│   │   ├── admissions/
│   │   ├── contact/
│   │   ├── gallery/
│   │   └── page.tsx       # Home page
│   ├── admin/             # Admin panel
│   ├── api/               # API routes
│   ├── layout.tsx
│   └── globals.css
├── components/            # Reusable components
├── lib/                   # Utilities
├── models/                # Mongoose models
├── middleware/            # Auth middleware
└── types/                 # TypeScript types
```

## Admin Panel

Access the admin panel at `/admin` with the password set in `.env.local`.

**Features:**
- Add/Delete notices
- Upload gallery images
- View admission submissions

## Deployment (Vercel)

1. Push your code to GitHub

2. Go to [Vercel](https://vercel.com) and import your repository

3. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `ADMIN_PASSWORD`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

4. Deploy!

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `ADMIN_PASSWORD` | Admin panel password |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

## License

MIT
