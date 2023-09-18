import React, {useContext, useState,useEffect} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useNavigate  } from "react-router-dom";
import StartRating from './StartRating';
import Toast from './Toast';
import { ToastContext } from '../context/ToastContext';
import {v4 as uuidv4} from "uuid" ;

const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    const {state, dispatch} = useContext(ToastContext);
    const [position, setPosition] = useState("top-left");

    let history = useNavigate ()

    useEffect(() =>{
        async function fetchData() {
            try{
                const response = await RestaurantFinder.get("/");
                setRestaurants(response.data.data.restaurants)
                console.log(response);
             }catch(err){console.log(err)}
          }
          fetchData();
    },[]);

    const handleToastMessage = (type) => {
       // e.stopPropagation();
       // console.log(type)
        switch(type){
            case "SUCCESS":
                return dispatch({
                  type: "ADD_NOTIFICATION",
                  payload: {
                    id: uuidv4(),
                    type: "SUCCESS",
                    title: "Success",
                    message: "Operation Successfull.",
                  },
                });
            case "DANGER":
                return dispatch({
                    type: "ADD_NOTIFICATION",
                    payload: {
                        id: uuidv4(), 
                        type: "DANGER",
                        title: "Fail",
                        message: "Action Failed to complete!",
                    }
                });
                default:
                    return;
        }
    }
    const handleDelete = async (e,id) => {
        //handleToastMessage("SUCCESS")

        e.stopPropagation();
        try{
            const response = RestaurantFinder.delete(`/${id}`);
            console.log(response);
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }))
            handleToastMessage("SUCCESS")
        }catch(err){handleToastMessage("DANGER");console.log(err)}
    }

    const handleUpdate = async (e, id) => {
        e.stopPropagation();
        history(`restaurants/${id}/update`);
    }
    const handleRestSelect = (id) => {
        history(`/restaurants/${id}`)
    }

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
  return (

    <div className='list-group'>
      <table className="table table-hover table-striped">
        <thead>
            <tr className='table-success'>
                <th scope="col">Restaurant</th>
                <th scope="col">Location</th>
                <th scope="col">Price Range</th>
                <th scope="col">Rating</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
            {restaurants && restaurants.map(restaurant => {
                return(
                <tr onClick={() => handleRestSelect(restaurant.id)} key={restaurant.id}>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.location}</td>
                    <td>{"$".repeat(restaurant.price_range)}</td>
                    {/* <td className='text-warning'><StartRating rating={restaurant.average_rating}/></td> */}
                    <td>{renderRating(restaurant)}</td>
                    <td><button onClick = {(e) => handleUpdate(e,restaurant.id)} className="btn-warning">Update</button></td>
                    <td><button onClick = {(e) => handleDelete(e,restaurant.id)} className="btn-danger">Delete</button></td>
                </tr>
                )
            })}
        </tbody>
    </table>
    <Toast position={position} autoDeleteInterval={4000} />
    </div>
  )
}

export default RestaurantList
