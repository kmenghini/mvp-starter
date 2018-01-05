import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SavedList from './components/SavedList.jsx';
import TopList from './components/TopList.jsx';

import sampleData from '../../example-restaurant-data.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      topRestaurants: [],
      savedRestaurants: [],
      listType: ''
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

  removeRestaurant(restaurantInput) {
    $.post('/removeRestaurant', {restaurant: restaurantInput}, () => {
      this.getSavedRestaurantsFromDb();
    });
  }

  //when button is clicked, use value of select element and make call to /search api
  handleClick() {
    var searchCuisine = $("#select-cuisine").val();
    var cuisineName = $("option[value=" + searchCuisine + "]").text();
    this.setState({
      listType: cuisineName + ' '
    })
    $.post('/cuisine', {cuisine: searchCuisine}, (data) => {
      this.setState({
        topRestaurants: data
      });
    });
  }

  render () {
    return (<div>
      <h1>Restaurant List</h1>
      <h5>Search by cuisine:  
        <select id="select-cuisine">  
          <option value="1">American</option>
          <option value="5">Bakery</option> 
          <option value="25">Chinese</option> 
          <option value="40">Fast Food</option> 
          <option value="233">Ice Cream</option> 
          <option value="148">Indian</option> 
          <option value="55">Italian</option> 
          <option value="60">Japanese</option> 
          <option value="67">Korean</option> 
          <option value="70">Mediterranean</option> 
          <option value="73">Mexican</option> 
          <option value="82">Pizza</option> 
          <option value="304">Sandwich</option> 
          <option value="83">Seafood</option> 
          <option value="141">Steak</option> 
          <option value="179">Tapas</option> 
          <option value="95">Thai</option> 
          <option value="308">Vegetarian</option>         
        </select>
        <button className="search" onClick={this.handleClick.bind(this)}>Go</button>
      </h5>        
      <div className="row">
        <div className="col-6 list">
          <h3>Top {this.state.listType}Restaurants in SF</h3>
          <TopList restaurants={this.state.topRestaurants} addRestaurant={this.addRestaurant.bind(this)}/>
        </div>
        <div className="col-6 list">
          <h3>Your Saved Restaurants</h3>
          <SavedList restaurants={this.state.savedRestaurants} removeRestaurant={this.removeRestaurant.bind(this)}/>
        </div>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));