const express = require("express");
const userController = require("../controllers/userController");
const { verifyJWT, isAdmin } = require("../middleware/verifyJWT");
const uploadCloud = require("../config/cloudinary.config");

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
router.put(
  "/update-user-current",
  verifyJWT,
  uploadCloud.single("avatar"),
  userController.handleUpdateUser
);
router.put("/update-address", verifyJWT, userController.handleUpdateAddress);
router.put("/update-cart", verifyJWT, userController.handleUpdateCart);

router.delete("/:uid", [verifyJWT, isAdmin], userController.handleDeleteUser);
router.put(
  "/:uid",
  [verifyJWT, isAdmin],
  userController.handleUpdateUserByAdmin
);
router.delete(
  "/remove-cart/:pid/:color",
  [verifyJWT],
  userController.handleRemoveInCart
);

module.exports = router;
