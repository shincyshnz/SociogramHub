const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PostsModel",
        required: [true, "Post ID for comment is required"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UsersModel",
        required: [true, "User Id is required"],
    },
    commentText: {
        type: String,
        default: "",
    },
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommentsModel",
        default: null,
    }
}, { timestamps: true });

module.exports = {
    CommentsModel: mongoose.model("Comments", commentSchema)
}