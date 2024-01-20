const express = require("express");
const router = express.Router();

const {
    getUsers,
    getSuggestedUsers,
} = require("../controllers/userController");

router.get('/searchUser', getUsers);
router.get('/suggestedUsers', getSuggestedUsers);

module.exports = router;