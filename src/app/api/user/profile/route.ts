import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { updateProfileSchema } from "@/lib/validations";
import { updateUserProfile } from "@/lib/db";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = updateProfileSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, avatarUrl, phone, bio } = result.data;

    const updatedUser = await updateUserProfile(session.userId, {
      name,
      avatarUrl: avatarUrl !== undefined ? avatarUrl : undefined,
      phone: phone || null,
      bio: bio || null,
    });

    return NextResponse.json({
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile. Please try again." },
      { status: 500 }
    );
  }
}
