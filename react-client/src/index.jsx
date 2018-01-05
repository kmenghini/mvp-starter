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
    this.getTopRestaurantsFromApi();
    this.getSavedRestaurantsFromDb();
  }
  
  //get request to api and set state for top restaurants
  getTopRestaurantsFromApi() {
    $.get('/topRestaurants', (data) => {
      this.setState({
        topRestaurants: data
      });
    })
  }

  //then get request from db for saved restaurants
  getSavedRestaurantsFromDb() {
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

  //when restaurant is saved, add to db
  addRestaurant(restaurantInput) {
    $.post('/savedRestaurants', {restaurant: restaurantInput}, () => {
      this.getSavedRestaurantsFromDb();
    });
  }

  render () {
    return (<div>
      <h1>Restaurant List</h1>
      <div className="row">
        <div className="col-6 list">
          <h3>Top Restaurants in SF</h3>
          <List restaurants={this.state.topRestaurants} addRestaurant={this.addRestaurant.bind(this)}/>
        </div>
        <div className="col-6 list">
          <h3>Your Saved Restaurants</h3>
          <List restaurants={this.state.savedRestaurants}/>
        </div>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));