import { NextRequest, NextResponse } from "next/server";
import { resetPasswordSchema } from "@/lib/validations";
import { updateUserPassword, findUserById } from "@/lib/db";
import { verifyPasswordResetToken, hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = resetPasswordSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { token, password } = result.data;

    // Verify token validity and expiration
    const payload = await verifyPasswordResetToken(token);
    if (!payload || !payload.userId) {
      return NextResponse.json(
        { error: "Password reset link is invalid or has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Verify user exists
    const user = await findUserById(payload.userId);
    if (!user) {
      return NextResponse.json(
        { error: "User account could not be found." },
        { status: 404 }
      );
    }

    // Hash the new password with bcrypt
    const passwordHash = await hashPassword(password);

    // Update password in PostgreSQL
    await updateUserPassword(user.id, passwordHash);

    return NextResponse.json(
      {
        message: "Your password has been reset successfully. You can now log in.",
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Reset password error:", errorMessage);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
