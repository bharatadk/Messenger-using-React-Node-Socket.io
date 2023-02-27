import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Room = () => {
    const [value, setValue] = useState("");
    const navigate = useNavigate();
    const handleJoinRoom = useCallback(() => {
        navigate(`/room/${value}`);
    }, [navigate, value]);
    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            ></input>
            <button onClick={handleJoinRoom}>Join</button>
        </div>
    );
};

export default Room;
