import {PlaceRepository} from "./place-repository.mjs";

const merchantGroupData = {"EN": [{
        "id": "foo-bar-baz-4242-844221",
        "name": "Some Merchant Group",
        "address": null,
        "postcode": null,
        "businessData": {
            "isHalal": false,
            "isInHotel": false,
            "isNew": false
        },
        "onlineOnly": false,
        "translations": {
            "en": {
                "name": "Some Merchant Group"
            }
        },
        "city": null,
        "cuisine": null,
        "isMerchantGroup": true,
        "merchants": [
            {
                "id": "aa-bb-cc-dd",
                "name": "Le Name",
                "address": "Le Address",
                "postcode": "L3 P05tc0d3",
                "businessData": {
                    "website": "https://example.org/le-name",
                    "phone": "0555 888",
                    "isNew": false,
                    "isHalal": false,
                    "isInHotel": false,
                    "additionalComments": "",
                    "resyEnabled": false,
                    "resyApiKey": "",
                    "resyVenueId": ""
                },
                "onlineOnly": false,
                "translations": {
                    "en": {
                        "name": "The Name",
                        "address": "The Address",
                        "postcode": "P05tc0d3"
                    }
                },
                "city": {
                    "id": "aa-88-33-cc",
                    "title": "Fancytown",
                    "translations": {
                        "en": {
                            "title": "Fancytown"
                        },
                        "zh_tw": {
                            "title": "Haiyaaa"
                        }
                    }
                },
                "cuisine": {
                    "id": "9933-22",
                    "title": "Lecker Schmecker",
                    "translations": {
                        "en": {
                            "title": "Yum & Nom"
                        },
                        "zh_tw": {
                            "title": "Fuiyoooo"
                        }
                    }
                },
                "isMerchantGroup": false,
                "merchants": [],
                "showMerchant": true,
                "allMerchantsNew": true,
                "googleMapsUrl": "https://www.example.org/location",
                "takeoutAvailable": null,
                "openingSoon": false,
                "isInMerchantGroup": true,
                "isHalal": false
            }
        ],
        "showMerchant": true,
        "allMerchantsNew": false,
        "googleMapsUrl": null,
        "takeoutAvailable": null,
        "openingSoon": false,
        "isInMerchantGroup": false,
        "isHalal": false
    }]};

test('PlaceRepository can be instantiated from Amex country merchant data with merchant groups', () => {
    const placeRepository =
        PlaceRepository.fromAmexCountriesMerchantsData(merchantGroupData);
    expect(placeRepository.findAll()).toHaveLength(1);
});

test('PlaceRepository findByCountry finds by correct country', () => {
    const placeRepository =
        PlaceRepository.fromAmexCountriesMerchantsData(merchantGroupData);
    expect(placeRepository.findByCountry("EN")).toHaveLength(1);
    expect(placeRepository.findByCountry("XY")).toHaveLength(0);
});
