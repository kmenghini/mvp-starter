import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

import sampleData from '../../example-restaurant-data.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      topRestaurants: [],
      savedRestaurants: []
    }
  }

  componentDidMount() {
    this.addRestaurants(sampleData.exampleRestaurantDataLong);
    //get request to api
    //set state for top restaurants
    $.get('/topRestaurants', function(err, data) {
      console.log('get top restaurants', err, data);
    })

    //then get request from db for saved restaurants
    $.ajax({
      url: '/savedRestaurants', 
      success: (data) => {
        this.setState({
          savedRestaurants: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  addRestaurants(restaurantsArr) {
    console.log('in addRestaurants')
    $.post('/savedRestaurants', {restaurants: restaurantsArr}, function(err, data) {
      console.log('post complete',err, data);
    });
  }

  render () {
    return (<div>
      <h1>Item List</h1>
      <List restaurants={this.state.savedRestaurants}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));