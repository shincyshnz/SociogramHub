const express = require('express');
const { createPosts, getAllPosts, getUserPosts } = require("../controllers/postsController");
const { checkAuth } = require('../middleware/checkAuth');
const { upload } = require('../middleware/cloudinaryUpload');
const router = express.Router();

router.post("/create", upload.single("postFile"), checkAuth, createPosts);
router.get("/getAllPosts", checkAuth, getAllPosts);
router.get("/userPosts", checkAuth, getUserPosts);

module.exports = router;