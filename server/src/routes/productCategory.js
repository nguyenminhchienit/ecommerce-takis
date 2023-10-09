const express = require('express');
const productCategoryController = require('../controllers/productCategoryController');
const { verifyJWT, isAdmin } = require('../middleware/verifyJWT');

const router = express.Router();

router.get('/', productCategoryController.handleGetAllProductCategory);
router.post('/', [verifyJWT, isAdmin], productCategoryController.handleCreateProductCategory);
router.put('/:pc_id', [verifyJWT, isAdmin], productCategoryController.handleUpdateProductCategoryById);
router.delete('/:pc_id', [verifyJWT, isAdmin], productCategoryController.handleDeleteProductCategoryById);

module.exports = router