import React from 'react';
import TopListItem from './TopListItem.jsx';

const List = ({restaurants, addRestaurant}) => (
  <div>
    There are { restaurants.length } items.
    { restaurants.map(restaurant => <TopListItem restaurant={restaurant} addRestaurant={addRestaurant}/>)}
  </div>
)

export default List;