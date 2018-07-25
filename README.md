# Bestmile API Example Web App

## Setup
To run this project, you need a [Bestmile API key](https://bestmile.com/forms/form-developer-api-request/) as well as a [Google Maps API key](https://developers.google.com/maps/documentation/geocoding/get-api-key) with access to the Geocoding API

Then, create a config folder inside src/bestmile, and a file "config.js" inside the folder.  config.js should be in the following form:

    export const baseURL = "https://api.partner.gce1.bestmile.io",
      userID = "USER_ID",
      iOS_userID = "iOS_USER_ID",
      android_userID = "ANDROID_USER_ID",
      siteID = "SITE_ID",
      apiKey = "BESTMILE-API-KEY",
      domainID = DOMAIN_ID,
      mapsURL = "https://maps.googleapis.com/maps/api/geocode/json?",
      mapsAPIKey = "GOOGLE-MAPS-API-KEY";
