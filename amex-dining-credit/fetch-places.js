// run: `$ node --env-file=.env --experimental-fetch fetch-places.js
// the standard "Fetch" API is only available experimentally in Node, with the above flag we can make it available.
// handy command line infos: https://nodejs.org/en/learn/command-line/output-to-the-command-line-using-nodejs

const fs = require('node:fs');
const util = require('node:util');

/** @todo: this is the same function as in index.html — should be shared; until then: keep in sync manually  */
function amexMerchantsToPlaces(amexApiMerchants) {
    return amexApiMerchants.flatMap(amexMerchant => {
        if (amexMerchant.isMerchantGroup) {
            // this happens when there is a "merchantGroup";
            // like Gordon Ramsey etc. Those have a sub node in ".merchants"
            // that again look like the merchants on the first level.
            // We have to make a recursion here (yay), like:
            console.log("Merchant group!", amexMerchant.name);
            return amexMerchantsToPlaces(amexMerchant.merchants);
        }
        let assumedLocation =
            amexMerchant.googleMapsUrl.match(/@(?<lat>-?\d+(?:\.\d+)?),(?<lon>-?\d+(?:\.\d+)?)/)?.groups ?? null;
        if (assumedLocation?.lat) assumedLocation.lat = parseFloat(assumedLocation.lat);
        if (assumedLocation?.lon) assumedLocation.lon = parseFloat(assumedLocation.lon);
        return {
            "name": amexMerchant.name,
            "address": amexMerchant.address,
            "zip": amexMerchant.postcode,
            "city": amexMerchant.city.title,
            "amexId": amexMerchant.id,
            //"googlePlaceTextQuery": `${amexMerchant.name}, ${amexMerchant.address}, ${amexMerchant.postcode} ${amexMerchant.city.title}`,
            "assumedLocation": assumedLocation,
            "googleMapsUrl": amexMerchant.googleMapsUrl
            //"amexRaw": amexMerchant,
        }
    });
}

const placesPromises =
    ["DE"].map(async function(country) {
        console.info("Fetching country "+country);
        const amexApiMerchants = await (
            await fetch(
                `https://dining-offers-prod.amex.r53.tuimedia.com/api/country/${country}/merchants`))
            .json();
        return {country: country, places: amexMerchantsToPlaces(amexApiMerchants)};
    });

const places = {};

Promise.all(placesPromises).then(placesInCountries => {
    placesInCountries.forEach(placesPerCountry => {
        const { country, places: countryPlaces } = placesPerCountry;
        places[country] = countryPlaces;
    });
    fs.writeFile('./places.json', JSON.stringify(places, null, 2), error => error && console.error(error));
    console.info("All places written successfully.");
});
