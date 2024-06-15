import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from '../redux/slices/userSlice.jsx';
import { isValidName } from "../utils/regex.jsx";

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
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </main>
    );
};

export default UserAccount;
