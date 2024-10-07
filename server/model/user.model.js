import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    about: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    tel: {
        type: String,
        required: false,
    },
    clickedJobs: {
        type: Array,
        required: false,
    },
    // gotClickedUsers: {
    //     type: Array,
    //     required: false,
    // },
    age: {
        type: Number,
        required: false,
    },
    role: {
        type: String,
        required: true,
    },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
    }],
    avatar: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s',
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;