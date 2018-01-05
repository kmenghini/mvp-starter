import React from 'react';
import ListItem from './ListItem.jsx';

const List = ({restaurants, addRestaurant}) => (
  <div>
    There are { restaurants.length } items.
    { restaurants.map(restaurant => <ListItem restaurant={restaurant} addRestaurant={addRestaurant}/>)}
  </div>
)

export default List;