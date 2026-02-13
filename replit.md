# Toprak Projelendirme Website

## Overview
A professional engineering company website for Toprak Projelendirme, built with React + Express + PostgreSQL. Features a public-facing site with slider, services, projects, blog, and an admin panel for content management.

## Tech Stack
- **Frontend**: React 18, Wouter (routing), TanStack React Query, Framer Motion, Embla Carousel, Tailwind CSS, Shadcn UI
- **Backend**: Express 5, Drizzle ORM, PostgreSQL, Multer (file uploads), Express Session
- **Language**: TypeScript

## Project Structure
```
client/src/
  pages/
    home.tsx            - Homepage with slider, about, services, projects, blog, CTA sections
    services.tsx        - Services list page
    service-detail.tsx  - Individual service detail page
    projects.tsx        - Projects list page
    project-detail.tsx  - Project detail with gallery lightbox
    blog.tsx            - Blog posts list
    blog-detail.tsx     - Individual blog post
    contact.tsx         - Contact information page
    admin/
      login.tsx         - Admin login page
      layout.tsx        - Admin panel layout with sidebar
      dashboard.tsx     - Admin dashboard with stats
      sliders.tsx       - Slider CRUD management
      services-admin.tsx - Services CRUD management
      projects-admin.tsx - Projects CRUD with gallery image management
      blog-admin.tsx    - Blog posts CRUD management
  components/
    public-header.tsx   - Public site header with responsive nav
    public-footer.tsx   - Public site footer
    public-layout.tsx   - Layout wrapper for public pages
    hero-slider.tsx     - Embla carousel hero slider component
server/
  index.ts     - Express server entry
  routes.ts    - API routes (public + admin with multer file upload)
  storage.ts   - Database storage interface
  db.ts        - Drizzle database connection
  seed.ts      - Seed data for initial content
shared/
  schema.ts    - Drizzle schemas: users, sliders, services, projects, projectImages, blogPosts
```

## Key Features
- **Public Site**: Hero slider, services showcase, project gallery with lightbox, blog, contact page
- **Admin Panel**: Login-protected CRUD for all content types with image upload
- **File Upload**: Multer handles image uploads to `client/public/uploads/`
- **Database**: PostgreSQL with Drizzle ORM
- **Responsive**: Mobile-first design with Tailwind CSS

## Admin Credentials
- Username: `admin`
- Password: `admin123`
- Access at: `/admin/login`

## Design
- Warm earth-tone color scheme (HSL 30 based)
- Poppins font family
- Construction/engineering industry aesthetic
- Rounded corners, modern card-based layout
