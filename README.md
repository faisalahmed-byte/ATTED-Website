# Ated AI — Premium Mobile Web App

A clean, modern, client-ready mobile-first web application for **Ated AI**, crafted with **Next.js (App Router)**, **Tailwind CSS**, **Prisma ORM**, and **PostgreSQL**.

---

## 🌟 Highlights & Features

- **📱 Mobile-Only Experience**: Designed for a 390px iPhone width and scales seamlessly across Android devices. On desktop displays, the app is centered in a high-end phone frame (max 440px) with dynamic island / speaker ornaments.
- **🎨 Refined Aesthetic & Palette**:
  - Light Background: `#F7F8FC`, Light Surface: `#FFFFFF`
  - Dark Background: `#0B0F19`, Dark Surface: `#161F30`
  - Brand Gradient: `#4F46E5` (Indigo) to `#7C3AED` (Violet)
  - Typography: **Inter** with bold headers, 16px body, 1.6 line height
  - iOS Optimizations: 16px input fonts (prevents iOS auto-zoom on focus), 48px+ tap targets, and `viewport-fit=cover` with notch safe-area insets.
  - Interactive Dark Mode toggle with persistent preference.
- **🔐 Secure Authentication & Session**:
  - Passwords hashed using **bcrypt** (salt rounds: 12).
  - Stateless session tokens using **jose** JWT signed with HS256.
  - Stored in `httpOnly`, `sameSite: lax`, `secure` cookies (`ated_session`).
  - Next.js Edge Middleware route guarding:
    - Logged-out users opening `/dashboard` or `/dashboard/edit` are redirected to `/login`.
    - Logged-in users opening `/login` or `/signup` are redirected to `/dashboard`.
- **🗄️ PostgreSQL Database via Prisma**:
  - `User` model with `id` (UUID), `name`, `email` (unique), `passwordHash`, `phone` (optional), `bio` (optional), `createdAt`, and `updatedAt`.
  - Zero raw SQL injection risk — 100% parameterized queries via Prisma.
  - Zero database credentials exposed to the client.
  - Graceful dev fallback store for immediate local testing if PostgreSQL is not yet running.

---

## 🚀 Quick Setup & Installation

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v24)
- **PostgreSQL** instance (local or hosted on Neon, Supabase, Railway, etc.)

### 2. Clone and Install Dependencies
```bash
git clone <repo-url>
cd ATTED-WEBSITE
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Update `.env` with your PostgreSQL database URL and JWT secret:
```env
# PostgreSQL Connection URL
DATABASE_URL="postgresql://postgres:password@localhost:5432/ated_ai?schema=public"

# Session JWT Secret (minimum 32 characters)
JWT_SECRET="your_long_secure_secret_key_minimum_32_characters"
```

### 4. Run Prisma Migration
Push schema to your PostgreSQL database:
```bash
npm run db:push
# or generate migrations:
npm run db:migrate
```

### 5. Start the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser or mobile device.

---

## 🧪 Automated End-to-End Verification

A comprehensive test suite verifies the complete user lifecycle:
1. Landing page (/) loading and hero CTA rendering.
2. User registration (/api/auth/signup) with input validation.
3. Password hashing with bcrypt and session cookie generation.
4. Server-side session verification (/api/auth/me).
5. User profile update (/api/user/profile) for phone and bio.
6. Logout (/api/auth/logout) and cookie invalidation.
7. Protected route guarding (HTTP 401 on unauthorized access).
8. User sign in (/api/auth/login) with verified credentials.

Run tests:
```bash
npm test
```

---

## 📁 Project Architecture

```
├── prisma/
│   └── schema.prisma         # PostgreSQL schema (User model with UUID)
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
│   │   │   │   ├── EditProfileForm.tsx  # Interactive profile editor
│   │   │   │   └── page.tsx             # Protected edit profile route
│   │   │   ├── LogoutButton.tsx         # Client logout handler
│   │   │   └── page.tsx                 # Protected user overview
│   │   ├── login/
│   │   │   └── page.tsx      # Sign in page
│   │   ├── signup/
│   │   │   └── page.tsx      # Registration page
│   │   ├── globals.css       # Design tokens & safe area support
│   │   ├── layout.tsx        # Inter font & meta tags (viewport-fit=cover)
│   │   └── page.tsx          # Landing hero page
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
│   │   ├── db.ts             # Prisma PostgreSQL connection & services
│   │   ├── utils.ts          # Class merging & string utilities
│   │   └── validations.ts    # Zod schemas for signup, login, profile
│   └── middleware.ts         # Route protection & auth redirects
├── .env.example              # Template environment variables
├── package.json              # Scripts & dependencies
├── tailwind.config.ts        # Custom colors, shadows, and radii
└── tsconfig.json             # TypeScript configuration
```

---

## 🎨 Color Tokens Reference

| Element | Light Theme | Dark Theme |
| :--- | :--- | :--- |
| **Background** | `#F7F8FC` | `#0B0F19` |
| **Surface Card** | `#FFFFFF` | `#161F30` |
| **Primary Brand** | `#4F46E5` (Indigo) | `#4F46E5` |
| **Secondary Brand** | `#7C3AED` (Violet) | `#7C3AED` |
| **Primary Text** | `#0F172A` (Slate 900) | `#F8FAFC` (Slate 50) |
| **Muted Text** | `#64748B` (Slate 500) | `#94A3B8` (Slate 400) |
| **Borders** | `#E2E8F0` | `#334155` |

---

## 📄 License
ISC © Ated AI

