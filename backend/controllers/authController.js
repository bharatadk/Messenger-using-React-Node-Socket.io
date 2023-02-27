import { User } from "../models/User.js";
import express from "express";

export const register = async (req, res) => {
    try {
        const isExisting = await User.findOne({ username: req.body.username });
        if (isExisting) {
            return res
                .status(400)
                .json({ message: "User already registered with that name" });
        }
        if (req.body.username == "") {
            return res
                .status(500)
                .json({ message: "Username cannot be empty" });
        }

        const user = await User.create({ ...req.body });
        await user.save();
        return res.status(201).json({ message: user });
    } catch (error) {
        return res.json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        if (req.body.username === "") {
            return res
                .status(500)
                .json({ message: "All fields must be populated" });
        }
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json({ message: "No such user exists" });
        }
        if (req.body.username == "") {
            return res
                .status(500)
                .json({ message: "Username cannot be empty" });
        }
        const token = user._id;

        return res.status(200).json({ user, token });
    } catch (error) {
        return res.json({ message: error.message });
    }
};

export const findById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json(user);
    } catch (error) {
        return res.json({ message: error.message });
    }
};
