import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import Job from '../model/job.model.js';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import mongoose from 'mongoose';

export const getAllUsers = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = parseInt(req.query.startIndex) || 0;

        const searchTerm = req.query.searchTerm || "";

        const totalUsers = await User.countDocuments({
            name: { $regex: searchTerm, $options: 'i' },
            role: "employee"
        });

        const users = await User.find({
            name: { $regex: searchTerm, $options: 'i' },
            role: "employee"
        })
            .limit(limit)
            .skip(startIndex)

        if (!users) {
            const err = new Error("No users");
            err.statusCode = 404;
            return next(err);
        };

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        };

        return res.status(201).json({ message: "You found user listing", data: users, total: totalUsers });
    } catch (error) {
        next(error);
    };
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            const err = new Error("Wrong job's id");
            err.statusCode = 404;
            return next(err);
        }

        return res.status(201).json({ message: "Current User", data: user });
    } catch (error) {
        next(error);
    };
};

export const editUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        const err = new Error("You are not allowed to edit this user");
        err.statusCode = 403;
        return next(err);
    }

    try {
        const { name, email, password, avatar, role, about, tel } = req.body;

        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        };

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                name,
                email,
                about,
                password,
                avatar,
                role,
                tel,
            }
        }, { new: true });

        res.status(201).json(updatedUser);
    } catch (error) {
        console.log(error)
        return next(error);
    }
};

export const uploadAvatar = async (req, res, next) => {
    const IMAGE_STORAGE = process.env.IMAGE_STORAGE;

    try {
        const file = req.files.file;

        if (!req.files || !req.files.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User is not found" });
        }

        const avatarName = uuidv4() + '.jpg';
        file.mv(`${IMAGE_STORAGE}/${avatarName}`);
        user.avatar = avatarName;

        await user.save();

        res.status(201).json(user);
    } catch (error) {
        console.log(error)
        return next(error);
    }
};

export const deleteAvatar = async (req, res, next) => {
    const IMAGE_STORAGE = process.env.IMAGE_STORAGE;

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
        console.log(error)
        return next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        const err = new Error("You are not allowed to edit this user");
        err.statusCode = 403;
        return next(err);
    }

    try {
        const userToDelete = await User.findById(req.params.id);

        if (!userToDelete) return res.status(404).json({ message: "User not found" });

        await Job.deleteMany({ _id: {$in: userToDelete.jobs} });
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        res.clearCookie();
        res.status(201).json({ message: `User ${deletedUser.name} was deleted successfully`, user: deletedUser });
    } catch (error) {
        console.log(error)
        return next(error);
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
        console.log(error)
        return next(error);
    }
}

// export const gotResponsesJobByUsers = async (req, res, next) => {
//     console.log('req.user.id from gotResponsesJobByUsers', req.user.id);

//     try {
//         const currentUser = await User.findById(req.user.id).populate('jobs');

//         if (!currentUser) return res.status(404).json({ success: false, message: "User is not found" });

        
//     } catch (error) {
//         console.log(error)
//         return next(error);
//     }
// }

export const clickedJobsByUser = async (req, res, next) => {
    try {
        const jobId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ success: false, message: "Invalid job ID" });
        }

        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        const updatedUser = await User.findByIdAndUpdate(req.user.id,
            { $push: { clickedJobs: job._id } },
            { new: true }
        );

        if (!updatedUser) {
            const err = new Error("Owner is not found");
            err.statusCode = 500;
            return next(err);
        }

        return res.status(201).json({ message: "Your response was succeded", data: updatedUser });
    } catch (error) {
        console.log(error)
        return next(error);
    }
}