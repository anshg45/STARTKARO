
const API_URL = "http://localhost:5000/api";

async function verifyLogin() {
  try {
    const email = "auramember50@startkaro.com";
    const password = "aura2026_50";

    console.log(`Attempting login with: ${email} / ${password}`);

    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (!loginRes.ok) {
        const errData = await loginRes.json();
        console.error("Login Failed Response:", loginRes.status, errData);
        throw new Error(`Login failed: ${loginRes.status} - ${errData.message || 'Unknown error'}`);
    }

    const data = await loginRes.json();
    console.log("✅ Login SUCCESS!");
    console.log("Token received:", data.token ? "Yes" : "No");
    console.log("User:", data.user);

  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

verifyLogin();
