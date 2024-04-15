import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const siteUrl = process.env.REACT_APP_BE_URL;
const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(["token"]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const verifyCookie = async () => {
            try {
                if (!cookies.token) {
                    navigate("/login");
                    return;
                }
                const response = await axios.post(
                    `${siteUrl}/`,
                    {},
                    { withCredentials: true }
                );
                const { status, user } = response.data;
                if (status) {
                    setUsername(user);
                    toast.success(`Hello ${user}`, {
                        position: "top-right",
                    });
                } else {
                    removeCookie("token");
                    navigate("/login");
                    toast.error("Session expired. Please log in again.", {
                        position: "top-right",
                    });
                }
            } catch (error) {
                console.error("Error while verifying token:", error);
                // Handle unexpected errors, such as server errors or network issues
                toast.error("An error occurred. Please try again later.", {
                    position: "top-right",
                });
            }
        };
        verifyCookie();
    }, [cookies.token, navigate, removeCookie]);

    const handleLogout = () => {
        removeCookie("token");
        navigate("/login");
        toast.info("Logged out successfully.", {
            position: "top-right",
        });
    };

    return (
        <>
            <div className="home_page">
                <h4>
                    {" "}
                    Welcome <span>{username}</span>
                </h4>
                <button onClick={handleLogout}>LOGOUT</button>
                <Link to="/reminders">
                    <button>Reminders List</button>
                </Link>
                <Link to="/notes">
                    <button>Academic Record Notes</button>
                </Link>
            </div>
            <ToastContainer />
        </>
    );
};

export default Home;
