import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    const maskedUsers = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone || null,
      bio: u.bio || null,
      avatarUrl: u.avatarUrl || null,
      passwordHash: u.passwordHash ? u.passwordHash.slice(0, 15) + "..." : null,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    }));

    return NextResponse.json({
      status: "connected",
      database: "PostgreSQL",
      provider: "Neon Serverless AWS",
      host: "ep-wandering-forest-bdt92msb-pooler.c-8.us-east-2.aws.neon.tech",
      databaseName: "neondb",
      totalUsers: users.length,
      users: maskedUsers,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        database: "PostgreSQL",
        message: error.message || "Failed to query database",
      },
      { status: 500 }
    );
  }
}
