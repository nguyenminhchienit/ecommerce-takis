const express = require("express");
const userController = require("../controllers/userController");
const { verifyJWT, isAdmin } = require("../middleware/verifyJWT");

const router = express.Router();

router.post("/register", userController.handleRegisterWithAuthEMail);
router.post("/login", userController.handleLogin);
router.get("/final-create-account/:token", userController.handleFinalRegister);
router.get("/get-user-login", verifyJWT, userController.handleGetUserCurrent);
router.post("/refresh-token", userController.handleRefreshToken);
router.get("/logout", userController.handleLogout);
router.post("/forgot-password", userController.handleForgotPassword);
router.put("/reset-password", userController.handleResetPassword);
router.get("/", [verifyJWT, isAdmin], userController.handleGetAllUser);
router.delete("/", [verifyJWT, isAdmin], userController.handleDeleteUser);
router.put("/update-user-current", verifyJWT, userController.handleUpdateUser);
router.put("/update-address", verifyJWT, userController.handleUpdateAddress);
router.put("/update-cart", verifyJWT, userController.handleUpdateCart);
router.put(
  "/:_id",
  [verifyJWT, isAdmin],
  userController.handleUpdateUserByAdmin
);

module.exports = router;
