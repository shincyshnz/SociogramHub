const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UsersModel",
        required: [true, "User id cannot be empty"]
    },
    postFile: {
        type: String,
        required: [true, "Post file URL cannot be empty"]
    },
    caption: {
        type: String,
        maxLength: 2200,
    },
    location: {
        type: String,
        maxLength: 200,
    },
    likes :{
        type : Number,
        default  : 0,
    },
    commentsCount :{
        type : Number,
        default  : 0,
    },
    tagId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "UsersModel"
    }]

}, { timestamps: true });

module.exports = {
    PostsModel: mongoose.model("Posts", postSchema)
}