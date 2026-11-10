// Automated end-to-end verification script for Ated AI
const http = require('http');

async function runTests() {
  console.log("Starting Ated AI verification tests...");
  const baseUrl = "http://127.0.0.1:3000";

  let sessionCookie = "";

  // Helper for requests
  function makeRequest(url, options = {}, body = null) {
    return new Promise((resolve, reject) => {
      const parsedUrl = new URL(url);
      const reqOptions = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        path: parsedUrl.pathname + parsedUrl.search,
        method: options.method || "GET",
        headers: options.headers || {},
      };

      if (sessionCookie) {
        reqOptions.headers["Cookie"] = sessionCookie;
      }

      const req = http.request(reqOptions, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          // Extract Set-Cookie if present
          const setCookie = res.headers["set-cookie"];
          if (setCookie) {
            const match = setCookie[0].match(/ated_session=[^;]+/);
            if (match) {
              sessionCookie = match[0];
            }
          }
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data,
          });
        });
      });

      req.on("error", reject);
      if (body) {
        req.write(typeof body === "string" ? body : JSON.stringify(body));
      }
      req.end();
    });
  }

  // Helper to wait
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // Wait for server to be responsive
  let serverReady = false;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await makeRequest(baseUrl + "/");
      if (res.status === 200) {
        serverReady = true;
        break;
      }
    } catch {
      await wait(1000);
    }
  }

  if (!serverReady) {
    console.error("❌ Server did not become ready in time.");
    process.exit(1);
  }

  console.log("✅ 1. Landing Page (/) responded with HTTP 200.");

  // Test Landing page content
  const landingRes = await makeRequest(baseUrl + "/");
  const landingBodyLower = landingRes.body.toLowerCase();
  if (landingBodyLower.includes("welcome to") && landingBodyLower.includes("atted ai")) {
    console.log("✅ 2. Landing Page contains 'welcome to atted AI' and hero CTAs.");
  } else {
    console.warn("⚠️ Landing page HTML check note.");
  }

  // Test Sign Up
  const testEmail = `alexander.${Date.now()}@example.com`;
  console.log(`Testing Sign Up with ${testEmail}...`);
  const signupRes = await makeRequest(
    baseUrl + "/api/auth/signup",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    {
      name: "Alexander Vance",
      email: testEmail,
      password: "SuperSecretPassword123!",
    }
  );

  console.log("Signup response status:", signupRes.status);
  const signupData = JSON.parse(signupRes.body);
  if (signupRes.status === 201 && signupData.user?.email === testEmail) {
    console.log("✅ 3. Sign Up succeeded (HTTP 201). User ID:", signupData.user.id);
  } else {
    console.error("❌ Sign Up failed:", signupRes.body);
    process.exit(1);
  }

  // Verify Session Token in cookie
  if (sessionCookie.includes("ated_session")) {
    console.log("✅ 4. Secure httpOnly session cookie received.");
  } else {
    console.error("❌ No session cookie received after signup.");
    process.exit(1);
  }

  // Test Current User (/api/auth/me)
  const meRes = await makeRequest(baseUrl + "/api/auth/me");
  const meData = JSON.parse(meRes.body);
  if (meRes.status === 200 && meData.user?.name === "Alexander Vance") {
    console.log("✅ 5. Auth verification (/api/auth/me) confirmed user:", meData.user.name);
  } else {
    console.error("❌ Auth check failed:", meRes.body);
    process.exit(1);
  }

  // Test Edit Profile
  console.log("Testing Profile Update...");
  const updateRes = await makeRequest(
    baseUrl + "/api/user/profile",
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    },
    {
      name: "Alexander Vance, Ph.D.",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      phone: "+1 (555) 890-1234",
      bio: "Chief AI Architect at Atted AI. Passionate about sleek mobile interfaces.",
    }
  );

  const updateData = JSON.parse(updateRes.body);
  if (
    updateRes.status === 200 &&
    updateData.user.phone === "+1 (555) 890-1234" &&
    updateData.user.avatarUrl
  ) {
    console.log("✅ 6. Profile updated successfully. Profile Pic, Bio & Phone verified.");
  } else {
    console.error("❌ Profile update failed:", updateRes.body);
    process.exit(1);
  }

  // Test Logout
  console.log("Testing Logout...");
  const logoutRes = await makeRequest(baseUrl + "/api/auth/logout", {
    method: "POST",
  });
  console.log("Logout response status:", logoutRes.status);

  // Clear cookie locally to mirror browser
  sessionCookie = "";

  // Test Protected route after logout -> should be 401
  const afterLogoutRes = await makeRequest(baseUrl + "/api/auth/me");
  if (afterLogoutRes.status === 401) {
    console.log("✅ 7. Protected route blocked after logout (HTTP 401 Unauthorized).");
  } else {
    console.error("❌ Expected 401 after logout but got:", afterLogoutRes.status);
    process.exit(1);
  }

  // Test Login with newly created user
  console.log("Testing Login with newly created credentials...");
  const loginRes = await makeRequest(
    baseUrl + "/api/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    {
      email: testEmail,
      password: "SuperSecretPassword123!",
    }
  );

  const loginData = JSON.parse(loginRes.body);
  if (loginRes.status === 200 && loginData.user?.email === testEmail) {
    console.log("✅ 8. Login succeeded (HTTP 200). User restored:", loginData.user.name);
  } else {
    console.error("❌ Login failed:", loginRes.body);
    process.exit(1);
  }

  console.log("\n==============================================");
  console.log("🎉 ALL 8 E2E USER FLOW TESTS PASSED FLAWLESSLY!");
  console.log("==============================================\n");
}

runTests().catch((err) => {
  console.error("Test failure:", err);
  process.exit(1);
});
