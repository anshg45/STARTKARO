const API_URL = "http://127.0.0.1:5000/api";

// 1. Pick one of the new Super Admins
const superAdminCreds = {
  email: "superadmin1@startkaro.com",
  password: "SuperKey@2026_1"
};

async function testSuperAdmin() {
  try {
    console.log("🔹 1. Logging in as Super Admin...");
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(superAdminCreds)
    });

    const loginData = await loginRes.json();
    if (!loginRes.ok) throw new Error(loginData.message);

    console.log("✅ Login Successful! Token received.");
    const token = loginData.token;

    // 2. Try to create a new user (The requested feature)
    const newUser = {
      name: "Generated User 1",
      email: `generated_${Date.now()}@test.com`,
      password: "NewUserPass123",
      role: "user"
    };

    console.log("🔹 2. Generating New User ID/Pass...");
    const createRes = await fetch(`${API_URL}/auth/create-user`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(newUser)
    });

    const createData = await createRes.json();
    if (!createRes.ok) throw new Error(createData.message);

    console.log("✅ User Created Successfully!");
    console.log("   ID:", createData.user.email);
    console.log("   Pass:", newUser.password);

  } catch (err) {
    console.error("❌ Test Failed:", err.message);
  }
}

testSuperAdmin();
