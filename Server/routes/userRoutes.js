const express = require("express");
const router = express.Router();

const {
    getUsers,
    getSuggestedUsers,
} = require("../controllers/userController");
const { checkAuth } = require("../middleware/checkAuth");

router.get('/searchUser', getUsers);
router.get('/suggestedUsers',checkAuth, getSuggestedUsers);

module.exports = router;