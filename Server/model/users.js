const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trime: true,
        required: [true, "Username Cannot be empty"],
        unique: [true, "username must be unique"],
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email field cannot be empty"],
        unique: [true, "Email Already exists"],
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password field cannot be empty"]
    },
    profile_pic: {
        type: String,
    },
    bio: {
        type: String,
        trim: true,
        maxLength: 1000,
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        default: "other",
    },
    followers: [{
        followerId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Users",
        },
        followed : {
            type : Boolean,
            defaul : false,
        }
    }],
}, { timestamps: true });

module.exports = {
    UsersModel: mongoose.model("Users", userSchema)
}