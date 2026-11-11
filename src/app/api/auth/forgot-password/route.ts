import { NextRequest, NextResponse } from "next/server";
import { forgotPasswordSchema } from "@/lib/validations";
import { findUserByEmail } from "@/lib/db";
import { createPasswordResetToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = forgotPasswordSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || "Invalid email address";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { email } = result.data;
    const user = await findUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email address." },
        { status: 404 }
      );
    }

    // Generate cryptographically signed, 15-minute expiration reset token
    const token = await createPasswordResetToken({
      userId: user.id,
      email: user.email,
    });

    const resetUrl = `/reset-password?token=${encodeURIComponent(token)}`;

    return NextResponse.json(
      {
        message: "Password reset link generated successfully.",
        resetUrl,
        token,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Forgot password error:", errorMessage);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

