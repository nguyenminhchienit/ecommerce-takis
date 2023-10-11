const asyncHandler = require('express-async-handler')
const Coupon = require('../models/coupon');
const slugify = require('slugify')

const handleCreateCoupon = asyncHandler(async (req, res) => {
    const { name, discount, expires } = req.body;
    if (!name || !discount || !expires) {
        throw new Error('Missing input');
    }
    const coupon = await Coupon.create({
        ...req.body,
        expires: Date.now() + +expires * 24 * 60 * 60 * 1000
    });
    return res.status(200).json({
        success: coupon ? true : false,
        mes: coupon ? 'Create a coupon successfully' : 'Create a coupon failed'
    })
})

const handleGetAllCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.find();
    return res.status(200).json({
        success: coupon ? true : false,
        coupon: coupon ? coupon : 'Create a coupon failed'
    })
})

const handleUpdateCouponById = asyncHandler(async (req, res) => {
    const { cid } = req.params;
    if (!cid) {
        throw new Error('Missing coupon id');
    }

    if (req.body.expires) {
        req.body.expires = Date.now() + +req.body.expires * 24 * 60 * 60 * 1000;
    }
    const coupon = await Coupon.findByIdAndUpdate(cid, req.body, { new: true });
    
    return res.status(200).json({
        success: coupon ? true : false,
        data: coupon ? coupon : 'Update a coupon failed'
    })
})

const handleDeleteCouponById = asyncHandler(async (req, res) => {
    const { cid } = req.params;
    if (!cid) {
        throw new Error('Missing coupon id');
    }
    const coupon = await Coupon.findByIdAndDelete(cid);
    return res.status(200).json({
        success: coupon ? true : false,
        mes: coupon ? 'Delete a coupon successfully' : 'Delete a coupon failed'
    })
})


module.exports = {
    handleCreateCoupon,
    handleGetAllCoupon,
    handleUpdateCouponById,
    handleDeleteCouponById,
}
