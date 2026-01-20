
const API_URL = "http://127.0.0.1:5000/api";

async function testMarketplace() {
  try {
    console.log("Testing Marketplace API...");

    // 0. Test Inline
    console.log("Testing inline route...");
    const inlineRes = await fetch(`${API_URL}/test-inline`);
    if (inlineRes.ok) {
        console.log("✅ Inline route OK:", await inlineRes.json());
    } else {
        console.log("❌ Inline route Failed:", inlineRes.status);
    }
    
    // 1. Fetch Rent items
    console.log("Fetching Rent items...");
    const rentRes = await fetch(`${API_URL}/marketplace?type=Rent`);
    if (!rentRes.ok) {
        const text = await rentRes.text();
        throw new Error(`Failed to fetch rent items: ${rentRes.status} ${rentRes.statusText} - ${text}`);
    }
    const rentItems = await rentRes.json();
    console.log("Rent Items Count:", rentItems.length);
    console.log("Rent Items:", JSON.stringify(rentItems, null, 2));

    // 2. Fetch Buy items
    console.log("Fetching Buy items...");
    const buyRes = await fetch(`${API_URL}/marketplace?type=Buy`);
    if (!buyRes.ok) {
        const text = await buyRes.text();
        throw new Error(`Failed to fetch buy items: ${buyRes.status} ${buyRes.statusText} - ${text}`);
    }
    const buyItems = await buyRes.json();
    console.log("Buy Items Count:", buyItems.length);

  } catch (err) {
    console.error("❌ Test Failed:", err.message);
  }
}

testMarketplace();
