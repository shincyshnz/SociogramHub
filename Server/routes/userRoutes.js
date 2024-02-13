const express = require("express");
const router = express.Router();

const {
    getUsers,
    getSuggestedUsers,
    followUser,
    unfollowUser,
} = require("../controllers/userController");
const { checkAuth } = require("../middleware/checkAuth");

router.get('/searchUser', getUsers);
router.get('/suggestedUsers',checkAuth, getSuggestedUsers);
router.post('/(:id)/follow',checkAuth, followUser);
router.post('/(:id)/unfollow',checkAuth, unfollowUser);

module.exports = router;