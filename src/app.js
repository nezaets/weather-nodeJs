const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');


const express = require('express');
const staticPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '/templates/views');
const partialsPath = path.join(__dirname, 'templates/partials');
const app = express();

app.use(express.static(staticPath));

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'olena'
  });
});

app.get('/about', (req, res) => {
    res.render('about', {
    title: 'About',
    name: 'olena'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: "This is help page. I'm hope it will be helpful",
    name: 'olena'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "address term should be passed"
    })
  }

  geocode(address, (error, {altitude, longitude}) => {
    if (error) {
      return res.send("error");
    }

    forecast(altitude, longitude, (error, r) => {
      if (error) {
        return res.send("error");
      }
      res.send(r);
    })
  });


});

app.get('/help/*', (req, res) => {
    res.render('404', {
      title: 'Help',
      message: "Help article is not found",
      name: 'olena'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Help',
    message: "404",
    name: 'olena'
  });
});


app.listen(3000, () => {console.log('start listening')});