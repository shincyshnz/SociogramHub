const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: [true, "Email field cannot be empty"],
        unique: [true, "Email Already exists"],
    },
    fullname: {
        type: String,
        trim: true,
        required: [true, "Full name Cannot be empty"],
    },
    username: {
        type: String,
        trim: true,
        required: [true, "Username Cannot be empty"],
        unique: [true, "username must be unique"],
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password field cannot be empty"]
    },
    profile_pic: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        trim: true,
        maxLength: 1000,
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
        default: "other",
    },
    // followers: [
    //     followerId: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Users",
    //     },
    //     followed: {
    //         type: Boolean,
    //         default: false,
    //     }
    // ],

    // Here the above code is replaced to remove adding new _id to followers array 
    followers: [new mongoose.Schema(
        {
            followerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users",
            },
            followed: {
                type: Boolean,
                default: false,
            }
        }, { _id: false }
    )]
}, { timestamps: true });

module.exports = {
    UsersModel: mongoose.model("Users", userSchema)
}