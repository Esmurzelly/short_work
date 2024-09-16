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
    salaty: {
        type: Number,
        required: true,
    },
    neededSkils: {
        type: Array,
        required: true,
    },
    imageUrls: {
        type: Array,
        required: false,
    },
    location: {
        type: String,
        required: false
    },
    userUref: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: false,
    }
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);

export default Job;