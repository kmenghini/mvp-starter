var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurantFinder');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var restaurantSchema = mongoose.Schema({
  _id: Number,
  name: String,
  url: String,
  location_address: String,
  thumb: String,
  menu_url: String,
  user_rating: String,
  cuisines: String,
  photos_url: String
});

var Restaurant = mongoose.model('Restaurant', restaurantSchema);

var addRestaurant = function(restaurantObj) {
  console.log('in addRestaurant in db')
  var newRestaurant = Restaurant.create(restaurantObj);
  console.log(`restaurant ${restaurantObj.name} in db`);
}

var selectAll = function(callback) {
  console.log('in selectAll in db')
  Restaurant.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

//bug here**** (probably)
var removeRestaurant = function(restaurantObj, callback) {
  console.log('in removeRestaurant in db')
  console.log({'_id': parseInt(restaurantObj._id)})
  Restaurant.deleteOne({'_id': parseInt(restaurantObj._id)}, function(err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items)
    }
  });
  console.log(`restaurant ${restaurantObj.name} removed from db`);
}

module.exports.selectAll = selectAll;
module.exports.addRestaurant = addRestaurant;
module.exports.removeRestaurant = removeRestaurant;