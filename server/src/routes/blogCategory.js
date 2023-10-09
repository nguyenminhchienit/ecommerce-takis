const express = require('express');
const blogCategoryController = require('../controllers/blogCategoryController');
const { verifyJWT, isAdmin } = require('../middleware/verifyJWT');

const router = express.Router();

router.get('/', blogCategoryController.handleGetAllBlogCategory);
router.post('/', [verifyJWT, isAdmin], blogCategoryController.handleCreateBlogCategory);
router.put('/:bc_id', [verifyJWT, isAdmin], blogCategoryController.handleUpdateBlogCategoryById);
router.delete('/:bc_id', [verifyJWT, isAdmin], blogCategoryController.handleDeleteBlogCategoryById);

module.exports = router