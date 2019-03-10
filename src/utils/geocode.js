const request = require('request');

const getGeolocation = (address, callback) => {
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibmV6YWV0cyIsImEiOiJjanNzeWNwNzYwbDVqM3lwNHllaDFnZWlyIn0.3Qs73lpVujpTIbXqgwR2PA`;
  request({
    url: geocodeUrl,
    json: true
  }, (error, response) => {
    if (error) {
    } else if (!response.body) {
    console.log('No metching results');
  } else {
    const center = response.body.features[0].center;
    console.log(response.body.features[0]);
    callback(undefined, {
      altitude: center[0],
      longitude: center[1],
      location: ''
    })
  }
});
};

module.exports = getGeolocation;



