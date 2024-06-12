export class Place {
    #name
    #address
    #zip
    #city
    #amexId
    #assumedLocation = null
    #googleMapsUrl
    #countryCode;

    constructor(name, address, zip, city, amexId, googleMapsUrl, countryCode) {
        this.#name = name
        this.#address = address
        this.#zip = zip
        this.#city = city
        this.#amexId = amexId
        this.#setGoogleMapsUrl(googleMapsUrl)
        this.#countryCode = countryCode
    }

    isInCountry(countryCode) {
        return this.#countryCode === countryCode
    }

    #setGoogleMapsUrl(googleMapsUrl) {
        if (!googleMapsUrl) {
            return;
        }
        this.#googleMapsUrl = googleMapsUrl

        this.#assumedLocation =
            googleMapsUrl
                .match(/@(?<lat>-?\d+(?:\.\d+)?),(?<lon>-?\d+(?:\.\d+)?)/)
                ?.groups ?? null;
        if (this.#assumedLocation?.lat) this.#assumedLocation.lat = parseFloat(this.#assumedLocation.lat);
        if (this.#assumedLocation?.lon) this.#assumedLocation.lon = parseFloat(this.#assumedLocation.lon);
    }

    toJson() {
        return {
            name: this.#name,
            address: this.#address,
            zip: this.#zip,
            city: this.#city,
            amexId: this.#amexId,
            assumedLocation: this.#assumedLocation,
            googleMapsUrl: this.#googleMapsUrl,
            countryCode: this.#countryCode,
        }
    }

    static fromAmexMerchantData(merchantData, countryCode) {
        return new Place(
            merchantData.name,
            merchantData.address,
            merchantData.postcode,
            merchantData.city.title,
            merchantData.id,
            merchantData.googleMapsUrl,
            countryCode
        );
    }
}
