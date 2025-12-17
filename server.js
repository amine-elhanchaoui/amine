// server.js
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import https from "https";
import dns from "dns";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/videos", async (req, res) => {
  try {
    const { query, per_page = 15, page = 1 } = req.query;

    const apiKey = process.env.PEXELS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "PEXELS_API_KEY missing" });
    }

    // Prefer IPv4 for upstream requests to avoid flaky IPv6 paths
    const httpsAgent = new https.Agent({
      keepAlive: true,
      lookup: (hostname, options, callback) => {
        // debug: log lookup call
        console.log('dns.lookup called for', hostname, 'options:', options);

        // Try dns.lookup with IPv4 first (all: false)
        dns.lookup(hostname, { family: 4, all: false }, (err4, addr4, fam4) => {
          console.log('dns.lookup ipv4 result for', hostname, { err: err4 && err4.code, addr4, fam4 });
          if (!err4 && addr4) {
            // If caller requested all addresses, return array of address objects
            if (options && options.all) return callback(null, [{ address: addr4, family: fam4 }]);
            return callback(null, addr4, fam4);
          }

          // Fallback: try dns.resolve4 to explicitly get IPv4 addresses
          dns.resolve4(hostname, (errR, addresses) => {
            console.log('dns.resolve4 result for', hostname, { errR: errR && errR.code, addresses });
            if (!errR && addresses && addresses.length) {
              if (options && options.all) return callback(null, addresses.map(a => ({ address: a, family: 4 })));
              return callback(null, addresses[0], 4);
            }

            // Last fallback: use system dns.lookup with provided options
            dns.lookup(hostname, options, (err2, address2, family2) => {
              // If address2 is an array (all: true), pick first entry
              if (Array.isArray(address2) && address2.length) {
                if (options && options.all) return callback(null, address2.map(a => ({ address: a, family: family2 || 4 })));
                return callback(null, address2[0], family2 || 4);
              }
              callback(err2, address2, family2);
            });
          });
        });
      },
    });

    const response = await axios.get("https://api.pexels.com/videos/search", {
      headers: { Authorization: apiKey },
      params: {
        query: query || "nature",
        per_page: Math.min(Number(per_page), 80),
        page: Math.max(Number(page), 1),
      },
      timeout: 40000,
      httpsAgent,
    });

    return res.json(response.data);
  } catch (err) {
    console.error("Pexels error:", err.response?.status, err.message, err.code);

    if (err.code === "ETIMEDOUT" || err.code === "ECONNABORTED") {
      return res.status(504).json({ error: "Pexels API timed out" });
    }

    if (err.response && err.response.status) {
      return res.status(err.response.status).json(err.response.data || { error: "Upstream error" });
    }

    return res.status(500).json({ error: "Failed to fetch videos" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  if (process.env.PEXELS_API_KEY) {
    console.log("✅ PEXELS_API_KEY configured");
  } else {
    console.warn("⚠️  PEXELS_API_KEY not found - using mock data");
  }
});
