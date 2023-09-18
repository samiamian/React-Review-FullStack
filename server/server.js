require('dotenv').config()
const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express()

//Middleware Start
const morgan = require('morgan');
app.use(morgan("dev"))
app.use(cors())
app.use(express.json()) //attach json body to the request object
//Middleware End

//Get All Restaurants
app.get("/api/v1/restaurants",async (req,resp) =>{
    try{
       // const results = await db.query("SELECT * FROM mshops order by price_range desc");
        const shopRatingDetails = await db.query
        (
            "select * from mshops left join (select mshop_id, count(*), TRUNC(AVG(rating),2) as average_rating from reviews group by mshop_id ) reviews ON (mshops.id = reviews.mshop_id);"
        );
        //console.log(results.rows);
        console.log("shop data",shopRatingDetails);
        resp.status(200).json({
            status:"Success",
            results:shopRatingDetails.rows.length,
            data: {
                //restaurants: results.rows,
                restaurants: shopRatingDetails.rows
            },
        });
    }
    catch(err){console.log(err)}
});

//Get A Restaurant
app.get("/api/v1/restaurants/:id",async (req,resp) =>{
    try{
        const restaurants = await db.query
        (
            //"SELECT * FROM mshops where id = $1",[req.params.id]
            "select * from mshops left join (select mshop_id, count(*), TRUNC(AVG(rating),2) as average_rating from reviews group by mshop_id ) reviews ON (mshops.id = reviews.mshop_id) where mshops.id=$1",[req.params.id]
        )
        const reviews = await db.query("SELECT * FROM reviews where mshop_id = $1",[req.params.id])

        resp.status(200).json({
            status:"Success",
            data: {
                restaurant: restaurants.rows[0],
                reviews: reviews.rows
            },
        });
    }catch(err){console.log(err)}
});

//Create A Restaurant
app.post("/api/v1/restaurants", async (req,resp) =>{
    try{
        const results = await db.query("INSERT INTO mshops (name,location,price_range) values($1,$2,$3) returning *",[req.body.name,req.body.location,req.body.price_range])
        console.log(results.rows);
        resp.status(201).json({
            status:"Success",
            data: {
                restaurant: results.rows[0],
            },
        });
    }catch(err){console.log(err)}
});

//Update A Restaurant
app.put("/api/v1/restaurants/:id",async(req,resp) =>{
    try{
        const results = await db.query("UPDATE mshops SET name=$1, location=$2,price_range=$3 where id = $4 returning *",[req.body.name,req.body.location,req.body.price_range, req.params.id])
        console.log(req.params.id);
        console.log(req.body);
        resp.status(200).json({
            status:"Success",
            data: {
                restaurant:  results.rows[0],
            },
        });
    }catch(err){console.log(err)}
});


//Delete A Restaurant
app.delete("/api/v1/restaurants/:id",async(req,resp) =>{
    try{
        const results = await db.query("DELETE FROM mshops where id = $1",[req.params.id,]);
        resp.status(204).json({
            status:"Success",
        });
    } catch(err){
        console.log(err)
    }
});


//Create A Review
app.post("/api/v1/restaurants/:id/addReview", async (req,resp) =>{
    try{
        const newReview = await db.query("INSERT INTO reviews (name,review,rating,mshop_id) values($1,$2,$3,$4) returning *",[req.body.name,req.body.review,req.body.rating,req.params.id])
        console.log(newReview.rows);
        resp.status(201).json({
            status:"Success",
            data: {
                restaurant: newReview.rows[0],
            },
        });
    }catch(err){console.log(err)}
});


//get value from .env file and if that port is unavailable used 3001
const port = process.env.PORT || 3001;

app.listen(port,() => {
    console.log(`server is up and listening on port ${port}`)
})