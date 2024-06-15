import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../redux/slices/userSlice.jsx';
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import UserAccount from "../components/UserAccount";

const User = () => {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            dispatch(fetchUserProfile(token));
        }
    }, [dispatch, token]);

    return (
        <>
            <Nav />
            <UserAccount />
            <Footer />
        </>
    );
};

export default User;
