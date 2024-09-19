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

export const getAllJobs = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = parseInt(req.query.startIndex) || 0;

        const searchTerm = req.query.searchTerm || "";
        const sort = req.query.sort || "createdAt";
        const order = req.query.order || 'desc';

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

        return res.status(201).json({ message: "You found job listing", data: jobs });
    } catch (error) {
        const err = new Error("Server issue");
        err.statusCode = 500;
        console.log(error)
        return next(err);
    }
}