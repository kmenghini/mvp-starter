import React from 'react';

const ListItem = ({restaurant}) => (
  <div>
    <a href={restaurant.url}>{restaurant.name}</a>
    <div>{restaurant.location_address}</div>
    <img src={restaurant.thumb}/>
  </div>
)

export default ListItem;