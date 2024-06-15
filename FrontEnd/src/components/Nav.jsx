import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ArgentBankLogo from "../assets/argentBankLogo.webp";
import { logout } from "../redux/slices/authSlice.jsx";
const Nav = () => {
    const isConnected = useSelector((state) => state.auth.token);
    const username = useSelector((state) => state.user.userData.username);
    const firstname = useSelector((state) => state.user.userData.firstname);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const displayName = username || firstname;
    const logoutHandler = () => {
        dispatch(logout());
        sessionStorage.clear();
        localStorage.clear();
        navigate("/");
    };
    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to={"/"}>
                <img
                    className="main-nav-logo-image"
                    src={ArgentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            {isConnected ? (
                <div className="connected">
                    <Link to="/user">
                        <i className="fa-solid fa-2x fa-circle-user" />
                        <p>{displayName}</p>
                    </Link>
                    <Link to="/" onClick={logoutHandler}>
                        <i className="fa-solid fa-arrow-right-from-bracket" />
                        <p> Sign out </p>
                    </Link>
                </div>
            ) : (
                <div className="not-connected">
                    <Link to="/sign-in">
                        <i className="fa-solid fa-circle-user"></i>
                        <p>Sign In</p>
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Nav;
