const express = require('express');
const blogController = require('../controllers/blogController');
const { verifyJWT, isAdmin } = require('../middleware/verifyJWT');

const router = express.Router();

router.get('/', blogController.handleGetAllBlog);
router.post('/', [verifyJWT, isAdmin], blogController.handleCreateBlog);
router.put('/like', verifyJWT, blogController.handleLikeBlog);
router.put('/:bid', [verifyJWT, isAdmin], blogController.handleUpdateBlog);

module.exports = router