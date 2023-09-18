import React from 'react'
import StartRating from './StartRating'

function Reviews({reviews}) {
  return (
    <div className="row row-cols-3 mb-2">
        {reviews.map((review) => {
            return(
                <div key={review.id} className="card text-white bg-primary mr-3 mb-3" style={{maxwidth:"30%"}}> 
                    <div className="card-header d-flex justify-content-between">
                        <span>{review.name}</span>
                        <span><StartRating rating={review.rating} /></span>
                    </div>
                    <div className='card-body'>
                        <p className="card-text">{review.review}</p>
                    </div>
                </div>
            );
        })}
    </div>
  );
};

export default Reviews
