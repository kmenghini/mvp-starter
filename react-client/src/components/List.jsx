import React from 'react';
import ListItem from './ListItem.jsx';

const List = ({restaurants}) => (
  <div>
    <h4> List Component </h4>
    There are { restaurants.length } items.
    { restaurants.map(restaurant => <ListItem restaurant={restaurant}/>)}
  </div>
)

export default List;