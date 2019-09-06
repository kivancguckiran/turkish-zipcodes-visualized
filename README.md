# Turkish ZipCodes Visualized

Refer to [https://kivancguckiran.github.io/turkish-zipcodes-visualized/](https://kivancguckiran.github.io/turkish-zipcodes-visualized/).

ZipCodes of Turkey: [http://postakodu.ptt.gov.tr/](http://postakodu.ptt.gov.tr/)
Click "Posta Kodu Özet Tablosu" at the middle-center of the page.

## Install dependencies

``` 
yarn install
```

## Dissecting workbook and Geocoding

You need to get API Key with active GeoCoding API from Google and set environment variable `googleAPIKey` first. GeoCoding is done by requesting address information as `town, district/city`.

```
node index.js
```

## Merkezköyler

Excel sheets contains some town information as Merkezköyler (center villages), so GeoCoding was missing some post codes. To fix this, I've used village information and encoded address as `neighborhood, district/city`.

```
node missing.js
```

## Getting everything together

After getting every post codes, we need to generate a total `locations.json`.

```
node location.js
```

## Locations.json

This file contains zipcodes with latitude and longitude values.
