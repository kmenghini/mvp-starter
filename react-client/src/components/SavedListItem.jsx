import React from 'react';

const ListItem = ({restaurant, removeRestaurant}) => (
  <div className="row list-item">
    <div className="col-6">
      <h4><a href={restaurant.url} target="_blank">{restaurant.name}</a></h4>
      <div>{restaurant.location_address}</div>
      <div>User Rating: {restaurant.user_rating}</div>
      <div>Cuisines: {restaurant.cuisines}</div>
    </div>
    <div className="col-2">
      <button onClick={() => removeRestaurant(restaurant)}>Remove from List</button>
    </div>
    <div className="col-4">
      {restaurant.thumb ? 
        <img src={restaurant.thumb} height="100" width="100"/> : null
      }
      <div><a href={restaurant.menu_url} target="_blank">Link to menu</a></div>
      <div><a href={restaurant.photos_url} target="_blank">Link to more photos</a></div>
    </div>
  </div>
)

export default ListItem;