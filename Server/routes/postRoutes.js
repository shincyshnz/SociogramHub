const express = require('express');
const { createPosts } = require("../controllers/postsController");
const { checkAuth } = require('../middleware/checkAuth');
const { upload } = require('../middleware/cloudinaryUpload');
const router = express.Router();

router.post("/create", upload.single("postFile"), checkAuth, createPosts);

module.exports = router;