import os
from fpdf import FPDF

class PDFReport(FPDF):
    def header(self):
        if self.page_no() > 1:
            self.set_font("Helvetica", "B", 8)
            self.set_text_color(120, 120, 120)
            self.cell(0, 8, "ATEDD AI - Technical Documentation & Implementation Guide", border=0, align="L")
            self.cell(0, 8, f"Page {self.page_no()}", border=0, align="R")
            self.ln(10)
            self.set_draw_color(213, 173, 85) # Gold divider
            self.set_line_width(0.3)
            self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
            self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(150, 150, 150)
        self.cell(0, 10, "ATEDD AI v1.0.0 | Confidential & Proprietary Documentation", align="C")

    def chapter_title(self, num_str, label):
        self.set_font("Helvetica", "B", 14)
        self.set_text_color(17, 17, 17) # Deep black
        self.ln(4)
        # Gold accent bar
        self.set_fill_color(213, 173, 85)
        self.rect(self.l_margin, self.get_y() + 1, 3, 6, "F")
        self.set_x(self.l_margin + 6)
        self.cell(0, 8, f"{num_str}. {label}", ln=True)
        self.ln(2)

    def section_title(self, label):
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(30, 30, 30)
        self.ln(3)
        self.cell(0, 6, label, ln=True)
        self.ln(1)

    def body_text(self, text):
        self.set_font("Helvetica", "", 9.5)
        self.set_text_color(50, 50, 50)
        self.multi_cell(0, 5, text)
        self.ln(2)

    def bullet(self, title, desc):
        self.set_font("Helvetica", "B", 9.5)
        self.set_text_color(30, 30, 30)
        self.cell(6, 5, "-")
        self.cell(self.get_string_width(f"{title}: ") + 1, 5, f"{title}: ")
        self.set_font("Helvetica", "", 9.5)
        self.set_text_color(60, 60, 60)
        self.multi_cell(0, 5, desc)
        self.ln(1)

    def code_box(self, code_lines):
        self.set_fill_color(27, 27, 27) # Charcoal
        self.set_text_color(230, 230, 230)
        self.set_font("Courier", "", 8.5)
        
        # Calculate height
        h = len(code_lines) * 4.5 + 4
        self.rect(self.l_margin, self.get_y(), self.w - self.l_margin - self.r_margin, h, "F")
        
        # Gold left border
        self.set_fill_color(213, 173, 85)
        self.rect(self.l_margin, self.get_y(), 2, h, "F")
        
        self.set_y(self.get_y() + 2)
        for line in code_lines:
            self.set_x(self.l_margin + 5)
            self.cell(0, 4.5, line, ln=True)
        self.ln(4)

