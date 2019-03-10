const request = require('request');

const getForecast = (altitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/7942f441e3b3c6ffdb4e48bc0f628505/${altitude},${longitude}?units=si&lang=uk`;

  request({
    url,
    json: true
  }, (error, response) => {
    console.log(error);
  console.log(response);
    if (error) {
      callback('Can\'t access Api', undefined);
    } else if (response.body.error) {
    callback(response.body.error);
  } else {
      console.log(response);
    const currently = response.body.currently;
    const summary = response.body.daily.summary;
    callback(undefined, {
      summary,
      temperature: currently.temperature,
      precipProbability: currently.precipProbability});
  }
});
}

module.exports = getForecast;



