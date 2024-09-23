import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import Job from '../model/job.model.js';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

export const editUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        const err = new Error("You are not allowed to edit this user");
        err.statusCode = 403; // Устанавливаем HTTP-код ошибки
        return next(err); // Передаем ошибку в middleware для обработки
    }

    try {
        const { name, email, password, avatar, role } = req.body;

        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        };


        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                name,
                email,
                password,
                avatar,
                role
            }
        }, { new: true });

        res.status(201).json(updatedUser);
    } catch (error) {
        const err = new Error("Server issue");
        err.statusCode = 500; // Устанавливаем HTTP-код ошибки
        console.log(error)
        return next(err); // Передаем ошибку в middleware для обработки
    }
};

export const uploadAvatar = async (req, res, next) => {
    const IMAGE_STORAGE = process.env.IMAGE_STORAGE;

    if (req.user.id !== req.params.id) {
        const err = new Error("You are not allowed to upload the user's avatar");
        err.statusCode = 403;
        return next(err);
    }
    
    try {
        const file = req.files.file;
        
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User is not found" });
        }

        const avatarName = uuidv4() + '.jpg';
        file.mv(IMAGE_STORAGE + avatarName);
        user.avatar = avatarName;

        await user.save();

        res.status(201).json(user);
    } catch (error) {
        const err = new Error("Server issue");
        err.statusCode = 500;
        console.log(error)
        return next(err);
    }
};

export const deleteAvatar = async (req, res, next) => {
    const IMAGE_STORAGE = process.env.IMAGE_STORAGE;

    if (req.user.id !== req.params.id) {
        const err = new Error("You are not allowed to upload the user's avatar");
        err.statusCode = 403;
        return next(err);
    }

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User is not found" });
        }

        fs.unlinkSync(IMAGE_STORAGE + user.avatar);
        user.avatar = null;
        await user.save();

        return res.json(user);
    } catch (error) {
        const err = new Error("Server issue");
        err.statusCode = 500;
        console.log(error)
        return next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        const err = new Error("You are not allowed to edit this user");
        err.statusCode = 403;
        return next(err);
    }

    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.clearCookie();
        res.status(201).json({ message: `User ${deletedUser.name} was deleted successfully`, user: deletedUser });
    } catch (error) {
        const err = new Error("Server issue");
        err.statusCode = 500;
        console.log(error)
        return next(err);
    }
};

export const findUserByUserRef = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        const findedUser = await User.findById(job.userRef);

        if (!findedUser) {
            const err = new Error("Owner is not found");
            err.statusCode = 500;
            return next(err);
        }

        res.status(201).json({ message: "Owner is found", data: findedUser });
    } catch (error) {
        const err = new Error("Server issue");
        err.statusCode = 500;
        console.log(error)
        return next(err);
    }
}