const mongoose = require("mongoose");
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
        const { userId: user, limit } = req.body;
        const userId = new mongoose.Types.ObjectId(user);

        const getUserQuery = UsersModel.findOne({ _id: userId });
        const followersList = await getUserQuery.populate("followers").select("followers, -_id");


        // // Suggested users if followers array empty
        // const randomSuggestions = UsersModel.aggregate([
        //     {
        //         $match: {
        //             _id: { $ne: userId }
        //         }
        //     }
        // ]);

        // // Suggested users if followers array is not empty
        // const followersExcludedSuggestions = UsersModel.aggregate([
        //     {
        //         $match: {
        //             $and: [
        //                 { _id: { $ne: userId } },
        //                 { _id: { $nin: followersList.followers } }
        //             ]
        //         }
        //     }
        // ]);
        
        // const suggestedUsers = followersList.length === 0
        //     ? await randomSuggestions.exec()
        //     : await followersExcludedSuggestions.exec();

        const suggestedUserPipeline = [
            {
                $match: {
                    _id: { $ne: userId },
                    $or: [
                        { followers: { $exists: false, $size: 0 } },
                        { _id: { $nin: followersList.followers } }
                    ]
                }
            },{
                $project : {
                    username : 1,
                    profile_pic : 1,
                }
            }
        ];

        const suggestedUsers = await UsersModel.aggregate(suggestedUserPipeline);

        res.status(200).json({
            allUsers: suggestedUsers,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUsers,
    getSuggestedUsers,
}