import React from "react";
import classes from "./conversation.module.css";

const Conversation = () => {
    const Woman =
        "https://thumbs.dreamstime.com/b/close-up-photo-beautiful-funky-childish-her-dark-skin-lady-evil-person-making-loser-symbol-forehead-impolite-indicate-finger-145381980.jpg";
    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <img src={Woman} className={classes.personImg} />
                <div className={classes.metaData}>
                    <div className={classes.otherUsername}>John</div>
                    <div className={classes.lastMsgConvo}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Consequatur tenetur aspernatur eum doloremque
                        maxime unde deserunt, iusto vero corporis suscipit non
                        enim dolorum sed voluptate sapiente. Voluptatem illo
                        voluptates nisi.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Conversation;
