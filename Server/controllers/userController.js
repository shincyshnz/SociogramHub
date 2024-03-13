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

const handleFolowerListUpdate = async (userId, query) => {
    const isFollowersUpdate = await UsersModel.findByIdAndUpdate(
        { _id: userId },
        query,
        { new: true }
    ).populate("followers");
    return isFollowersUpdate;
}

// Add user to follower List
const followUser = async (req, res, next) => {
    let query, followed = false;
    const { userId: profileId } = req.body;
    const followerId = new mongoose.Types.ObjectId(req.params.id);

    try {
        // ---- Following a user who is already following us -----

        // check our userId is inside followerId's follower list
        const isUserExists = await UsersModel.findById({ _id: followerId });

        // Retrieve followers array of followerId, check profileId exists in followers Array of followerId
        const isProfileIdExistsInFollowerIdDocument = isUserExists.followers.filter((follower) =>
            (follower.followerId.equals(profileId)));

        if (isProfileIdExistsInFollowerIdDocument.length > 0) {
            // since followerId is following profileId, make followed : true before pushing
            followed = true;

            // update followed : true, inside followerId's document
            query = {
                $set: {
                    followers: {
                        followerId: profileId,
                        followed: true,
                    }
                }
            }
            await handleFolowerListUpdate(followerId, query);
        }

        // ---- Following a user who is NOT already following us, ----
        //  followed : false otherwise followed :true while pushing
        query = {
            $addToSet: {
                followers: {
                    followerId,
                    followed,
                }
            }
        }
        const isFollowersUpdate = await handleFolowerListUpdate(profileId, query);

        isFollowersUpdate && res.status(200).json({
            message: "followed"
        });
    } catch (error) {
        next(error);
    }
}

// Remove user from folower list
const unfollowUser = async (req, res, next) => {
    let query;
    const { userId: profileId } = req.body;
    const followerId = new mongoose.Types.ObjectId(req.params.id);

    try {
        const isUserExists = await UsersModel.findById({ _id: profileId });
        const followerDetails = isUserExists.followers.filter((follower) =>
            (follower.followerId.equals(followerId)));

        // If follower ID is not in the followers array in user document
        if (followerDetails.length < 0) {
            throw new Error("Something went wrong. Please try again later!");
        }

        /***
         * If followerId exists in followers Array
         * 1. check followed : true, if yes, 
         *      1a. update followed:false  for folowerId
         * 2. remove followerId and followed
         */

        if (followerDetails[0].followed) {
            query = {
                $set: {
                    followers: {
                        followerId: profileId,
                        followed: false,
                    }
                }
            }
            await handleFolowerListUpdate(followerId, query);
        }

        query = {
            // Unfollow user 
            $pull: {
                followers: {
                    $in: [{
                        followerId: followerDetails[0].followerId,
                        followed: followerDetails[0].followed,
                    }]
                },
            }
        };

        const isFollowersUpdate = await handleFolowerListUpdate(profileId, query);

        isFollowersUpdate && res.status(200).json({
            message: "unfollowed"
        });
    } catch (error) {
        next(error);
    }
}

// Get profile details matching the userId
const getProfile = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await UserModal.findById({ userId }).select("-password");
        if (user) {
            res.status(200).json({
                result: user,
            })
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    getSuggestedUsers,
    getProfile,
    followUser,
    unfollowUser,
}