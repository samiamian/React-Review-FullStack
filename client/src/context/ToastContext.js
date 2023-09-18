import React, {createContext, useDeferredValue, useReducer} from "react";
import { v4 as uuidv4 } from "uuid";

export const ToastContext = createContext()

export const ToastContextProvider = props => {
    const notifications = [
    // {
    //     id: uuidv4(), 
    //     type: "SUCCESS",
    //     title: "Succesfully fetched data",
    //     message: "Succesfully retrieved all posts"
    // },
    // {
    //     id: uuidv4(), 
    //     type: "DANGER",
    //     title: "Error",
    //     message: "Transaction Failed"
    // },
];
const [state, dispatch] = useReducer((state,action) =>{
    switch(action.type){
        case "ADD_NOTIFICATION":
            return [...state, action.payload];
        case "DELETE_NOTIFICATION":
            return state.filter((notifications) => notifications.id !== action.payload);
        default:
            return state;
    }

}, notifications)

return (
    <ToastContext.Provider value={{state,dispatch}}>
        {props.children}
    </ToastContext.Provider>
)
};


