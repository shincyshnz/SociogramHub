const express = require("express");
const router = express.Router();

const {
    getUsers,
    getSuggestedUsers,
    followUser
} = require("../controllers/userController");
const { checkAuth } = require("../middleware/checkAuth");

router.get('/searchUser', getUsers);
router.get('/suggestedUsers',checkAuth, getSuggestedUsers);
router.post('/(:id)/follow',checkAuth, followUser);

module.exports = router;