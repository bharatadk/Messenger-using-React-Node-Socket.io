import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/authSlice";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (confirmPass !== password) return;

        try {
            const res = await fetch(`http://localhost:5000/api/v1/register`, {
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
            navigate("/");
            dispatch(register(data));
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
                <h2> Register</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="username">
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            id="username"
                            placeholder="Enter username"
                        />
                    </label>

                    <button>Register</button>
                    <Link to="/login">
                        Already have an account? <p>Login now</p>
                    </Link>
                </form>
                {error && <div>Wrong credentials! Try different ones.</div>}
            </div>
        </div>
    );
};

export default Register;
