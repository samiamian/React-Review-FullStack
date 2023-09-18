import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import Reviews from './Reviews';
import AddReview from './AddReview';
import StartRating from './StartRating';


const RestaurantDetail = (props) => {
const {id} = useParams();
const {selectedRestaurants, setSelectedRestaurants} = useContext(RestaurantsContext);
const renderRating = (restaurant) => {
  if (!restaurant.count){
      return (
          <span className='text-danger'>0 Reviews</span>
      )
  }
  return(
      <>
          <StartRating rating={restaurant.average_rating} />
          <span className='text-warning ml-2'>({restaurant.count})</span>
      </>
  )
}

useEffect(() => {
   const fetchData = async () => {
    try{
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurants(response.data.data);
        console.log(response);

    }catch(err){console.log(err)}
   };
   fetchData()
},[]);
  return (
    <div>
      {selectedRestaurants && (
        <>
          <h1 className='text-center display-1'>{selectedRestaurants.restaurant.name}</h1>
          <div className="text-center">
            {/* <StartRating rating={selectedRestaurants.restaurant.average_rating} /> */}
            {renderRating(selectedRestaurants.restaurant)}
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurants.reviews}/>
            <AddReview />
          </div>
        </>
      )}
    </div>
  )
}

export default RestaurantDetail
