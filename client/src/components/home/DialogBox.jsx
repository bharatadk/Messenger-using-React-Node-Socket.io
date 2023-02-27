import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DialogBox({ showModal, setShowModal, videoCallUrlProp }) {
    const callReceive =
        "https://images.vexels.com/media/users/3/137415/isolated/preview/0e475bb9b17b3fa4f94f31fba1635b8f-telephone-call-icon-logo.png";

    const callAbort =
        "https://w7.pngwing.com/pngs/145/522/png-transparent-end-call-button-telephone-call-button-computer-icons-button-text-trademark-logo-thumbnail.png";

    const navigate = useNavigate();
    return (
        <div>
            {/* <button onClick={() => setShowModal(true)}>Open Modal</button> */}

            {showModal ? (
                <div className="modal">
                    <div className="modal-content">
                        <img
                            style={{
                                border: "none",

                                borderRadius: "50%",
                                objectFit: "cover",
                            }}
                            src={callReceive}
                            width="60"
                            height="60"
                            onClick={() => {
                                console.log("dfdfdf", videoCallUrlProp);
                                navigate(videoCallUrlProp);
                                setShowModal(false);
                            }}
                        />
                        <img
                            style={{
                                border: "none",
                                marginLeft: "230px",

                                borderRadius: "50%",
                                objectFit: "cover",
                                transform: "rotate(120deg)",
                            }}
                            src={callAbort}
                            width="60"
                            height="60"
                            onClick={() => setShowModal(false)}
                        />
                    </div>
                </div>
            ) : null}

            <style jsx="true">{`
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                }

                .modal-content {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: white;
                    padding: 20px;
                    width: 400px;
                    height: 100px;
                    border-radius: 60px;
                }
            `}</style>
        </div>
    );
}

export default DialogBox;
