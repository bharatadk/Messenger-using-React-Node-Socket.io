import React, { useState } from "react";
import Conversation from "../conversation/Conversation";
import Message from "../message/Message";
import classes from "./home.module.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import DialogBox from "./DialogBox";

const Home = () => {
    const Woman =
        "https://thumbs.dreamstime.com/b/close-up-photo-beautiful-funky-childish-her-dark-skin-lady-evil-person-making-loser-symbol-forehead-impolite-indicate-finger-145381980.jpg";

    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [lastConversationClicked, setLastConversationClicked] = useState("");
    const [comingMessage, setComingMessage] = useState("");
    const [otherUser, setOtherUser] = useState("");
    const { user, token } = useSelector((state) => state.auth);
    const [showModal, setShowModal] = useState(false);
    const [videoCallUrlProp, setVideoCallUrl] = useState("");
    const navigate = useNavigate();

    const socket = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8080");
        socket.current.on("getMessage", (data) => {
            console.log(data);
            setComingMessage({
                senderId: data.senderId,
                messageText: data.text,
                createdAt: Date.now(),
            });
        });

        socket.current.on("getVideoMessage", (data) => {
            setVideoCallUrl(data.videoCallUrl);
            setShowModal(true);
        });
    }, []);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
    }, [user]);

    useEffect(() => {
        comingMessage &&
            lastConversationClicked?.members.includes(comingMessage.senderId) &&
            setMessages((prev) => [...prev, comingMessage]);
    }, [comingMessage, lastConversationClicked]);

    useEffect(() => {
        const fetchUserConvos = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/v1/conversation/find/${user._id}`,
                    {
                        headers: {
                            currentuserid: `${token}`,
                        },
                    }
                );
                const convos = await res.json();
                setConversations((prev) => convos);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserConvos();
    }, [user._id]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/v1/message/${lastConversationClicked._id}`,
                    {
                        headers: {
                            currentuserid: `${token}`,
                        },
                    }
                );
                const messages = await res.json();
                setMessages((prev) => messages);
            } catch (error) {
                console.error(error);
            }
        };
        lastConversationClicked && fetchMessages();
    }, [lastConversationClicked]);

    useEffect(() => {
        const fetchOtherUser = async () => {
            try {
                const otherUserId = lastConversationClicked?.members?.find(
                    (member) => member !== user._id
                );
                const res = await fetch(
                    `http://localhost:5000/api/v1/user/find/${otherUserId}`
                );
                const data = await res.json();
                setOtherUser((prev) => data);
            } catch (error) {
                console.error(error);
            }
        };
        lastConversationClicked && fetchOtherUser();
    }, [lastConversationClicked]);

    const handlePostMessage = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/api/v1/message`, {
                headers: {
                    "Content-Type": "application/json",
                    currentuserid: `${token}`,
                },
                method: "POST",
                body: JSON.stringify({
                    conversationId: lastConversationClicked._id,
                    messageText: message,
                }),
            });
            const data = await res.json();
            setMessages((prev) => [...prev, data]);

            const otherUserId = lastConversationClicked?.members?.find(
                (member) => member !== user._id
            );

            socket.current.emit("sendMessage", {
                senderId: user._id,
                otherUserId,
                text: message,
            });

            setMessage("");
        } catch (error) {
            console.error(error);
        }
    };
    const videoCallImg =
        "https://www.vhv.rs/dpng/d/487-4875751_video-call-png-video-call-icon-png-transparent.png";

    const handleVideoCall = () => {
        const otherUserId = lastConversationClicked?.members?.find(
            (member) => member !== user._id
        );
        const randomId = randomString();
        const sharedURL = `/room/${randomId}`;

        socket.current.emit("sendVideoMessage", {
            senderId: user._id,
            otherUserId,
            videoCallUrl: sharedURL,
        });
        navigate(sharedURL);
    };

    const randomString = () => {
        return (
            Date.now().toString() +
            (Math.random() * 1000000).toString().split(".")[0]
        );
    };
    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.left}>
                    <h2 className={classes.title}>WebDevMania</h2>
                    {conversations?.map((c, i) => (
                        <div
                            onClick={() => setLastConversationClicked(c)}
                            key={i}
                        >
                            <Conversation conversation={c} currentUser={user} />
                        </div>
                    ))}
                </div>
                <div className={classes.right}>
                    {otherUser ? (
                        <>
                            <div className={classes.otherUserData}>
                                <img
                                    src={Woman}
                                    className={classes.otherUserImg}
                                />
                                <h4 className={classes.personUsername}>
                                    {otherUser?.username}
                                </h4>
                                <button
                                    style={{ borderRadius: "10px" }}
                                    onClick={handleVideoCall}
                                >
                                    <img
                                        src={videoCallImg}
                                        alt="videoCallImg"
                                        width="50"
                                        height="25"
                                        style={{ borderRadius: "20px" }}
                                    />
                                </button>
                                <DialogBox
                                    showModal={showModal}
                                    setShowModal={setShowModal}
                                    videoCallUrlProp={videoCallUrlProp}
                                />
                            </div>
                            <div className={classes.messages}>
                                {messages?.length > 0 ? (
                                    messages?.map((message, i) => (
                                        <Message
                                            messages={messages}
                                            key={i}
                                            own={message.senderId === user._id}
                                            message={message}
                                        />
                                    ))
                                ) : (
                                    <h1
                                        style={{
                                            textAlign: "center",
                                            color: "#fff",
                                        }}
                                    >
                                        No messages yet, be the first one to
                                        send!
                                    </h1>
                                )}
                            </div>
                        </>
                    ) : (
                        <h1
                            style={{
                                textAlign: "center",
                                marginTop: "2rem",
                                color: "#fff",
                            }}
                        >
                            Click a conversation!
                        </h1>
                    )}
                    <div className={classes.inputAndBtn} style={{display:"flex",flexDirection:"row",width:"300px",flexFlow:"row wrap"}}>
                        <form onSubmit={handlePostMessage}>
                         <input
                                value={message}
                                onChange={(e) =>
                                    setMessage((prev) => e.target.value)
                                }
                                className={classes.input}
                                type="text"
                                placeholder="Type message..."
                                style={{width:"200px"}}
                            />
                                                        <button className={classes.submitBtn} style={{width:"50px"}}>Send</button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
