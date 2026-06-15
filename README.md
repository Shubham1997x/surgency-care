# Surgency Care

A full-stack website + content dashboard for **Surgency Care** — a surgical-care
facilitation platform connecting patients with verified surgeons, NABH-accredited
hospitals and affordable treatments.

Built with **Next.js (App Router) · Prisma · SQLite · Tailwind CSS**.

## Features

**Public website**
- Home landing page (hero, stats, specialties, how-it-works, featured doctors/hospitals, testimonials, blog)
- Doctors — listing + detail with booking sidebar
- Hospitals — listing + detail with facts, "why choose", and on-site surgeons
- Treatments — listing, category pages, and procedure detail (symptoms, steps, benefits, recovery, cost)
- Blog — listing + article pages
- About, Contact (with consultation form), FAQs, Terms, Privacy
- Consultation / contact form that captures leads to the database

**Admin dashboard** (`/dashboard`, password-protected)
- Overview with content counts and recent leads
- Full CRUD for **Doctors, Hospitals, Treatment Categories, Treatments, Blogs**
- Image uploads (stored in `public/uploads`)
- Lead inbox (consultation form submissions)

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env        # then edit SESSION_SECRET etc.

# 3. Generate the Prisma client, create the DB, and seed sample data
npm run setup

# 4. Run the dev server
npm run dev
```

Open <http://localhost:3000>.

### Admin login

The dashboard lives at <http://localhost:3000/dashboard> and redirects to `/login`.

Default seeded credentials (change via `.env` and re-seed):

```
Email:    admin@surgencycare.com
Password: admin123
```

## Useful scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (runs `prisma generate` first) |
| `npm run start` | Run the production build |
| `npm run db:push` | Apply the Prisma schema to the database |
| `npm run db:seed` | Seed sample doctors, hospitals, treatments, blogs + admin |
| `npm run setup` | `db:push` + `db:seed` in one step |

## Project structure

```
prisma/
  schema.prisma        # data models (Admin, Hospital, Doctor, Category, Treatment, Blog, Lead)
  seed.ts              # sample content + admin user
src/
  app/
    (public)/          # public website (shares header/footer layout)
    dashboard/         # admin CRUD (protected by middleware)
    login/             # admin login
    api/upload/        # authenticated image upload endpoint
    actions/           # server actions (auth, leads, admin CRUD)
  components/          # shared UI (cards, sections, icons, dashboard widgets)
  lib/                 # db client, auth/session, utilities
  middleware.ts        # protects /dashboard routes
```

## Notes

- **Brand palette** (from the design doc) is wired into `tailwind.config.ts` as
  `brand.dark #0E606E`, `brand.teal #0ED3B0`, `brand.orange #FF9700`, `brand.blue #4E97FD`.
- List fields (specialties, symptoms, etc.) are stored as JSON strings in SQLite and
  edited as one-item-per-line textareas in the dashboard.
- For production, switch `SESSION_SECRET` to a strong random value and consider moving
  the database to Postgres (change the `datasource` provider in `schema.prisma`).
```
