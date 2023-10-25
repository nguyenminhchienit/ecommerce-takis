const asyncHandler = require('express-async-handler')
const Order = require('../models/order');
const User = require('../models/user');

const handleCreateOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const userCart = await User.findById(_id).select('cart');
    return res.status(200).json({
        success: true ? true : false,
        mes: true ? '' : ''
    })
})

module.exports = {
    handleCreateOrder
}