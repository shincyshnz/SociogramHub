const express = require('express');
const { createPosts, getAllPosts, addComments } = require("../controllers/postsController");
const { checkAuth } = require('../middleware/checkAuth');
const { upload } = require('../middleware/cloudinaryUpload');
const router = express.Router();

router.post("/create", upload.single("postFile"), checkAuth, createPosts);
router.get("/getAllPosts", checkAuth, getAllPosts);

module.exports = router;