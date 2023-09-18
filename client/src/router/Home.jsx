import React from 'react'
import Header from '../components/Header'
import AddRestaurants from '../components/AddRestaurant'
import RestaurantList from '../components/RestaurantList'

const Home = () => {
  return (
    <div>
      <Header />
      <AddRestaurants />
      <RestaurantList />
    </div>
  )
}

export default Home
