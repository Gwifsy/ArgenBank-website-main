import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from "../pages/Home";
import Login from "../pages/Login";
import User from "../pages/User";

const PathRoute = () => {
    const isConnected = useSelector((state) => state.auth.isConnected);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/user" element={isConnected ? <User /> : <Navigate to="/sign-in" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default PathRoute;
