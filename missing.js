const xlsx = require('xlsx');
const fs = require('fs');

const locations = fs.readdirSync('pk');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.googleAPIKey,
  Promise: Promise,
});

const geoCode = (address) => new Promise((resolve, reject) => {
  googleMapsClient.geocode({
    address,
  })
    .asPromise()
    .then((response) => resolve(response.json.results))
    .catch(err => reject(err));
});

const pkFile = JSON.parse(fs.readFileSync('pk.json'));

(async () => {
  for (let i = 0; i < locations.length; i++) {
    const data = fs.readFileSync(`pk/${locations[i]}`);
    const parsed = JSON.parse(data);
    if (!parsed[0]) {
      const missing = pkFile.find(loc => loc.pk === locations[i].split('.')[0]);
      const { mah, ilce, il, pk } = missing;
      const results = await geoCode(`${mah}, ${ilce}/${il}`);
      fs.writeFileSync(`pk/${pk}.json`, JSON.stringify(results));
      await sleep(250);
    }
  }
})();
