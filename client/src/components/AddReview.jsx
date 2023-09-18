import React, {  useState, useContext }  from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useParams } from 'react-router-dom';
import Toast from './Toast';
import { ToastContext } from '../context/ToastContext';
import {v4 as uuidv4} from "uuid" ;

function AddReview() {
    const { id } = useParams();
    const { state, dispatch } = useContext(ToastContext);
    const [position, setPosition] = useState("top-left");
    const [name, setName] = useState("");
    const [rating, setRating] = useState("Rating");
    const [reviewText, setReviewText] = useState("");
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
    const handleSubmitReview = async (e) =>{
        e.preventDefault()
        try{
            const response = await RestaurantFinder.post(`/${id}/addReview`,{
                name: name,
                review: reviewText,
                rating: rating
            });
        handleToastMessage("SUCCESS");
        await new Promise(resolve => setTimeout(resolve, 4000));

        window.location.reload();
        }catch(err){ handleToastMessage("DANGER");console.log(err)}
    }
  return (
    <>
    <div className='mb-2'>
        <form action="">
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="name" className='form-label'>Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} id="name" placeholder="name" type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="rating" className='form-label'>Rating</label>
                    <select value={rating} onChange={e => setRating(e.target.value)} id="rating" className='form-control'>
                        <option disabled>Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </div>
            <div className='form-group'>
                <label htmlFor="Review" >Review</label>
                <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} id="Review" className='form-control mb-2'></textarea>
            </div>
            <button onClick={handleSubmitReview} className='btn btn-primary'>Submit</button>
        </form>
    </div>
    <Toast position={position} autoDeleteInterval={3000} />

    </>
  )
}

export default AddReview
