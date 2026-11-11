import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testForgotPasswordFlow() {
  console.log("=== TESTING FORGOT PASSWORD & PASSWORD RESET FLOW ===");
  const baseUrl = "http://127.0.0.1:3000";

  // 1. Create a test user
  const testEmail = `reset.tester.${Date.now()}@example.in`;
  const initialPassword = "OldPassword@123";
  const newPassword = "NewSecretPassword@456";

  console.log("\n[1] Registering test user with initial password...");
  const regRes = await fetch(`${baseUrl}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Reset Tester",
      email: testEmail,
      password: initialPassword,
    }),
  });

  if (!regRes.ok) throw new Error("Registration failed: " + (await regRes.text()));
  console.log("✓ User created successfully.");

  // 2. Verify initial password logs in
  console.log("\n[2] Verifying initial password works for login...");
  const loginRes1 = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: testEmail, password: initialPassword }),
  });
  if (!loginRes1.ok) throw new Error("Initial login failed");
  console.log("✓ Initial password verified.");

  // 3. Request Password Reset Link
  console.log("\n[3] Requesting password reset link (POST /api/auth/forgot-password)...");
  const forgotRes = await fetch(`${baseUrl}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: testEmail }),
  });

  if (!forgotRes.ok) throw new Error("Forgot password request failed: " + (await forgotRes.text()));
  const forgotData = await forgotRes.json();
  if (!forgotData.token || !forgotData.resetUrl) {
    throw new Error("Missing reset token or resetUrl in response");
  }
  console.log("✓ Reset token generated successfully:", forgotData.token.slice(0, 20) + "...");
  console.log("✓ Reset URL generated:", forgotData.resetUrl.slice(0, 40) + "...");

  // 4. Reset Password with Token
  console.log("\n[4] Resetting password with token (POST /api/auth/reset-password)...");
  const resetRes = await fetch(`${baseUrl}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: forgotData.token,
      password: newPassword,
    }),
  });

  if (!resetRes.ok) throw new Error("Password reset failed: " + (await resetRes.text()));
  const resetData = await resetRes.json();
  console.log("✓ Reset API confirmed:", resetData.message);

  // 5. Verify old password fails
  console.log("\n[5] Verifying OLD password is now rejected...");
  const oldLoginRes = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: testEmail, password: initialPassword }),
  });
  if (oldLoginRes.status !== 401) {
    throw new Error(`Expected 401 with old password, got ${oldLoginRes.status}`);
  }
  console.log("✓ Old password successfully rejected (HTTP 401).");

  // 6. Verify new password succeeds
  console.log("\n[6] Verifying NEW password successfully logs in...");
  const newLoginRes = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: testEmail, password: newPassword }),
  });
  if (newLoginRes.status !== 200) {
    throw new Error(`Login with new password failed: ${newLoginRes.status}`);
  }
  const cookie = newLoginRes.headers.get("set-cookie");
  if (!cookie || !cookie.includes("ated_session")) {
    throw new Error("Missing session cookie with new password login");
  }
  console.log("✓ New password authenticated successfully (HTTP 200) with session cookie!");

  // 7. Verify dashboard access with new session
  console.log("\n[7] Verifying dashboard access with updated session...");
  const dashRes = await fetch(`${baseUrl}/dashboard`, {
    headers: { Cookie: cookie.split(";")[0] },
  });
  if (dashRes.status !== 200) throw new Error("Dashboard access failed with new session");
  const dashHtml = await dashRes.text();
  if (!dashHtml.includes("Reset Tester")) throw new Error("Dashboard missing user name");
  console.log("✓ Authenticated dashboard access verified with new password!");

  // 8. Test Edge Case: Invalid Token
  console.log("\n[8] Testing invalid token rejection...");
  const badTokenRes = await fetch(`${baseUrl}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: "invalid.jwt.token",
      password: "AnotherPassword@789",
    }),
  });
  if (badTokenRes.status !== 400) throw new Error("Invalid token was not rejected");
  console.log("✓ Invalid token rejected with HTTP 400.");

  // Clean up
  await prisma.user.delete({ where: { email: testEmail } });
  console.log("\n✓ Cleaned up test user from PostgreSQL.");

  console.log("\n========================================================");
  console.log(" FORGOT PASSWORD & RESET FLOW FULLY VERIFIED (100%)");
  console.log("========================================================");
}

testForgotPasswordFlow()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Test failed:", err);
    process.exit(1);
  });

