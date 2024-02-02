const { UsersModel } = require("../model/users");

// Get all users matching the search name string from client
const getUsers = async (req, res, next) => {
    try {
        const { name } = req.query;
        let condition = { $or: [{ username: { $regex: name, $options: "i" } }, { fullname: { $regex: name, $options: "i" } }] };
        const users = await UsersModel.find(condition).select("username fullname");
        res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
};

const getSuggestedUsers = async (req, res, next) => {
    try {
        const { userId, limit } = req.body;
        console.log(userId, "==userId");
        const followerList = await UsersModel.findById({ _id: userId });
        console.log(followerList);
        const suggestedUsers = await UsersModel.find().limit(20).select("name", "profile_pic", "followers");
        res.status(200).json({
            allUsers: followerList,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUsers,
    getSuggestedUsers,
}