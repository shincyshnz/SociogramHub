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

// Get all suggested users for a person who are not in their followerlist
const getSuggestedUsers = async (req, res, next) => {
    try {
        const { userId: user } = req.body;
        const limit = parseInt(req.query.limit);

        if (!limit) {
            throw new Error("Issue with the API request. Check the Limit");
        }

        const userId = new mongoose.Types.ObjectId(user);

        const getUserQuery = UsersModel.findOne({ _id: userId });
        const followersList = await getUserQuery.populate("followers").select("followers, -_id");
        const excludedFollowersList = followersList.followers.map(followers => followers.followerId);

        const suggestedUserPipeline = [
            {
                $match: {
                    $and: [
                        { _id: { $ne: userId } },
                        { _id: { $nin: excludedFollowersList } }
                    ]
                }
            }, {
                $project: {
                    username: 1,
                    profile_pic: 1,
                }
            }, {
                $limit: limit,
            }
        ];

        const suggestedUsers = await UsersModel.aggregate(suggestedUserPipeline);

        res.status(200).json({
            suggestedUsers,
        });
    } catch (error) {
        next(error);
    }
}

// Add user to follower List
const followUser = async (req, res, next) => {
    const { userId: profileId } = req.body;
    const followerId = new mongoose.Types.ObjectId(req.params.id);
console.log("follow/Unfollow");
    try {
        const isUserExists = await UsersModel.findById({ _id: profileId });
        if (!isUserExists) {
            throw new Error("User doesnot exists. Please log in again!");
        }

        const followerDetails = isUserExists.followers.filter((follower) =>
            (follower.followerId.equals(followerId)));

        const query = (followerDetails.length > 0)
            ? {
                // Unfollow user 
                $pull: {
                    followers: {
                        $in: [{
                            followerId: followerDetails[0].followerId,
                            followed: followerDetails[0].followed,
                        }]
                    },
                }
            } : {
                // follow user 
                $push: {
                    followers: {
                        followerId,
                        followed: false,
                    }
                }
            };

        const isFollowersUpdate = await UsersModel.findByIdAndUpdate(
            { _id: profileId },
            query,
            { new: true }
        ).populate("followers");

        res.status(200).json({
            message: "followed"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUsers,
    getSuggestedUsers,
    followUser,
}