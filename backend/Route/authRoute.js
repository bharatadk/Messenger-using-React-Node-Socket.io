import express from "express";
import { register, login, findById } from "../controllers/authController.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user/find/:id").get(findById);
export { router as authRouter };
