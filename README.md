# Atedd AI — Mobile Web App

A clean, modern, client-ready mobile-first web application for **Atedd AI**, built with **Next.js 16 (App Router)**, **Tailwind CSS**, **Prisma ORM**, and **PostgreSQL**.

- **Live URL**: [https://atted-website.vercel.app](https://atted-website.vercel.app)
- **GitHub Repository**: [https://github.com/faisalahmed-byte/ATTED-Website](https://github.com/faisalahmed-byte/ATTED-Website)

---

## 📋 Assignment Requirements & Implementation

| # | Requirement | Implementation Details |
| :--- | :--- | :--- |
| **1** | **Landing page** which says "Welcome to Atedd AI" and login, signup buttons | [`src/app/page.tsx`](file:///src/app/page.tsx) featuring official gold circular logo, headline **"Welcome to Atedd AI"**, and distinct full-width **Sign Up** and **Login** call-to-action buttons. |
| **2** | **Login page with registration** | [`src/app/login/page.tsx`](file:///src/app/login/page.tsx) and [`src/app/signup/page.tsx`](file:///src/app/signup/page.tsx) with real-time validation, password visibility toggle, autofocus, loading states, and redirect loops. |
| **3** | **Profile page** with a bio, profile pic, and an edit button which works | [`src/app/dashboard/page.tsx`](file:///src/app/dashboard/page.tsx) displays avatar, full name, email, phone, and bio. Clicking **Edit Profile** navigates to [`src/app/dashboard/edit/page.tsx`](file:///src/app/dashboard/edit/page.tsx) where users can change their profile picture (upload device file or choose presets), edit bio (with live 250-character limit counter), and update phone/name. |
| **4** | **Use PostgreSQL for database** | 100% PostgreSQL via Prisma ORM ([`prisma/schema.prisma`](file:///prisma/schema.prisma)). The `users` table stores UUID `id`, `name`, `email`, `passwordHash` (bcrypt salt 12), `avatarUrl`, `phone`, `bio`, `createdAt`, and `updatedAt`. |

---

## 🌟 Key Features & Optimizations

- **📱 Mobile-First Responsive Design**: Designed natively for a 390px iPhone width and scales fluidly across all Android & iOS devices. On desktop viewports, it renders inside an elegant centered phone frame (max 440px) with dynamic island / speaker ornaments.
- **🎨 Refined Aesthetics**:
  - Light Background: `#F7F8FC`, Light Surface: `#FFFFFF`
  - Dark Background: `#0B0F19`, Dark Surface: `#161F30`
  - Brand Accent: `#4F46E5` (Indigo) to `#7C3AED` (Violet)
  - Typography: **Inter** with bold headers, 16px body, 1.6 line height
  - iOS Optimizations: 16px input font size (prevents automatic iOS Safari zoom on focus), 48px+ tap targets, and `viewport-fit=cover` with safe-area insets.
  - Interactive Dark Mode toggle with persistent preference across refreshes.
- **🔐 Robust Security**:
  - Passwords hashed with **bcryptjs** (salt rounds: 12).
  - Stateless authentication using **jose** JWT signed with HS256.
  - Stored in `httpOnly`, `sameSite: lax`, `secure` cookies (`ated_session`).
  - Next.js Edge Middleware route guarding:
    - Unauthenticated requests to `/dashboard` or `/dashboard/edit` are redirected to `/login`.
    - Authenticated users visiting `/login` or `/signup` are redirected to `/dashboard`.
- **🗄️ PostgreSQL Database via Prisma**:
  - Zero raw SQL injection risk — 100% parameterized queries via Prisma.
  - Zero database credentials exposed to the client bundle.
  - Hosted cloud PostgreSQL on AWS Neon with connection pooling and SSL encryption.

---

## 🚀 Quick Setup & Installation

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v20 & v24)
- **PostgreSQL** database (local or cloud like Neon / Supabase)

### 2. Clone and Install Dependencies
```bash
git clone https://github.com/faisalahmed-byte/ATTED-Website.git
cd ATTED-Website
npm install
```

### 3. Configure Environment Variables
Create a `.env` file based on `.env.example`:
```env
# PostgreSQL Connection URL
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"

# Session JWT Secret (minimum 32 characters)
JWT_SECRET="your_long_secure_secret_key_minimum_32_characters"
```

### 4. Push Database Schema
```bash
npx prisma db push
```

### 5. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser or on your phone via LAN (`http://<YOUR_LOCAL_IP>:3000`).

---

## 🧪 Testing

Run the automated test suite:
```bash
npm test
```

Verifies:
1. Landing page (`/`) loading and hero CTA rendering.
2. User registration (`/api/auth/signup`) with input validation.
3. Password hashing with bcrypt and session cookie generation.
4. Server-side session verification (`/api/auth/me`).
5. User profile update (`/api/user/profile`) for bio, avatar, and phone.
6. Logout (`/api/auth/logout`) and cookie invalidation.
7. Protected route guarding (HTTP 401 on unauthorized access).
8. User sign in (`/api/auth/login`) with verified credentials.

---

## 📁 Project Architecture

```
├── prisma/
│   └── schema.prisma         # PostgreSQL schema (User model with UUID)
├── public/
│   └── logo.png              # Official ATEDD AI circular gold logo
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── signup/   # POST /api/auth/signup
│   │   │   │   ├── login/    # POST /api/auth/login
│   │   │   │   ├── logout/   # POST /api/auth/logout
│   │   │   │   └── me/       # GET /api/auth/me
│   │   │   └── user/
│   │   │       └── profile/  # PATCH /api/user/profile
│   │   ├── dashboard/
│   │   │   ├── edit/
│   │   │   │   ├── EditProfileForm.tsx  # Profile editor (bio + photo upload)
│   │   │   │   └── page.tsx             # Protected edit profile route
│   │   │   ├── LogoutButton.tsx         # Client logout handler
│   │   │   └── page.tsx                 # Protected user overview
│   │   ├── login/
│   │   │   └── page.tsx      # Sign in page
│   │   ├── signup/
│   │   │   └── page.tsx      # Registration page
│   │   ├── globals.css       # Design tokens & safe area support
│   │   ├── layout.tsx        # Inter font & meta tags (viewport-fit=cover)
│   │   └── page.tsx          # Landing hero page (Welcome to ATEDD AI)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx        # Top mobile nav & branding
│   │   │   └── MobileShell.tsx   # 390px iPhone & 440px centered frame
│   │   ├── providers/
│   │   │   └── ThemeProvider.tsx # Light/dark theme context
│   │   └── ui/
│   │       ├── Avatar.tsx        # Initials avatar with gradient
│   │       ├── Button.tsx        # 48px+ tap target button with spinner
│   │       ├── Card.tsx          # 20px rounded surface card
│   │       ├── Input.tsx         # 16px iOS-optimized input with icons
│   │       └── ThemeToggle.tsx   # Dark/light mode switcher
│   ├── lib/
│   │   ├── auth.ts           # JWT generation, bcrypt hashing & cookies
│   │   ├── db.ts             # Prisma PostgreSQL connection
│   │   ├── utils.ts          # Class merging & string utilities
│   │   └── validations.ts    # Zod schemas for signup, login, profile
│   └── middleware.ts         # Route protection & auth redirects
├── .env.example              # Template environment variables
├── package.json              # Scripts & dependencies
├── tailwind.config.ts        # Custom colors, shadows, and radii
└── tsconfig.json             # TypeScript configuration
```

---

## 📄 License
ISC © Atedd AI
