import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAuthState } from '../redux/slices/authSlice.jsx'; // Importer l'action

import Home from "../pages/Home";
import Login from "../pages/Login";
import User from "../pages/User";

const PathRoute = () => {
    const dispatch = useDispatch();
    const isConnected = useSelector((state) => state.auth.isConnected);

    useEffect(() => {
        // Initialiser l'état de l'authentification au démarrage
        dispatch(initializeAuthState());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/sign-in"
                    element={isConnected ? <Navigate to="/user" /> : <Login />}
                />
                <Route
                    path="/user"
                    element={isConnected ? <User /> : <Navigate to="/sign-in" />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default PathRoute;
