import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: String,
            required: true,
        },
        messageText: {
            type: String,
            required: true,
        },
        senderId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export { Message };
