import React,{useState,createContext} from "react";
import {v4 as uuidv4} from "uuid" ;


export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = props => {
    const [restaurants,setRestaurants] = useState([]);
    const [selectedRestaurants, setSelectedRestaurants] = useState(null)
    const addRestaurant = (restaurant) => {
        setRestaurants([...restaurants, restaurant])
    };
    
    return(
        <RestaurantsContext.Provider value={{restaurants: restaurants, setRestaurants, addRestaurant, selectedRestaurants, setSelectedRestaurants}}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}