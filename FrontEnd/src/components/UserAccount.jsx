import React, { useState } from "react";
import Account from "./Account";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from '../redux/slices/userSlice.jsx';
import { isValidName } from "../utils/regex.jsx";

const accounts = [
    {
        title: "Argent Bank Checking (x8349)",
        amount: "$2,082.79",
        description: "Available Balance",
    },
    {
        title: "Argent Bank Savings (x6712)",
        amount: "$10,928.42",
        description: "Available Balance",
    },
    {
        title: "Argent Bank Credit Card (x8349)",
        amount: "$184.30",
        description: "Current Balance",
    },
];

const UserAccount = () => {
    const userData = useSelector((state) => state.user.userData);
    const token = useSelector((state) => state.auth.token);
    const [display, setDisplay] = useState(true);
    const [userName, setUserName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();
    const handleSubmitUsername = async (event) => {
        event.preventDefault();

        if (!isValidName(userName)) {
            console.error('Invalid username');
            return;
        }
        try {
            await dispatch(updateUserProfile({ userName, token }));
            setDisplay(!display);
        } catch (errorMessage) {
            console.error('Failed to update username', setErrorMessage);
        }
    };

    return (
        <main className="main bg-dark">
            <div className="header">
                {display ?

                    <div>
                        <h2>Welcome back
                            <br />
                            {userData.firstname} {userData.lastname} !
                        </h2>
                        <button className="edit-button" onClick={() => setDisplay(!display)}>Edit Name</button>
                    </div>
                    :
                    <div>
                        <h2>Edit user info</h2>
                        <form>
                            <div className="edit-input">
                                <label htmlFor="username">User name:</label>
                                <input
                                    type="text"
                                    id="username"
                                    defaultValue={userData.userName}
                                    onChange={(event) => setUserName(event.target.value)}
                                />
                            </div>
                            <div className="edit-input">
                                <label htmlFor="firstname">First name:</label>
                                <input
                                    type="text"
                                    id="firstname"
                                    defaultValue={userData.firstname}
                                    disabled={true}
                                />
                            </div>
                            <div className="edit-input">
                                <label htmlFor="lastname">Last name:</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    defaultValue={userData.lastname}
                                    disabled={true}
                                />
                            </div>
                            <div className="buttons">
                                <button className="edit-username-button" onClick={handleSubmitUsername}>Save</button>
                                <button className="edit-username-button" onClick={() => setDisplay(!display)}>Cancel</button>
                            </div>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </form>
                    </div>
                }
            </div>
            {accounts.map((account, index) => (
                <Account
                    key={index}
                    title={account.title}
                    amount={account.amount}
                    description={account.description}
                />
            ))}
        </main>
    );
};

export default UserAccount;
