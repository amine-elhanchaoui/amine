import axios from 'axios';
import https from 'https';
import dns from 'dns';
import dotenv from 'dotenv';

dotenv.config();
const API_KEY = process.env.PEXELS_API_KEY;

const httpsAgent = new https.Agent({
  keepAlive: true,
  lookup: (hostname, options, callback) => {
    console.log('test-agent lookup called', hostname, options);

    dns.lookup(hostname, { family: 4, all: false }, (err4, addr4, fam4) => {
      console.log('dns.lookup ipv4 result', { err: err4 && err4.code, addr4, fam4 });
      if (!err4 && addr4) {
        console.log('lookup: returning ipv4', addr4, fam4);
        if (options && options.all) return callback(null, [{ address: addr4, family: fam4 }]);
        return callback(null, addr4, fam4);
      }

      dns.resolve4(hostname, (errR, addresses) => {
        console.log('dns.resolve4 result', { errR: errR && errR.code, addresses });
        if (!errR && addresses && addresses.length) {
          console.log('lookup: returning resolve4 first address', addresses[0]);
          if (options && options.all) return callback(null, addresses.map(a => ({ address: a, family: 4 })));
          return callback(null, addresses[0], 4);
        }

        dns.lookup(hostname, options, (err2, address2, family2) => {
            if (Array.isArray(address2) && address2.length) {
              console.log('lookup: fallback returning first of array', address2[0]);
              if (options && options.all) return callback(null, address2.map(a => ({ address: a, family: family2 || 4 })));
              return callback(null, address2[0], family2 || 4);
            }
            console.log('lookup: final fallback callback', { err2: err2 && err2.code, address2, family2 });
            callback(err2, address2, family2);
        });
      });
    });
  }
});

(async () => {
  try {
    console.log('Calling Pexels with custom agent...');
    const res = await axios.get('https://api.pexels.com/videos/search', {
      headers: { Authorization: API_KEY },
      params: { query: 'nature', per_page: 2, page: 1 },
      timeout: 40000,
      httpsAgent
    });
    console.log('Success status', res.status);
    console.log('Data keys', Object.keys(res.data));
  } catch (err) {
    console.error('Agent test error:', err.message);
    console.error('Full error:', err);
  }
})();