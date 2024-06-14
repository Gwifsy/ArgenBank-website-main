import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, loginFail } from '../redux/slices/authSlice.jsx';
import { isValidEmail, isValidPassword } from '../utils/regex.jsx';

const FormLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isValidEmail(email)) return setError("Invalid email address");
        if (!isValidPassword(password)) return setError("Invalid password");
        const response = await fetch("http://localhost:3001/api/v1/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.body.token;
            dispatch(loginSuccess(token));
            sessionStorage.setItem("token", token);
            if (rememberMe) {
                localStorage.setItem("token", token);
            }
            navigate('/user');
        } else {
            dispatch(loginFail(error));
        }
    };
    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="input-remember">
                        <input
                            id="remember-me"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(event) => setRememberMe(event.target.checked)}
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button">Sign In</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </section>
        </main>
    );
};

export default FormLogin;
