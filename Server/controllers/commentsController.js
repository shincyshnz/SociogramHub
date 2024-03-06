const mongoose = require("mongoose");
const {CommentsModel} = require("../model/comment");
const { updatePostsCommentCount } = require("./postsController");

const addComments = (req, res, next) => {
    const { userId, postId, commentText } = req.body;

    try {
        CommentsModel.create({ postId, userId, commentText });
        const postDetails = updatePostsCommentCount(postId);
        
        if (postDetails)
            res.status(200).json({
                message: "added comment"
            });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addComments
}