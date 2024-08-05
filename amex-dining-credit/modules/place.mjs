export class Place {
    #name
    #address
    #zip
    #city
    #amexId
    #location = null
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

    /**
     *
     * @param {GooglePlacesGeocoder|MockGeocoder} geocoder
     */
    geocode(geocoder) {
        if (this.#location) return;

        const result = geocoder.todoFindLocation()
        this.#location = { lat: result.lat, lon: result.lon, type:"geocoded" }
    }

    #setGoogleMapsUrl(googleMapsUrl) {
        if (!googleMapsUrl) {
            return;
        }
        this.#googleMapsUrl = googleMapsUrl

        this.#location =
            googleMapsUrl
                .match(/@(?<lat>-?\d+(?:\.\d+)?),(?<lon>-?\d+(?:\.\d+)?)/)
                ?.groups ?? null;
        if (this.#location) {
            this.#location.type = "assumed";
            this.#location.lat = parseFloat(this.#location.lat);
            this.#location.lon = parseFloat(this.#location.lon);
        }
    }

    toJson() {
        return {
            name: this.#name,
            address: this.#address,
            zip: this.#zip,
            city: this.#city,
            amexId: this.#amexId,
            location: this.#location,
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
