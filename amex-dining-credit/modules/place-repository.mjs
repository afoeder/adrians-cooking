import {Place} from "./place.mjs";

export class PlaceRepository {

    /**
     *
     * @type {Array<Place>}
     */
    #places = []

    constructor(places) {
        this.#places = places
    }

    /**
     * @returns {Array<Place>}
     */
    findAll() {
        return this.#places;
    }

    findByCountry(countryCode) {
        return this.#places.filter(place => place.isInCountry(countryCode));
    }

    static fromAmexCountriesMerchantsData(countriesMerchantsData) {
        const places = [];
        Object.entries(countriesMerchantsData).forEach(countryMerchantsData => {
            const [countryCode, merchantsData] = countryMerchantsData;

            places.push(...this.fromAmexMerchantsData(merchantsData, countryCode));
        });
        return new PlaceRepository(places);
    }

    static fromAmexMerchantsData(merchantsData, countryCode) {
        return merchantsData.flatMap(merchantData => {
            if (merchantData.isMerchantGroup) {
                // this happens when there is a "merchantGroup";
                // like Gordon Ramsey etc. Those have a sub node in ".merchants"
                // that again look like the merchants on the first level.
                // We have to make a recursion here (yay), like:
                console.log("Merchant group!", merchantData.name);
                return this.fromAmexMerchantsData(merchantData.merchants, countryCode);
            }
            return Place.fromAmexMerchantData(merchantData, countryCode);
        });
    }
}
