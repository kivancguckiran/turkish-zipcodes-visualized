const xlsx = require('xlsx');
const fs = require('fs');


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const workbook = xlsx.readFile('2019_07_24.xlsx');
const rows = xlsx.utils.sheet_to_json(workbook.Sheets['Sayfa1']);
const locations = [];

rows.forEach(row => {
  if (!locations.some(loc => loc.pk === row.PK.trim())) {
    locations.push({
      mah: row.Mahalle.trim(),
      semt: row.semt_bucak_belde.trim(),
      ilce: row['ilçe'].trim(),
      il: row.il.trim(),
      pk: row.PK.trim(),
    });
  }
});

fs.writeFileSync('pk.json', JSON.stringify(locations));

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

(async () => {
  for (let i = 0; i < locations.length; i += 1) {
    const { semt, ilce, il, pk } = locations[i];
    const results = await geoCode(`${semt}, ${ilce}/${il}`);
    fs.writeFileSync(`pk/${pk}.json`, JSON.stringify(results));
    await sleep(250);

    process.stdout.write(`${parseInt((i / locations.length) * 100)}%\n`);
  }
})();
