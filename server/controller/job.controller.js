import errorHandler from "../middleware/errorHandler.js";
import Job from "../model/job.model.js"
import User from "../model/user.model.js";

export const createJob = async (req, res, next) => {
    try {
        const job = await Job.create(req.body);
        const updatedUser = await User.findByIdAndUpdate(req.user.id,
            { $push: { jobs: job._id } },
            { new: true }
        );

        if (!updatedUser) {
            const err = new Error("User not found");
            err.statusCode = 404;
            return next(err);
        }

        return res.status(201).json({ message: "Job was created successfully", data: job });
    } catch (error) {
        const err = new Error("Server issue");
        err.statusCode = 500;
        console.log(error)
        return next(err);
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

    console.log('req.user.id', req.user.id)
    console.log('neededJob.userRef', String(neededJob.userRef))

    if (req.user.id !== String(neededJob.userRef)) {
        const err = new Error("You are not allowed to edit this user");
        err.statusCode = 403;
        return next(err);
    }

    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id)
        return res.status(201).json({ message: "Your job was deleted successfully", data: deletedJob });

    } catch (error) {
        const err = new Error("Server issue");
        err.statusCode = 500;
        console.log(error)
        return next(err);
    }
}

export const getAllJobs = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = parseInt(req.query.startIndex) || 0;

        const searchTerm = req.query.searchTerm || "";
        const sort = req.query.sort || "createdAt";
        const order = req.query.order || 'desc';

        const totalJobs = await Job.countDocuments({
            title: { $regex: searchTerm, $options: 'i' },
        });

        const jobs = await Job.find({
            title: { $regex: searchTerm, $options: 'i' },
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
        const err = new Error("Server issue");
        err.statusCode = 500;
        console.log(error)
        return next(err);
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
        const err = new Error("Server issue");
        err.statusCode = 500;
        console.log(error)
        return next(err);
    }
}

