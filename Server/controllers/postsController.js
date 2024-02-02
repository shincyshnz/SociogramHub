const { handleUpload, ImageURIFormat } = require("../middleware/cloudinaryUpload");
const { PostsModel } = require('../model/posts');
const { UsersModel } = require("../model/users");

const createPosts = async (req, res, next) => {
    const { userId, caption, location, taggedUsers } = req.body;
    try {
        const isExists = UsersModel.findById({ _id: userId });
        if (!isExists) {
            customErrorMessage(400, "User doesnot exists. Please login Again");
        }
        if (req.file) {
            let dataURI = ImageURIFormat(req, res);
            const cldRes = await handleUpload(dataURI);
            postFile = cldRes.url;
        }

        let newTaggedUser = taggedUsers ?? [];
        const postData = PostsModel.create({ userId, postFile, caption, location, newTaggedUser });
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
    const { userId } = req.body;

    try {
        const {followers} = await UsersModel.findById({ _id: userId }).select("followers");
        console.log(followers, "==followersList");
        res.status(200).json({
            posts: "posts details"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createPosts,
    getAllPosts,
}