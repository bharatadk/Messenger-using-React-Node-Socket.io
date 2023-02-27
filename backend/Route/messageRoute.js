import express from "express";
import {
    getAllMessagesFromConversation,
    sendMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.route("/").post(sendMessage);
router.route("/:conversationId").get(getAllMessagesFromConversation);

export { router as messageRoute };
