import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice";

const Login = () => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:5000/api/v1/login`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ username }),
            });
            if (res.status === 404) {
                throw new Error("Wrong credentials");
            }
            const data = await res.json();
            console.log(data,"data")
            dispatch(login(data));
            navigate("/");
        } catch (error) {
            setError((prev) => true);
            setTimeout(() => {
                setError((prev) => false);
            }, 2500);
            console.error(error);
        }
    };

    return (
        <div>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label htmlFor="username">
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="username"
                            id="username"
                            placeholder="Enter username"
                        />
                    </label>

                    <button>Login</button>
                </form>
                {error && (
                    <div style={{ color: "red" }}>
                        Wrong credentials! Try different ones.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
