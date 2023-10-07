const express = require('express');
const userController = require('../controllers/userController');
const { verifyJWT } = require('../middleware/verifyJWT');

const router = express.Router();

router.post('/register', userController.handleRegister);
router.post('/login', userController.handleLogin);
router.get('/get-user-login', verifyJWT, userController.handleGetUserCurrent);
router.post('/refresh-token', userController.handleRefreshToken);
router.get('/logout', userController.handleLogout);
router.get('/forgot-password', userController.handleForgotPassword);
router.put('/reset-password', userController.handleResetPassword);

module.exports = router