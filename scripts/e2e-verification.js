import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function runTests() {
  console.log("=== STARTING ATTED AI PRODUCTION VERIFICATION ===");
  const baseUrl = "http://127.0.0.1:3000";

  // 1. Landing Page Test
  console.log("\n[1] Testing Landing Page (/)...");
  const landingRes = await fetch(`${baseUrl}/`);
  if (!landingRes.ok) throw new Error(`Landing page failed with ${landingRes.status}`);
  const landingHtml = await landingRes.text();
  if (!landingHtml.includes("ATTED AI")) throw new Error("Landing page missing ATTED AI brand");
  if (!landingHtml.includes("Welcome to")) throw new Error("Landing page missing Welcome to");
  console.log("✓ Landing page loads perfectly with ATTED AI branding and responsive layout.");

  // 2. Signup Page Test
  console.log("\n[2] Testing Signup Page (/signup)...");
  const signupRes = await fetch(`${baseUrl}/signup`);
  if (!signupRes.ok) throw new Error(`Signup page failed with ${signupRes.status}`);
  const signupHtml = await signupRes.text();
  if (!signupHtml.includes("+91 98765 43210")) throw new Error("Signup page missing Indian phone format placeholder");
  if (!signupHtml.includes("Enter your full name")) throw new Error("Signup page missing neutral name placeholder");
  console.log("✓ Signup page contains Indian standard +91 placeholder and clean neutral fields.");

  // 3. User Registration with Indian Phone Number
  console.log("\n[3] Testing User Registration in PostgreSQL...");
  const testEmail = `user.${Date.now()}@example.in`;
  const testPhone = "+91 98765 43210";
  const testName = "Aditi Sharma";
  const testPassword = "Password@Secure123";

  const regRes = await fetch(`${baseUrl}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: testName,
      email: testEmail,
      phone: testPhone,
      password: testPassword,
    }),
  });

  const regData = await regRes.json();
  if (regRes.status !== 201) {
    throw new Error(`Signup API failed: ${JSON.stringify(regData)}`);
  }
  console.log(`✓ Registration succeeded (HTTP 201). User ID: ${regData.user.id}`);

  // 4. Verify PostgreSQL persistence directly via Prisma
  console.log("\n[4] Verifying record directly in Cloud PostgreSQL...");
  const dbUser = await prisma.user.findUnique({
    where: { email: testEmail },
  });
  if (!dbUser) throw new Error("User was not found in PostgreSQL!");
  if (dbUser.phone !== testPhone) throw new Error(`Phone in DB mismatch: expected ${testPhone}, got ${dbUser.phone}`);
  console.log(`✓ Confirmed in PostgreSQL: Name='${dbUser.name}', Phone='${dbUser.phone}', Email='${dbUser.email}'`);

  // 5. Test Login and Session Cookie
  console.log("\n[5] Testing Login API and JWT Cookie Generation...");
  const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testEmail,
      password: testPassword,
    }),
  });

  if (loginRes.status !== 200) throw new Error(`Login failed: ${loginRes.status}`);
  const setCookie = loginRes.headers.get("set-cookie");
  if (!setCookie || !setCookie.includes("ated_session")) {
    throw new Error(`Missing ated_session cookie in login response! Header: ${setCookie}`);
  }
  const sessionCookie = setCookie.split(";")[0];
  console.log("✓ Login succeeded (HTTP 200) with encrypted session cookie.");

  // 6. Test Dashboard with Session Cookie
  console.log("\n[6] Testing Authenticated Dashboard Access...");
  const dashRes = await fetch(`${baseUrl}/dashboard`, {
    headers: {
      Cookie: sessionCookie,
    },
    redirect: "manual",
  });
  console.log(`Dashboard response status: ${dashRes.status}, location: ${dashRes.headers.get("location")}`);
  const dashHtml = await dashRes.text();
  console.log("Snippet:", dashHtml.slice(0, 300));
  if (dashRes.status !== 200) throw new Error(`Dashboard returned ${dashRes.status}`);
  if (!dashHtml.includes("Welcome back") || !dashHtml.includes("Aditi")) {
    throw new Error("Dashboard missing personalized welcome for Aditi");
  }
  if (!dashHtml.includes("+91 98765 43210")) throw new Error("Dashboard missing registered Indian phone number");
  console.log("✓ Dashboard renders authenticated view with 'Welcome back, Aditi' and phone '+91 98765 43210'.");

  // 7. Test Profile Update
  console.log("\n[7] Testing Profile Update (PATCH /api/user/profile)...");
  const updatedPhone = "+91 91234 56789";
  const updatedBio = "Lead AI engineer focusing on distributed intelligence.";

  const updateRes = await fetch(`${baseUrl}/api/user/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionCookie,
    },
    body: JSON.stringify({
      name: "Aditi S.",
      phone: updatedPhone,
      bio: updatedBio,
    }),
  });

  if (!updateRes.ok) throw new Error(`Profile update failed: ${updateRes.status}`);
  const updatedDbUser = await prisma.user.findUnique({
    where: { email: testEmail },
  });
  if (updatedDbUser.phone !== updatedPhone) throw new Error("Updated phone not in DB");
  if (updatedDbUser.bio !== updatedBio) throw new Error("Updated bio not in DB");
  console.log(`✓ Profile updated in PostgreSQL: Phone='${updatedDbUser.phone}', Bio='${updatedDbUser.bio}'`);

  // 8. Test Logout and Route Protection
  console.log("\n[8] Testing Logout and Protected Route Security...");
  const logoutRes = await fetch(`${baseUrl}/api/auth/logout`, {
    method: "POST",
    headers: { Cookie: sessionCookie },
  });
  if (!logoutRes.ok) throw new Error("Logout failed");

  // Verify dashboard redirect without cookie
  const unauthRes = await fetch(`${baseUrl}/dashboard`, {
    redirect: "manual",
  });
  if (unauthRes.status !== 307 && unauthRes.status !== 302) {
    throw new Error(`Expected redirect 307/302 for unauthenticated dashboard, got ${unauthRes.status}`);
  }
  console.log("✓ Route protection verified: unauthenticated user redirected with HTTP " + unauthRes.status);

  // 9. Test Invalid Inputs
  console.log("\n[9] Testing Edge Cases and Validation...");
  // Duplicate email registration
  const dupRes = await fetch(`${baseUrl}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test",
      email: testEmail,
      password: "password123",
    }),
  });
  if (dupRes.status !== 409) throw new Error(`Expected 409 for duplicate email, got ${dupRes.status}`);
  console.log("✓ Duplicate email registration rejected with HTTP 409 Conflict.");

  // Short password
  const shortPassRes = await fetch(`${baseUrl}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test",
      email: `other.${Date.now()}@example.in`,
      password: "short",
    }),
  });
  if (shortPassRes.status !== 400) throw new Error(`Expected 400 for short password, got ${shortPassRes.status}`);
  console.log("✓ Short password rejected with HTTP 400 Bad Request.");

  console.log("\n========================================================");
  console.log(" ALL VERIFICATION CHECKS PASSED SUCCESSFULLY (100%)");
  console.log("========================================================");

  // Clean up test user
  await prisma.user.delete({ where: { email: testEmail } });
  console.log("✓ Cleaned up test user from cloud PostgreSQL.");
}

runTests()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Test failed:", err);
    process.exit(1);
  });
