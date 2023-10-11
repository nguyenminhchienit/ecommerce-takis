const express = require('express');
const brandController = require('../controllers/brandController');
const { verifyJWT, isAdmin } = require('../middleware/verifyJWT');

const router = express.Router();

router.get('/', brandController.handleGetAllBrand);
router.post('/', [verifyJWT, isAdmin], brandController.handleCreateBrand);
router.put('/:bid', [verifyJWT, isAdmin], brandController.handleUpdateBrandById);
router.delete('/:bid', [verifyJWT, isAdmin], brandController.handleDeleteBrandById);

module.exports = router