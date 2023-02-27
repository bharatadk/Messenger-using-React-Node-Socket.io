import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
            required: true,
        },
    },
    { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export { Conversation };
