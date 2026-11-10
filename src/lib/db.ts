import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import crypto from "crypto";

// Global PrismaClient singleton for Next.js hot-reloading
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  phone?: string | null;
  bio?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface StoredUser extends SafeUser {
  passwordHash: string;
}

// Fallback JSON persistence for seamless out-of-the-box local testing before PostgreSQL is connected
const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "users.json");

function getFallbackUsers(): StoredUser[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(content || "[]");
  } catch {
    return [];
  }
}

function saveFallbackUsers(users: StoredUser[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write to fallback storage:", err);
  }
}

function toSafeUser(user: StoredUser): SafeUser {
  const { passwordHash: _, ...safe } = user;
  return safe;
}

// Check if PostgreSQL via Prisma is available
let isPrismaAvailable: boolean | null = null;

async function checkPrismaConnection(): Promise<boolean> {
  if (isPrismaAvailable !== null) return isPrismaAvailable;
  if (!process.env.DATABASE_URL) {
    isPrismaAvailable = false;
    return false;
  }
  try {
    // Quick test query with timeout
    await prisma.$queryRaw`SELECT 1`;
    isPrismaAvailable = true;
    return true;
  } catch (err) {
    console.warn("PostgreSQL connection via Prisma not currently active. Using local dev fallback store.");
    isPrismaAvailable = false;
    return false;
  }
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const normalizedEmail = email.trim().toLowerCase();
  const usePrisma = await checkPrismaConnection();

  if (usePrisma) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });
      return user as StoredUser | null;
    } catch {
      // Fallback if query fails
    }
  }

  const users = getFallbackUsers();
  const found = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  return found || null;
}

export async function findUserById(id: string): Promise<SafeUser | null> {
  const usePrisma = await checkPrismaConnection();

  if (usePrisma) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) return null;
      return toSafeUser(user as StoredUser);
    } catch {
      // Fallback
    }
  }

  const users = getFallbackUsers();
  const found = users.find((u) => u.id === id);
  if (!found) return null;
  return toSafeUser(found);
}

export async function createUser(data: {
  name: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string | null;
  phone?: string | null;
  bio?: string | null;
}): Promise<SafeUser> {
  const normalizedEmail = data.email.trim().toLowerCase();
  const usePrisma = await checkPrismaConnection();

  if (usePrisma) {
    try {
      const user = await prisma.user.create({
        data: {
          name: data.name.trim(),
          email: normalizedEmail,
          passwordHash: data.passwordHash,
          avatarUrl: data.avatarUrl || null,
          phone: data.phone || null,
          bio: data.bio || null,
        },
      });
      return toSafeUser(user as StoredUser);
    } catch (error) {
      console.error("Prisma user creation failed, trying fallback:", error);
    }
  }

  const users = getFallbackUsers();
  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    name: data.name.trim(),
    email: normalizedEmail,
    passwordHash: data.passwordHash,
    avatarUrl: data.avatarUrl || null,
    phone: data.phone || null,
    bio: data.bio || null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  users.push(newUser);
  saveFallbackUsers(users);
  return toSafeUser(newUser);
}

export async function updateUserProfile(
  id: string,
  data: {
    name: string;
    avatarUrl?: string | null;
    phone?: string | null;
    bio?: string | null;
  }
): Promise<SafeUser> {
  const usePrisma = await checkPrismaConnection();

  if (usePrisma) {
    try {
      const updated = await prisma.user.update({
        where: { id },
        data: {
          name: data.name.trim(),
          avatarUrl: data.avatarUrl !== undefined ? data.avatarUrl : undefined,
          phone: data.phone || null,
          bio: data.bio || null,
        },
      });
      return toSafeUser(updated as StoredUser);
    } catch (error) {
      console.error("Prisma user update failed, trying fallback:", error);
    }
  }

  const users = getFallbackUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    throw new Error("User not found");
  }

  users[index] = {
    ...users[index],
    name: data.name.trim(),
    avatarUrl: data.avatarUrl !== undefined ? data.avatarUrl : users[index].avatarUrl,
    phone: data.phone || null,
    bio: data.bio || null,
    updatedAt: new Date(),
  };

  saveFallbackUsers(users);
  return toSafeUser(users[index]);
}
