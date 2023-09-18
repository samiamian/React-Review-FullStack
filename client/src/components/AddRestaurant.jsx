import React, { useContext, useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import Toast from './Toast';
import { ToastContext } from '../context/ToastContext';
import {v4 as uuidv4} from "uuid" ;

const AddRestaurant = () => {
    const { state, dispatch } = useContext(ToastContext);
    const [position, setPosition] = useState("top-left");
    const { addRestaurant } = useContext(RestaurantsContext)
    const [name, setName]               = useState("");
    const [location, setLocation]       = useState("");
    const [priceRange, setPriceRange]   = useState("Price Range");

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
    const handleSubmit = async(e) => {
        e.preventDefault(); //prevent page reload, else loose state
        try{
            const response = await RestaurantFinder.post("/", {
                name: name,
                location: location,
                price_range: priceRange

            });
            addRestaurant(response.data.data.restaurant);
            handleToastMessage("SUCCESS");
            console.log(response);
        }catch(err){ handleToastMessage("DANGER"); console.log(err)}
    }
    return (
        <>
        <div className="mb-4">
            <form action="">
                <div className="row">
                    <div className="col">
                        <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" type="text" placeholder="name"/>
                    </div>
                    <div className="col">
                        <input value={location} onChange={(e) => setLocation(e.target.value)} className="form-control" type="text" placeholder="location"/>
                    </div>
                    <div className="col">
                        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="form-select">
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <div className="col">
                        <button onClick={handleSubmit} className="btn btn-primary">Add</button>
                    </div>
                </div>
            </form>
        </div>
        <Toast position={position} autoDeleteInterval={2000} />
        </>
    )
}

export default AddRestaurant

