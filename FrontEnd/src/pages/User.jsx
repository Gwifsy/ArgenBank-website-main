import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../redux/slices/userSlice.jsx';
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import UserAccount from "../components/UserAccount";

const User = () => {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            const userData = async () => {
                try {
                    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        const userData = {
                            createdAt: data.body.createdAt,
                            updatedAt: data.body.updatedAt,
                            id: data.body.id,
                            email: data.body.email,
                            firstname: data.body.firstName,
                            lastname: data.body.lastName,
                            username: data.body.userName
                        }
                        dispatch(getUserProfile(userData));
                    } else {
                        console.log("error while retrieving profile");
                    }
                } catch (error) {
                    console.error(error);
                };
            };
            userData();
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
