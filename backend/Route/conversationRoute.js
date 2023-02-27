import express from "express";
import {
    createAConversation,
    getAConversation,
    getUserConversation,
} from "../controllers/conversationController.js";

const router = express.Router();

router.route("/").post(createAConversation);
router.route("/find/:userId").get(getUserConversation);
router.route("/:conversationId").get(getAConversation);

export { router as conversationRoute };
