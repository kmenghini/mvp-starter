var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mongo');
var axios = require('axios');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(__dirname + '/../react-client/dist'));

//use this get request to get the saved list in db
app.get('/savedRestaurants', function (req, res) {
  console.log('in saved get request in server...')
  db.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

//use this get request to to api call for best-rated from api
app.get('/topRestaurants', function(req,res) {
  console.log('in top get request in server...')
  axios({
    method:'get',
    url:'https://developers.zomato.com/api/v2.1/location_details?entity_id=306&entity_type=city',
    headers: {
      'user-key': '9d4ae3b783fa965ed172f7aa74d97a7c'
    }
  })
  .then(function(response) {
    var restaurants = response.data.best_rated_restaurant;
    var formattedRestaurants = restaurants.map(topRestaurant => {
      return({
        _id: parseInt(topRestaurant.restaurant.R.res_id),
        name: topRestaurant.restaurant.name,
        url: topRestaurant.restaurant.url,
        location_address: topRestaurant.restaurant.location.address,
        thumb: topRestaurant.restaurant.thumb,
        menu_url: topRestaurant.restaurant.menu_url,
        user_rating: topRestaurant.restaurant.user_rating.aggregate_rating,
        cuisines: topRestaurant.restaurant.cuisines,
        photos_url: topRestaurant.restaurant.photos_url
      })
    })
    res.json(formattedRestaurants);
  })
  .catch(function(error) {
    console.log('error in api request', error);
  })
})

//post request to a restaurant into db
app.post('/savedRestaurants', function(req,res) {
  console.log('in post request in server...')
  db.addRestaurant(req.body.restaurant);
  res.sendStatus(200);
})


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

