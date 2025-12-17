import https from "https";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.PEXELS_API_KEY;
console.log("API Key loaded:", API_KEY ? "✓" : "✗");

function testAPI() {
  const url = "https://api.pexels.com/videos/search?query=nature&per_page=2&page=1";
  
  const options = {
    method: "GET",
    headers: {
      "Authorization": API_KEY,
      "User-Agent": "Node.js Client"
    },
    timeout: 15000
  };

  console.log("\nTesting Pexels API with native https...");
  
  const req = https.request(url, options, (res) => {
    console.log("✓ Connected! Status:", res.statusCode);
    
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    
    res.on("end", () => {
      try {
        const json = JSON.parse(data);
        console.log("Videos returned:", json.videos?.length || 0);
      } catch (e) {
        console.log("Response length:", data.length, "bytes");
      }
    });
  });

  req.on("error", (err) => {
    console.error("✗ Error:", err.code, err.message);
  });

  req.on("timeout", () => {
    console.error("✗ Request timed out");
    req.destroy();
  });

  req.end();
}

testAPI();
