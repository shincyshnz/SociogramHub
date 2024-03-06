const mongoose = require("mongoose");
const {CommentsModel} = require("../model/comment");

const addComments = (req, res, next) => {
    const { userId, postId, commentText } = req.body;

    try {
        const comment = CommentsModel.create({ postId, userId, commentText });
        if (comment)
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