import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.PEXELS_API_KEY;
console.log("API Key loaded:", API_KEY ? "✓" : "✗");

async function testAPI() {
  try {
    console.log("\nTesting Pexels API call...");
    console.log("Endpoint: https://api.pexels.com/videos/search");
    console.log("Query: nature, per_page: 2, page: 1");
    
    const response = await axios.get("https://api.pexels.com/videos/search", {
      headers: { 
        Authorization: API_KEY,
        "User-Agent": "Node.js Axios Client"
      },
      params: { query: "nature", per_page: 2, page: 1 },
      timeout: 10000
    });
    
    console.log("\n✓ Success! Response status:", response.status);
    console.log("Videos returned:", response.data.videos?.length || 0);
    
  } catch (err) {
    console.error("\n✗ Error calling Pexels API:");
    console.error("  Status:", err.response?.status);
    console.error("  Message:", err.message);
    console.error("  Data:", JSON.stringify(err.response?.data, null, 2));
    console.error("  Code:", err.code);
  }
}

testAPI();