def build_pdf():
    pdf = PDFReport(orientation="P", unit="mm", format="A4")
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.add_page()

    # --- COVER / HERO HEADER ---
    pdf.set_fill_color(17, 17, 17) # Deep black
    pdf.rect(0, 0, 210, 42, "F")
    
    # Gold accent stripe
    pdf.set_fill_color(213, 173, 85)
    pdf.rect(0, 42, 210, 2, "F")

    pdf.set_y(10)
    pdf.set_text_color(213, 173, 85) # Gold
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(0, 5, "INTELLIGENT WORKSPACE PLATFORM", align="C", ln=True)

    pdf.set_text_color(255, 255, 255)
    pdf.set_font("Helvetica", "B", 20)
    pdf.cell(0, 10, "ATEDD AI - Technical Documentation", align="C", ln=True)

    pdf.set_text_color(180, 180, 180)
    pdf.set_font("Helvetica", "", 9.5)
    pdf.cell(0, 5, "Full-Stack Implementation, Git Setup, PostgreSQL Architecture & Vercel Deployment", align="C", ln=True)

    pdf.set_y(50)

    # Metadata Box
    pdf.set_fill_color(247, 247, 245) # Off-white
    pdf.set_draw_color(232, 232, 230)
    pdf.rect(pdf.l_margin, pdf.get_y(), pdf.w - pdf.l_margin - pdf.r_margin, 24, "FD")
    
    pdf.set_xy(pdf.l_margin + 4, pdf.get_y() + 2)
    pdf.set_font("Helvetica", "B", 8.5)
    pdf.set_text_color(17, 17, 17)
    pdf.cell(40, 5, "Production URL:")
    pdf.set_font("Helvetica", "", 8.5)
    pdf.set_text_color(40, 40, 150)
    pdf.cell(0, 5, "https://atted-website.vercel.app", ln=True)

    pdf.set_x(pdf.l_margin + 4)
    pdf.set_font("Helvetica", "B", 8.5)
    pdf.set_text_color(17, 17, 17)
    pdf.cell(40, 5, "GitHub Repository:")
    pdf.set_font("Helvetica", "", 8.5)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(0, 5, "https://github.com/faisalahmed-byte/ATTED-Website (Private)", ln=True)

    pdf.set_x(pdf.l_margin + 4)
    pdf.set_font("Helvetica", "B", 8.5)
    pdf.set_text_color(17, 17, 17)
    pdf.cell(40, 5, "Core Stack:")
    pdf.set_font("Helvetica", "", 8.5)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(0, 5, "Next.js 16 + React 19 + TypeScript + Tailwind CSS + Prisma + PostgreSQL (AWS Neon)", ln=True)

    pdf.set_x(pdf.l_margin + 4)
    pdf.set_font("Helvetica", "B", 8.5)
    pdf.set_text_color(17, 17, 17)
    pdf.cell(40, 5, "Release Status:")
    pdf.set_font("Helvetica", "B", 8.5)
    pdf.set_text_color(30, 130, 60)
    pdf.cell(0, 5, "v1.0.0 Production - 100% Automated Tests Passing", ln=True)

    pdf.ln(4)

    # --- SECTION 1: EXECUTIVE SUMMARY ---
    pdf.chapter_title("1", "Executive Summary")
    pdf.body_text(
        "ATEDD AI is a high-performance, production-ready intelligent workspace web application. "
        "It features a bespoke black-and-gold visual identity, cloud PostgreSQL persistence via Prisma ORM, "
        "cryptographic authentication (bcrypt salt 12 + HTTP-only JWT cookies), and adaptive responsive "
        "layouts designed for compact mobile devices (360px-430px) as well as wide laptop/desktop displays."
    )

    # --- SECTION 2: TECH STACK ---
    pdf.chapter_title("2", "Technology Stack ('What I Used & Why')")
    pdf.bullet("Next.js 16 (App Router)", "Hybrid React Server Components and Client Components for high speed, zero-layout-shift routing, and built-in API handlers.")
    pdf.bullet("React 19 & TypeScript", "Strict compile-time type safety preventing runtime null/undefined errors across models, APIs, and UI.")
    pdf.bullet("Tailwind CSS", "Custom-token design system enforcing the black & gold palette: #111111 (Deep Black), #1B1B1B (Charcoal), #D5AD55 (Primary Gold), #F7F7F5 (Off-White).")
    pdf.bullet("PostgreSQL (AWS Neon)", "Serverless cloud PostgreSQL instance with connection pooling for real-time data persistence with zero mock data.")
    pdf.bullet("Prisma ORM", "Type-safe database abstraction, schema migrations, and relational queries.")
    pdf.bullet("bcryptjs (Salt 12)", "Industry-standard cryptographic password hashing. Passwords are never stored or logged in plain text.")
    pdf.bullet("jose (JWT)", "Stateless, signed JSON Web Tokens for 7-day HTTP-only cookies and 15-minute password reset tokens.")
    pdf.bullet("Zod", "Schema validation library enforcing strict input sanitization on both frontend and backend routes.")

    # --- SECTION 3: GIT CONNECTION & COMMANDS ---
    pdf.chapter_title("3", "Git Configuration & Version Control Commands")
    pdf.body_text("To establish secure version control and protect sensitive environment credentials, Git was configured as follows:")
    
    pdf.section_title("3.1 Environment Protection (.gitignore)")
    pdf.body_text("Crucial sensitive files are excluded from tracking so credentials never leak to the repository:")
    pdf.code_box([
        "# .gitignore configuration",
        "node_modules/",
        ".next/",
        ".env",
        ".env.local",
        ".vercel/"
    ])

    pdf.section_title("3.2 Repository Connection & Everyday Commands")
    pdf.code_box([
        "# Step 1: Initialize local repository and set default branch",
        "git init",
        "git branch -M main",
        "",
        "# Step 2: Link to GitHub remote repository",
        "git remote add origin https://github.com/faisalahmed-byte/ATTED-Website.git",
        "",
        "# Step 3: Stage, commit, and push updates",
        "git add -A",
        'git commit -m "feat: complete ATEDD AI black and gold UI with PostgreSQL"',
        "git push -u origin main"
    ])

    pdf.section_title("3.3 Ensuring Repository Privacy")
    pdf.body_text(
        "The repository was configured to PRIVATE under GitHub Settings -> Danger Zone -> Change repository visibility. "
        "Any unauthenticated user or search engine visiting the repository receives an HTTP 404 Not Found error."
    )

    # --- SECTION 4: POSTGRESQL SETUP ---
    pdf.add_page()
    pdf.chapter_title("4", "PostgreSQL Setup & Prisma Connection")
    pdf.body_text("All user records, profiles, and password hashes are stored in cloud PostgreSQL on AWS Neon.")

    pdf.section_title("4.1 Environment Variable (.env)")
    pdf.code_box([
        'DATABASE_URL="postgresql://neondb_owner:PASSWORD@ep-wandering-forest-bdt92msb-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require"',
        'JWT_SECRET="ated_ai_production_secret_key_minimum_32_characters_long"'
    ])

    pdf.section_title("4.2 Prisma Schema Definition (prisma/schema.prisma)")
    pdf.code_box([
        "datasource db {",
        '  provider = "postgresql"',
        '  url      = env("DATABASE_URL")',
        "}",
        "",
        "generator client {",
        '  provider = "prisma-client-js"',
        "}",
        "",
        "model User {",
        "  id           String   @id @default(uuid())",
        "  email        String   @unique",
        "  name         String",
        "  passwordHash String",
        "  avatarUrl    String?",
        "  phone        String?",
        "  bio          String?",
        "  createdAt    DateTime @default(now())",
        "  updatedAt    DateTime @updatedAt",
        "",
        '  @@map("users")',
        "}"
    ])

    pdf.section_title("4.3 Database Synchronization Commands")
    pdf.code_box([
        "# Push schema definitions directly to PostgreSQL without manual SQL migrations",
        "npx prisma db push",
        "",
        "# Generate TypeScript Prisma Client bindings",
        "npx prisma generate"
    ])

    pdf.section_title("4.4 Database Singleton Pattern (src/lib/db.ts)")
    pdf.body_text(
        "A singleton PrismaClient instance is maintained in src/lib/db.ts to avoid exhausting database connection "
        "pools during Next.js serverless hot reloads."
    )

    # --- SECTION 5: VERCEL DEPLOYMENT ---
    pdf.chapter_title("5", "Vercel Production Deployment Workflow")
    
    pdf.section_title("5.1 Build Script Automation (package.json)")
    pdf.body_text("To guarantee that Prisma Client is regenerated on Vercel's build machines before Next.js builds:")
    pdf.code_box([
        '"scripts": {',
        '  "build": "prisma generate && next build --webpack"',
        "}"
    ])

    pdf.section_title("5.2 Injecting Production Environment Variables")
    pdf.body_text("Environment variables were securely added via Vercel CLI / Web Dashboard:")
    pdf.code_box([
        "# Add database URL to production environment",
        "npx vercel env add DATABASE_URL production",
        "",
        "# Add JWT Secret to production environment",
        "npx vercel env add JWT_SECRET production"
    ])

    pdf.section_title("5.3 Production Deployment Command")
    pdf.code_box([
        "# Deploy directly to live production edge network",
        "npx vercel --prod --yes"
    ])

    # --- SECTION 6: FILE-BY-FILE ARCHITECTURE ---
    pdf.add_page()
    pdf.chapter_title("6", "File-by-File Architecture ('Which Code & File Is for What')")
    
    files = [
        ("src/app/page.tsx", "Landing Page", "Hero section, circular gold logo, strong headline, Sign Up and Login buttons."),
        ("src/app/login/page.tsx", "Login Screen", "Credentials form, Forgot Password link directly below password input, alert banners."),
        ("src/app/signup/page.tsx", "Sign Up Screen", "Registration form with Indian phone (+91 98765 43210), auto-login upon submit."),
        ("src/app/forgot-password/page.tsx", "Forgot Password", "Email submission generating a 15-minute cryptographically signed reset token."),
        ("src/app/reset-password/page.tsx", "Reset Password", "Token validation, new password entry with eye toggle, and bcrypt hash update."),
        ("src/app/dashboard/page.tsx", "User Dashboard", "Personalized greeting, profile card with Avatar, Email, Phone, Bio, and Member Since."),
        ("src/app/dashboard/edit/EditProfileForm.tsx", "Profile Editor", "Photo upload (under 2MB), 4 avatar presets, bio with 250-char countdown counter."),
        ("src/app/dashboard/LogoutButton.tsx", "Logout Button", "Calls POST /api/auth/logout, deletes session cookie, redirects to home."),
        ("src/app/api/auth/signup/route.ts", "Signup API", "Zod validation, duplicate check, bcrypt hashing (12 rounds), PostgreSQL user creation."),
        ("src/app/api/auth/login/route.ts", "Login API", "Email lookup, bcrypt verify, sets 7-day HTTP-only ated_session cookie."),
        ("src/app/api/auth/forgot-password/route.ts", "Forgot API", "Generates signed JWT token with 15-minute expiration for password reset."),
        ("src/app/api/auth/reset-password/route.ts", "Reset API", "Validates JWT reset token, hashes new password with bcrypt, updates PostgreSQL."),
        ("src/app/api/user/profile/route.ts", "Profile API", "PATCH route updating name, avatar, phone, and bio in PostgreSQL."),
        ("src/lib/auth.ts", "Auth Engine", "bcrypt hashing/verify, JWT session token generation, cookie decode, reset token verify."),
        ("src/lib/db.ts", "Database Singleton", "Prisma client instance and database helper functions (createUser, updateUserPassword)."),
        ("src/lib/validations.ts", "Zod Schemas", "Input validation schemas for signup, login, forgot password, reset, and profile edit."),
        ("src/middleware.ts", "Route Guard", "Redirects unauthenticated visitors from /dashboard and /dashboard/edit to /login."),
        ("src/components/ui/Input.tsx", "Form Input", "16px iOS auto-zoom prevention, built-in Eye/EyeOff toggle, gold focus ring."),
        ("src/components/ui/Button.tsx", "Button Component", "Primary Gold (#D5AD55) button with dark text; secondary bordered button.")
    ]

    pdf.set_font("Helvetica", "B", 8)
    pdf.set_fill_color(240, 240, 238)
    pdf.set_draw_color(210, 210, 210)
    pdf.cell(50, 6, "File Path", border=1, fill=True)
    pdf.cell(32, 6, "Component/Role", border=1, fill=True)
    pdf.cell(98, 6, "Description & Purpose", border=1, fill=True, ln=True)

    pdf.set_font("Helvetica", "", 7.5)
    for path, role, desc in files:
        pdf.set_text_color(20, 20, 20)
        pdf.cell(50, 5, path, border=1)
        pdf.set_font("Helvetica", "B", 7.5)
        pdf.cell(32, 5, role, border=1)
        pdf.set_font("Helvetica", "", 7.5)
        pdf.cell(98, 5, desc, border=1, ln=True)

    # --- SECTION 7: TESTING & CHEAT SHEET ---
    pdf.ln(3)
    pdf.chapter_title("7", "Verification & Command Cheat Sheet")
    pdf.code_box([
        "# Run Automated End-to-End Test Suite (Signup, Login, DB Sync, Edit, Logout)",
        "node scripts/e2e-verification.js",
        "",
        "# Run Forgot Password & Password Reset Verification Suite",
        "node scripts/test-forgot-password.js",
        "",
        "# Routine Git Update Workflow",
        "git add -A",
        'git commit -m "update: your message"',
        "git push origin main",
        "",
        "# Production Vercel Deployment",
        "npx vercel --prod --yes"
    ])

    out_root = "ATEDD_AI_Project_Documentation.pdf"
    out_public = os.path.join("public", "ATEDD_AI_Project_Documentation.pdf")
    
    pdf.output(out_root)
    pdf.output(out_public)
    print(f"PDF successfully generated:\n1. {out_root}\n2. {out_public}")

if __name__ == "__main__":
    build_pdf()
