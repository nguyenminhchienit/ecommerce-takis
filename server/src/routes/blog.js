const express = require('express');
const blogController = require('../controllers/blogController');
const { verifyJWT, isAdmin } = require('../middleware/verifyJWT');

const router = express.Router();

router.get('/', blogController.handleGetAllBlog);
router.post('/', [verifyJWT, isAdmin], blogController.handleCreateBlog);
router.get('/one/:bid', blogController.handleGetOneBlog);
router.put('/like/:bid', verifyJWT, blogController.handleLikeBlog);
router.put('/dislike/:bid', verifyJWT, blogController.handleDislikeBlog);
router.put('/:bid', [verifyJWT, isAdmin], blogController.handleUpdateBlog);
router.delete('/:bid', [verifyJWT, isAdmin], blogController.handleDeleteBlog);

module.exports = router