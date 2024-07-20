import './App.css';
import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import User from './screens/User';
import DeliveryPartner from './screens/DeliveryPartner';

import { getLoggedInUser } from './utilities';
import Loading from './components/Loader';
import LandingPage from './screens/landingpage';

const PublicRoutes = function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

const PrivateRoutes = function (props) {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage {...props} />} />
            <Route path="/home" element={<Home {...props} />} />
            <Route path="/user" element={<User {...props} />} />
            <Route path="/delivery-partner" element={<DeliveryPartner {...props} />} />
          </Routes>
        </BrowserRouter>
      )
}

export default function Router() {
    const [isAuthenticated, setAuthenticate] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [loggedInUser, setLoggedInUser] = useState({});

    const validateAuth = async () => {
        try {
            const user = await getLoggedInUser();
            if (user) {
                setAuthenticate(true);
                setLoggedInUser(user);
            }
        } catch (e) {}

        setLoading(false);
    }

    useEffect(() => {
        validateAuth();
  
    }, [isAuthenticated]);

    if (isLoading) return <Loading />;

    return isAuthenticated ? <PrivateRoutes user={loggedInUser} /> : <PublicRoutes   />
}