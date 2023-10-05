const asyncHandler = require('express-async-handler')
const User = require('../models/user');
const { createJWT, createRefreshToken } = require('../middleware/createJWT');
const jwt = require('jsonwebtoken')

const key = "nguyenminhchienit"; // tam thoi hard code do bi loi .env

const handleRegister = asyncHandler(async (req, res) => {
    const { email, password, lastName, firstName, mobile } = req.body;
    if (!email || !password || !lastName || !firstName || !mobile) {
        return res.status(400).json({
            success: false,
            mes: "Missing params"
        })
    }
    const user = await User.findOne({ email: email })
    if (user) {
        throw new Error("User has existed");
    } else {       
        const response = await User.create(req.body);
        return res.status(200).json({
            success: response ? true : false,
            mes: response ? 'Register user successfully' : 'Something wrong'
        })
    }
})


//Refresh token: cap token moi
//Access token: xac thuc nguoi dung, phan quyen nguoi dung
const handleLogin = asyncHandler(async (req, res) => {
    const { email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            mes: "Missing params"
        })
    }
    const user = await User.findOne({ email: email })
    if (user && await user.checkPassword(password)) {
        const { password, role, ...userData } = user.toObject();

        const payload = {
            _id: user._id,
            role: role
        }
        //Tao access token
        const token = createJWT(payload);

        //Tao refresh token
        const refreshToken = createRefreshToken({ _id: user._id })
        
        //Luu refresh token vao db
        await User.findByIdAndUpdate(user._id, { refreshToken: refreshToken }, { new: true })
        
        //Luu refresh token vao cookies
        res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000})

        return res.status(200).json({
            success: true,
            mes: 'Login successfully',
            access_token: token,
            data: userData
        })
    }   
    else {       
        throw new Error("Invalid credentials");       
    }
})

const handleGetUserCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    if (!_id) {
        return res.status(400).json({
            success: false,
            mes: "Missing params"
        })
    }
    const user = await User.findById({_id: _id}).select('-refreshToken -password -role')
    if (user) {
        return res.status(200).json({
            success: true,
            mes: 'Get user current successfully',
            data: user
        })
    } else {       
        throw new Error('User not exist');
    }
})

const handleRefreshToken = asyncHandler(async (req, res) => {
    //Lay token tu cookies
    const cookie = req.cookies;
    //Check xem token co ton tai o cookies hay khong
    if (!cookie || !cookie.refreshToken) {
        throw new Error ('No refresh token in cookie')
    }
    //Check xem token co hop le khong
    const rs = await jwt.verify(cookie.refreshToken, key); // dung thi tra ve decode (_id) sai thi tra ve jwt expires
    const response = await User.findOne({ _id: rs._id, refreshToken: cookie.refreshToken })
    if (response) {
        const payload = {
            _id: response._id,
            role: response.role
        }
        return res.status(200).json({
            success: response ? true : false,
            newAccessToken: response ? createJWT(payload) : 'Refresh token not matched' 
        })
    } else {
        throw new Error ('Not found user by refresh token')
    }
})

const handleLogout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie || !cookie.refreshToken) {
        throw new Error ('No refresh token in cookie')
    }
    //Tim va xoa refresh token o db
    await User.findOneAndUpdate({
        refreshToken: cookie.refreshToken
    }, { refreshToken: '' }, { new: true });

    //Xoa token o cookie
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })

    return res.status(200).json({
        success: true,
        mes: 'Logout success'
    })

})

module.exports = {
    handleRegister,
    handleLogin,
    handleLogout,
    handleGetUserCurrent,
    handleRefreshToken
}