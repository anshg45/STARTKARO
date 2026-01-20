const API_URL = "http://127.0.0.1:5000/api";

async function testBackend() {
  try {
    console.log("1. Testing Health/Root...");
    const rootRes = await fetch("http://127.0.0.1:5000/test");
    console.log("Root status:", rootRes.status, await rootRes.text());
    
    const testUser = {
      name: "Test User",
      email: "test" + Date.now() + "@example.com",
      password: "password123",
    };

    console.log("2. Registering User...", testUser.email);
    const authRes = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testUser)
    });

    if (!authRes.ok) {
        throw new Error(`Signup failed: ${authRes.status} ${authRes.statusText} - ${await authRes.text()}`);
    }

    const authData = await authRes.json();
    const token = authData.token;
    console.log("✅ Signup successful. Token received.");

    console.log("3. Fetching Dashboard Stats...");
    const statsRes = await fetch(`${API_URL}/dashboard/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!statsRes.ok) {
        throw new Error(`Stats failed: ${statsRes.status} ${statsRes.statusText} - ${await statsRes.text()}`);
    }

    const statsData = await statsRes.json();
    console.log("✅ Stats fetched:", statsData);

  } catch (err) {
    console.error("❌ Test Failed:", err.message);
  }
}

testBackend();
