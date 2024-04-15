import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const siteUrl = process.env.REACT_APP_BE_URL;

const Signup = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        username: "",
        usertype: ""
    });
    const { email, password, username, usertype } = inputValue;
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-right",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${siteUrl}/signup`,
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
        setInputValue({
            ...inputValue,
            email: "",
            password: "",
            username: "",
        });
    };

    return (
        <div>
            <h2>Create new Account</h2>
            <h4>
                Already have an account? <Link to={"/login"}>Login</Link>
            </h4>
            <div className="form_container">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="usertype">User Type</label>
                        <select
                            name="usertype"
                            value={usertype}
                            onChange={handleOnChange}
                            required
                        >
                            <option value="" disabled selected>Select a user type</option>
                            <option value="Student">Student</option>
                            <option value="Admin">Admin</option>
                            <option value="Fresh Graduate">Fresh Graduate</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="email">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            placeholder="Enter your username"
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Signup;