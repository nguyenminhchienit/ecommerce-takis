const express = require('express');
const couponController = require('../controllers/couponController');
const { verifyJWT, isAdmin } = require('../middleware/verifyJWT');

const router = express.Router();

router.get('/', couponController.handleGetAllCoupon);
router.post('/', [verifyJWT, isAdmin], couponController.handleCreateCoupon);
router.put('/:cid', [verifyJWT, isAdmin], couponController.handleUpdateCouponById);
router.delete('/:cid', [verifyJWT, isAdmin], couponController.handleDeleteCouponById);

module.exports = router