import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("\n📡 Querying PostgreSQL database...");
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      bio: true,
      avatarUrl: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  console.log(`\n✅ Connected to PostgreSQL! Total users found: ${users.length}\n`);

  if (users.length === 0) {
    console.log("No users created yet.");
  } else {
    console.table(
      users.map((u) => ({
        ID: u.id.slice(0, 8) + "...",
        Name: u.name,
        Email: u.email,
        Phone: u.phone || "—",
        Bio: u.bio ? (u.bio.length > 25 ? u.bio.slice(0, 25) + "..." : u.bio) : "—",
        "Has Avatar": u.avatarUrl ? "Yes" : "No",
        "Created At": new Date(u.createdAt).toLocaleString(),
      }))
    );
  }
}

main()
  .catch((err) => {
    console.error("Database connection error:", err.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
