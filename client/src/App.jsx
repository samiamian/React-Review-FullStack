import React from 'react';
import {BrowserRouter as Router, Routes ,Route} from "react-router-dom"
import UpdatePage from './router/UpdatePage';
import Home from './router/Home';
import RestaurantDetailPage from './router/RestaurantDetailPage';
import { RestaurantsContextProvider } from './context/RestaurantsContext';
import { ToastContextProvider } from './context/ToastContext';

import Toast from './components/Toast';

const App = () => {
    return (
            <RestaurantsContextProvider>
                {/* <ToastContextProvider> */}
                    {/* <Toast position="top-right" autoDeleteInterval={4000}/> */}
                    <div className='container'>
                        <Router>
                            <Routes>
                                <Route exact path = "/" Component={Home} />
                                <Route exact path = "/restaurants/:id/update" Component={UpdatePage} />
                                <Route exact path = "/restaurants/:id" Component={RestaurantDetailPage} />
                            </Routes>
                        </Router>
                    </div>
                {/* </ToastContextProvider> */}
            </RestaurantsContextProvider>
    )}

export default App;