import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
//imports
import { authRouter } from "./Route/authRoute.js";
import { conversationRoute } from "./Route/conversationRoute.js";
import { messageRoute } from "./Route/messageRoute.js";
dotenv.config();
// mongoose
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI, () => {
    console.log("Db is connected successfully");
});

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1", authRouter);
app.use("/api/v1/conversation", conversationRoute);
app.use("/api/v1/message", messageRoute);

//port
app.listen(process.env.PORT, () => {
    console.log("listening to port", process.env.PORT);
});
