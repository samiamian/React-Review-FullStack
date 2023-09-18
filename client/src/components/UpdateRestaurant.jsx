import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useNavigate  } from "react-router-dom";
import Toasts from './Toast';
import { ToastContext } from '../context/ToastContext';
import { v4 as uuidv4 } from "uuid";

const UpdateRestaurant = (props) => {
  let history = useNavigate();
  const { state, dispatch } = useContext(ToastContext);
  const [position, setPosition] = useState("top-left");

   const {id}                       = useParams();
   const [name,setName]             = useState("");
   const [location,setLocation]     = useState("");
   const [priceRange,setPriceRange] = useState("");

   useEffect(() => {
    const fetchData = async() => {
        const response = await RestaurantFinder.get(`/${id}`);
        setName(response.data.data.restaurant.name);
        setLocation(response.data.data.restaurant.location);
        setPriceRange(response.data.data.restaurant.price_range);
    };
    fetchData();
   },[]);
  
   const toastMessage = (type) => {
    console.log(type)
    switch(type){
        case "SUCCESS":
          console.log("Here")
            return dispatch({
              type: "ADD_NOTIFICATION",
              payload: {
                id: uuidv4(),
                type: "SUCCESS",
                title: "Success",
                message: "Successfully Updated.",
              },
            });
        case "DANGER":
            return dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: uuidv4(), 
                    type: "DANGER",
                    title: "Fail",
                    message: "Update Failure",
                }
            });
            default:
                return;
    }
   }
   const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const updateRest = await RestaurantFinder.put(`/${id}`,{
          name: name,
          location: location,
          price_range: priceRange
      });
      toastMessage("SUCCESS");
    }catch(err){toastMessage("DANGER");}
    await new Promise(resolve => setTimeout(resolve, 5000));
    history("/");
   }
  return (
    <>
      <div>
        <form action="">
          <div className="form-group">
              <label htmlFor='name'>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} id="name" className="form-control" type="text"/>
          </div>
          <div className="form-group">
              <label htmlFor='location'>location</label>
              <input value={location} onChange={(e) => setLocation(e.target.value)} id="location" className="form-control" type="text"/>
          </div>
          <div className="form-group">
              <label htmlFor='price_range'>Price Range</label>
              <input value={priceRange} onChange={(e) => setPriceRange(e.target.value)} id="price_range" className="form-control" type="number"/>
          </div>
          <td><button type="submit" onClick={handleSubmit} className="btn btn-primary mt-2">Submit</button></td>
        </form>
      </div>
      <Toasts position={position} autoDeleteInterval={3000} />
    </>

  )
}

export default UpdateRestaurant
