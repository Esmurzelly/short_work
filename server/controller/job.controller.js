import Job from "../model/job.model.js";
import User from "../model/user.model.js";
import { v4 as uuidv4 } from 'uuid';

export const createJob = async (req, res, next) => {
    try {
        const IMAGE_STORAGE_JOB = process.env.IMAGE_STORAGE_JOB;
        const job = await Job.create(req.body);

        if (req.files && req.files.imageUrls) {
            const imageFiles = Array.isArray(req.files.imageUrls) ? req.files.imageUrls : [req.files.imageUrls];
            const imagePath = [];

            for (let file of imageFiles) {
                const fileName = uuidv4() + '.jpg';
                file.mv(`${IMAGE_STORAGE_JOB}/${fileName}`, err => {
                    if (err) {
                        console.log('File upload error:', err);
                        return res.status(500).send(err);
                    }
                });
                imagePath.push(fileName);
            }

            job.imageUrls.push(...imagePath);
            await job.save();
        }



        const updatedUser = await User.findByIdAndUpdate(req.user.id,
            { $push: { jobs: job._id } },
            { new: true }
        );

        if (!updatedUser) {
            const err = new Error("User not found");
            err.statusCode = 404;
            return next(err);
        };

        return res.status(201).json({ message: "Job was created successfully", data: job });
    } catch (error) {
        console.log(error)
        return next(error);
    }
}

export const updateJob = async (req, res, next) => {
    const neededJob = await Job.findById(req.params.id);

    if (!neededJob) {
        const err = new Error("Job not found");
        err.statusCode = 404;
        return next(err);
    }

    if (req.user.id !== String(neededJob.userRef)) {
        const err = new Error("You are not allowed to edit this user");
        err.statusCode = 403;
        return next(err);
    }

    try {
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        return res.status(201).json({ message: "Your job was updated successfully", data: updatedJob });
    } catch (error) {
        next(error);
        console.log(error);
    }
}

export const deleteJob = async (req, res, next) => {
    const neededJob = await Job.findById(req.params.id);

    if (!neededJob) {
        const err = new Error("Job not found");
        err.statusCode = 404;
        return next(err);
    }

    if (req.user.id !== String(neededJob.userRef)) {
        const err = new Error("You are not allowed to edit this user");
        err.statusCode = 403;
        return next(err);
    }

    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id)
        return res.status(201).json({ message: "Your job was deleted successfully", data: deletedJob });

    } catch (error) {
        console.log(error)
        return next(error);
    }
}

export const getAllJobs = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = parseInt(req.query.startIndex) || 0;

        const searchTerm = req.query.searchTerm || "";
        const sort = req.query.sort || "createdAt";
        const order = req.query.order || 'desc';

        const minSalary = parseInt(req.query.minSalary) || 0;
        const maxSalary = parseInt(req.query.maxSalary) || Infinity;

        const totalJobs = await Job.countDocuments({
            title: { $regex: searchTerm, $options: 'i' },
        });

        const jobs = await Job.find({
            title: { $regex: searchTerm, $options: 'i' },
            salary: { $gte: minSalary, $lte: maxSalary }
        })
            .sort({ [sort]: order })
            .limit(limit)
            .skip(startIndex);

        if (!jobs) {
            const err = new Error("No jobs");
            err.statusCode = 404;
            return next(err);
        };

        if (jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found" });
        };

        return res.status(201).json({ message: "You found job listing", data: jobs, total: totalJobs });
    } catch (error) {
        console.log(error)
        return next(error);
    }
}

export const getJobById = async (req, res, next) => {
    try {
        const currentJob = await Job.findById(req.params.id);

        if (!currentJob) {
            const err = new Error("Wrong job's id");
            err.statusCode = 404;
            return next(err);
        }

        res.status(201).json({ message: "Current Job", data: currentJob });
    } catch (error) {
        console.log(error)
        return next(error);
    }
}

