const mongoose = require("mongoose");
const { handleUpload, ImageURIFormat } = require("../middleware/cloudinaryUpload");
const { PostsModel } = require('../model/posts');
const { UsersModel } = require("../model/users");

const createPosts = async (req, res, next) => {
    const { userId, caption, location, taggedUsers } = req.body;
    try {
        const isExists = await UsersModel.findById({ _id: userId });

        if (!isExists) {
            customErrorMessage(400, "User doesnot exists. Please login Again");
        }
        if (req.file) {
            let dataURI = ImageURIFormat(req, res);
            const cldRes = await handleUpload(dataURI);
            postFile = cldRes.url;
        }

        let newTaggedUser = taggedUsers ?? [];
        const postData = PostsModel.create({ userId, username: isExists.username, postFile, caption, location, newTaggedUser });
        if (postData) {
            res.status(200).json({
                message: "Post created Succesfully"
            });
        }
    } catch (error) {
        next(error);
    }
}

const getAllPosts = async (req, res, next) => {
    let posts;
    const { userId } = req.body;

    try {
        const { followers } = await UsersModel.findById({ _id: userId }).select("followers.followerId");
        const followersArray = followers.map(follower => follower.followerId);

        const posts = await PostsModel.find({
            userId: {
                $in: followersArray
            }
        });
        res.status(200).json({
            posts: posts || 'No posts'
        });
    } catch (error) {
        next(error);
    }
}

const updatePostsCommentCount = async (postId) => {
    try {
        const postDetails = PostsModel.findByIdAndUpdate(
            postId,
            { $inc: { commentsCount: 1 } },
            { new: true },
        );
        return postDetails;

    } catch (error) {
        console.log(error);
    }
}

const getUserPosts = async (req, res, next) => {
    try {
        const { userId } = req.params;
        console.log(userId);
        const posts = await PostsModel.find({ userId });
        const user = await UsersModel.findOne({ _id: userId });

        const followers = user.followers.filter(follower => !follower.followed);
        const following = user.followers.filter(follower => follower.followed);

        if (posts) {
            res.status(200).json({
                posts: posts.reverse(),
                followers : followers.length,
                following : following.length,
            });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createPosts,
    getAllPosts,
    updatePostsCommentCount,
    getUserPosts,
}