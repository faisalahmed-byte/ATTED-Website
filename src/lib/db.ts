import { PrismaClient } from "@prisma/client";

// Global PrismaClient singleton for Next.js in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
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

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email: email.trim().toLowerCase(),
    },
  });
}

export async function findUserById(id: string): Promise<SafeUser | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      phone: true,
      bio: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
}

export async function createUser(data: {
  name: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string | null;
  phone?: string | null;
  bio?: string | null;
}): Promise<SafeUser> {
  const user = await prisma.user.create({
    data: {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      passwordHash: data.passwordHash,
      avatarUrl: data.avatarUrl || null,
      phone: data.phone || null,
      bio: data.bio || null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      phone: true,
      bio: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
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
  const user = await prisma.user.update({
    where: { id },
    data: {
      name: data.name.trim(),
      avatarUrl: data.avatarUrl !== undefined ? data.avatarUrl : undefined,
      phone: data.phone || null,
      bio: data.bio || null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      phone: true,
      bio: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
}
