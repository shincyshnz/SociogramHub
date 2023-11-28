const { handleUpload, ImageURIFormat } = require("../middleware/cloudinaryUpload");
const { PostsModel } = require('../model/posts');
const { UsersModel } = require("../model/users");

const createPosts = async (req, res, next) => {
    const { userId } = req.body;
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
        console.log(postFile);
        res.json();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createPosts,
}