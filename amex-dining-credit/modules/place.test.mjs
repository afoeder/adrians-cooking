import { jest } from '@jest/globals';

import {Place} from "./place.mjs";

const dummyMerchantData = {
    "id": "abcde",
    "name": "Some Place",
    "address": "An Address",
    "postcode": "P05TC0D3",
    "city": {
        "title": "Le City",
    },
    "googleMapsUrl": "https://Some.url/@48.7292928,9.1204729,foo",
};

test('Place can be instantiated from Amex data', () => {
    const place =
        Place.fromAmexMerchantData(dummyMerchantData, "DE");
    expect(place).toBeInstanceOf(Place);
});

test('Is in country works correctly', () => {
    const countryCode = "DE";
    const place =
        Place.fromAmexMerchantData(dummyMerchantData, countryCode);
    expect(place.isInCountry(countryCode)).toBeTruthy();
    expect(place.isInCountry("whatever")).toBeFalsy();
})

test('JSON is correctly rendered', () => {
    const place =
        Place.fromAmexMerchantData(dummyMerchantData, "DE");
    expect(place.toJson()).toEqual({
        name: "Some Place",
        address: "An Address",
        zip: "P05TC0D3",
        city: "Le City",
        amexId: "abcde",
        location: {lat: 48.7292928, lon: 9.1204729, type: "assumed" },
        googleMapsUrl: "https://Some.url/@48.7292928,9.1204729,foo",
        countryCode: "DE"
    })
});

class MockGeocoder {
    static todoFindLocation = jest.fn(() => {return {lat: 42, lon: 42}})
}

test('Place abstains from geocoding when location is present', () => {
    const place =
        Place.fromAmexMerchantData(dummyMerchantData, "DE");
    place.geocode(MockGeocoder);
    expect(MockGeocoder.todoFindLocation).toHaveBeenCalledTimes(0);
    expect(place.toJson()).toMatchObject({ location: {lat: 48.7292928, lon: 9.1204729, type:"assumed"} })
});

test('Place does geocoding when no assumed location is present (from google url)', () => {
    const dummyMerchantDataWithoutLocationHint = dummyMerchantData;
    delete dummyMerchantDataWithoutLocationHint.googleMapsUrl;

    const place =
        Place.fromAmexMerchantData(dummyMerchantDataWithoutLocationHint, "DE");
    place.geocode(MockGeocoder);
    expect(MockGeocoder.todoFindLocation).toHaveBeenCalledTimes(1);
    expect(place.toJson()).toMatchObject({ location: {lat: 42, lon: 42, type:"geocoded"} })
});
