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