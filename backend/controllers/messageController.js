import { Message } from "../models/Message.js";

export const sendMessage = async (req, res) => {
    try {
        const { messageText, conversationId } = req.body;
        const newMessage = await Message.create({
            conversationId,
            messageText,
            senderId: req.headers.currentuserid,
        });
        return res.status(201).json(newMessage);
    } catch (error) {
        return res.json({ message: error.message });
    }
};

export const getAllMessagesFromConversation = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        return res.status(200).json(messages);
    } catch (error) {
        return res.json({ message: error.message });
    }
};
