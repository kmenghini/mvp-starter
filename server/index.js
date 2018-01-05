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
  // axios({
  //   method: 'get',
  //   url: ''
  // });
  
})

//post request to insert multiple restaurants into db
app.post('/savedRestaurants', function(req,res) {
  console.log('in post request in server...')
  var newRestaurants = req.body.restaurants;
  //for each restaurant, format and then add to db
  newRestaurants.forEach(newRestaurant => {
    var formattedRestaurant = {
      _id: parseInt(newRestaurant.restaurant.R.res_id),
      name: newRestaurant.restaurant.name,
      url: newRestaurant.restaurant.url,
      location_address: newRestaurant.restaurant.location.address,
      thumb: newRestaurant.restaurant.thumb,
      menu_url: newRestaurant.restaurant.menu_url,
      user_rating: newRestaurant.restaurant.user_rating.aggregate_rating,
      cuisines: newRestaurant.restaurant.cuisines,
      photos_url: newRestaurant.restaurant.photos_url
    }
    db.addRestaurant(formattedRestaurant);
  })
  res.sendStatus(200);
})


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

