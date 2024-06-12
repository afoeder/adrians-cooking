// run: `$ node --env-file=.env --experimental-fetch cache-merchants.js
// the standard "Fetch" API is only available experimentally in Node, with the above flag we can make it available.
// handy command line infos: https://nodejs.org/en/learn/command-line/output-to-the-command-line-using-nodejs

const fs = require('node:fs');

const merchantsPromise =
    ["AU", "HK", "JP", "NZ", "SG", "TW", "TH", "AT", "BE", "FI",
     "FR", "DE", "IT", "NL", "ES", "SE", "GB", "CA", "MX", "US"].map(async function(country) {
        console.info("Fetching country "+country);
        const amexApiMerchants = await (
            await fetch(
                `https://dining-offers-prod.amex.r53.tuimedia.com/api/country/${country}/merchants`))
            .json();
        return {country: country, merchants: amexApiMerchants};
    });

const merchants = require("./amex-merchants.json");

Promise.all(merchantsPromise).then(merchantsInCountries => {
    merchantsInCountries.forEach(merchantsPerCountry => {
        const { country, merchants: countryMerchants } = merchantsPerCountry;
        merchants[country] = countryMerchants;
    });
    fs.writeFile('./amex-merchants.json', JSON.stringify(merchants, null, 2), error => error && console.error(error));
    console.info("All merchants written successfully.");
});
