import "./App.css";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Room from "./components/room/Room";
import VideoRoom from "./components/room/VideoRoom";

function App() {
    const { user } = useSelector((state) => state.auth);
    return (
        <div className="App">
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route
                    path="/"
                    element={user ? <Home /> : <Navigate to="/login" />}
                />
                <Route
                    path="/login"
                    element={!user ? <Login /> : <Navigate to="/" />}
                />
                <Route path="room" element={<Room />} />
                <Route path="room/:roomId" element={<VideoRoom />} />
            </Routes>
        </div>
    );
}

export default App;
