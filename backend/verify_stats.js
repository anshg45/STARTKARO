import fetch from "node-fetch";

const API_URL = "http://localhost:5000/api";

async function verifyStats() {
  try {
    // 1. Login as a normal user (Aura Member)
    console.log("Logging in...");
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "auramember01@startkaro.com",
        password: "aura2026_01"
      })
    });

    if (!loginRes.ok) {
      throw new Error(`Login failed: ${loginRes.status}`);
    }

    const { token } = await loginRes.json();
    console.log("Logged in successfully.");

    // 2. Fetch Stats
    console.log("Fetching stats...");
    const statsRes = await fetch(`${API_URL}/dashboard/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!statsRes.ok) {
      throw new Error(`Stats fetch failed: ${statsRes.status}`);
    }

    const stats = await statsRes.json();
    console.log("Stats:", stats);
    
    // 3. Validation Logic
    // We expect 50 Aura users.
    // 5 Super Admins + 1 Main Admin = 6 excluded.
    // Total users in DB = 56.
    // Stats.users should be 50.
    
    if (stats.users === 50) {
        console.log("✅ VERIFICATION PASSED: User count is 50 (Excludes admins/superadmins).");
    } else {
        console.log(`❌ VERIFICATION FAILED: User count is ${stats.users}. Expected 50.`);
    }

  } catch (err) {
    console.error("Error:", err.message);
  }
}

verifyStats();