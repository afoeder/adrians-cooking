# AMEX dining credit map

This is a tiny helper to display the participating restaurants of the AMEX dining credit on a map.

`cache-merchants.js` will call the AMEX API and save its immediate result in `amex-merchants.json`, clustered by the
country code. `amex-merchants.json` is deliberately not in version control.

`augment-locations.js` will walk through places.json, query the Google Places API for places that are not there,
and augment it.
