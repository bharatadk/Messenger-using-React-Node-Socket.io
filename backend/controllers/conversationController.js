import { Conversation } from "../models/Conversation.js";

export const createAConversation = async (req, res) => {
    try {
        const { receiverId } = req.body;
        const currentUserId = req.headers.currentuserid;

        const isConversationAlreadyCreated = await Conversation.find({
            members: { $all: [currentUserId, receiverId] },
        });

        if (isConversationAlreadyCreated.length) {
            return res
                .status(500)
                .json({ message: "There is already such a conversation" });
        }
        await Conversation.create({ members: [currentUserId, receiverId] });
        return res
            .status(201)
            .json({ message: "Conversation Successfully Created" });
    } catch (error) {
        return res.json({ message: error.message });
    }
};

//get a single conversation
export const getUserConversation = async (req, res) => {
    try {
        if (req.headers.currentuserid !== req.params.userId) {
            return res
                .status(403)
                .json({ message: "You can get only your own conversations" });
        }
        const userId = req.headers.currentuserid;
        const conversations = await Conversation.find({
            members: { $in: [userId] },
        });
        return res.status(200).json(conversations);
    } catch (error) {
        return res.json({ message: error.message });
    }
};

export const getAConversation = async (req, res) => {
    try {
        const conversation = await Conversation.findById(
            req.params.conversationId
        );
        if (conversation.members.includes(req.headers.currentuserid)) {
            return res.status(200).json(conversation);
        } else {
            return res
                .status(403)
                .json({ message: "This conversation doesn't include you" });
        }
    } catch (error) {
        return res.json({ message: error.message });
    }
};
