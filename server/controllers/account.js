import express from 'express';
import mongoose from 'mongoose';
import UserModal from "../models/user.js";
const router = express.Router();

export const getUserByID = async (req, res) => {
    const { id } = req.params;
    try {
        const oldUser = await UserModal.findOne({_id: id});
        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
        res.status(200).json({data: oldUser});

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};

export const updateUserByID = async (req, res) => {
    const { id } = req.params;
    const { aboutMe, imageUrl } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
    const updatedUser = { aboutMe, imageUrl, _id: id };
    await UserModal.findByIdAndUpdate(id, updatedUser, { new: true });
    res.json(updatedUser);
};

export default router;