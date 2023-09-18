import axios from "axios";


//NODE_ENVV

const baseURL = process.env.NODE_ENV === "production" 
? "api/v1/restaurants" 
: "http://localhost:3005/api/v1/restaurants"

export default axios.create({
    baseURL: baseURL,
})