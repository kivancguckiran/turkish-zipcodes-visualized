const fs = require('fs');

const locations = fs.readdirSync('pk');
const geometry = [];

for (let i = 0; i < locations.length; i++) {
  const data = fs.readFileSync(`pk/${locations[i]}`);
  const parsed = JSON.parse(data);
  geometry.push({
    pk: locations[i].split('.')[0],
    ...parsed[0].geometry.location,
  });
}

const stringified = JSON.stringify(geometry);

fs.writeFileSync('locations.json', stringified);
