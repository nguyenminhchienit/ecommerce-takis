const asyncHandler = require('express-async-handler')
const User = require('../models/user')

const handleRegister = asyncHandler(async (req, res) => {
    const { email, password, lastName, firstName, mobile } = req.body;
    if (!email || !password || !lastName || !firstName || !mobile) {
        return res.status(400).json({
            success: false,
            mes: "Missing params"
        })
    }

    const response = await User.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        mes: 'Create user successfully',
        response
    })
})

module.exports = {
    handleRegister
}