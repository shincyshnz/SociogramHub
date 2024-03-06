const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middleware/checkAuth");
const { addComments } = require("../controllers/commentsController");

router.post("/addComments", checkAuth, addComments);

module.exports = router;