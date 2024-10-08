import mongoose from "mongoose";
const { Schema } = mongoose;

const jobSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    neededSkils: {
        type: Array,
        required: false,
    },
    imageUrls: {
        type: Array,
        required: false,
    },
    loc: {
        type: { type: String },
        coordinates: [Number],
    },
    userRef: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: false,
    }
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);

export default Job;