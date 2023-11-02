const express = require('express');
const orderController = require('../controllers/orderController');
const { verifyJWT, isAdmin } = require('../middleware/verifyJWT');
const uploadCloud = require('../config/cloudinary.config');

const router = express.Router();

router.post('/', [verifyJWT], orderController.handleCreateOrder);
router.get('/user-order', [verifyJWT], orderController.handleGetOrderByUser);
router.get('/', [verifyJWT, isAdmin], orderController.handleGetOrderByAdmin);
router.put('/update-status/:oid',[verifyJWT], orderController.handleUpdateStatusOrder);


module.exports = router