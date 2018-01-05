import React from 'react';
import SavedListItem from './SavedListItem.jsx';

const List = ({restaurants, removeRestaurant}) => (
  <div>
    { restaurants.map(restaurant => <SavedListItem restaurant={restaurant} removeRestaurant={removeRestaurant}/>)}
  </div>
)

export default List;