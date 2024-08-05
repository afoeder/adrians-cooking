// run: `$ node --env-file=.env --experimental-fetch build-places-data.mjs
// the standard "Fetch" API is only available experimentally in Node, with the above flag we can make it available.
// handy command line infos: https://nodejs.org/en/learn/command-line/output-to-the-command-line-using-nodejs

import {PlaceRepository} from "./modules/place-repository.mjs";
import {GooglePlacesGeocoder} from "./modules/google-places-geocoder.mjs";

import merchantsData from "./amex-merchants.json" with { type: "json" };
import fs from "node:fs";

const placeRepository =
    PlaceRepository.fromAmexCountriesMerchantsData(merchantsData);

fs.writeFile(
    './places.json',
    JSON.stringify(
        placeRepository
            .findAll()
            .map(place => {
                place.geocode(GooglePlacesGeocoder);
                return place.toJson();
            }),
        null,
        2),
    error => error && console.error(error));
console.info("All places written.");
