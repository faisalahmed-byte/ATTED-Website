const { spawn } = require("child_process");
const http = require("http");

async function main() {
  console.log("Spawning Next.js server via child_process...");
  const server = spawn("node", ["./node_modules/next/dist/bin/next", "start", "-p", "3000", "-H", "127.0.0.1"], {
    cwd: process.cwd(),
    stdio: ["pipe", "pipe", "pipe"],
  });

  server.stdout.on("data", (d) => {
    const msg = d.toString();
    process.stdout.write(`[Next.js stdout] ${msg}`);
  });

  server.stderr.on("data", (d) => {
    const msg = d.toString();
    process.stderr.write(`[Next.js stderr] ${msg}`);
  });

  let serverClosed = false;
  server.on("close", (code) => {
    serverClosed = true;
    console.log(`Next.js server exited with code ${code}`);
  });

  // Run test-flow
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  try {
    // Wait for server to start
    console.log("Waiting for Next.js to be ready on port 3000...");
    let ready = false;
    for (let i = 0; i < 40; i++) {
      if (serverClosed) break;
      try {
        await new Promise((resolve, reject) => {
          const req = http.get("http://127.0.0.1:3000/", (res) => {
            if (res.statusCode === 200 || res.statusCode === 307 || res.statusCode === 308) resolve();
            else reject(new Error(`Status ${res.statusCode}`));
          });
          req.on("error", (e) => reject(e));
          req.setTimeout(1000, () => req.destroy());
        });
        ready = true;
        break;
      } catch (err) {
        console.log("Connect attempt failed:", err.message, err.code);
        await wait(500);
      }
    }

    if (!ready) {
      console.error("Server failed to respond on port 3000.");
      server.kill("SIGTERM");
      process.exit(1);
    }

    console.log("✅ Next.js is LIVE on http://localhost:3000!");
    console.log("Running comprehensive end-to-end tests...\n");

    // Execute test-flow logic
    const testRunner = spawn("node", ["test-flow.cjs"], {
      cwd: process.cwd(),
      stdio: "inherit",
    });

    await new Promise((resolve, reject) => {
      testRunner.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`Test runner exited with code ${code}`));
      });
    });

    console.log("\nAll end-to-end user flows verified successfully!");
  } finally {
    console.log("Shutting down test server...");
    server.kill();
    // On Windows, child processes might need tree-kill
    try {
      const { execSync } = require("child_process");
      execSync(`taskkill /pid ${server.pid} /T /F`, { stdio: "ignore" });
    } catch {}
  }
}

main().catch((err) => {
  console.error("Test failure:", err);
  process.exit(1);
});
