const express = require("express");
const productController = require("../controllers/productController");
const { verifyJWT, isAdmin } = require("../middleware/verifyJWT");
const uploadCloud = require("../config/cloudinary.config");

const router = express.Router();

router.post(
  "/",
  [verifyJWT, isAdmin],
  uploadCloud.fields([
    { name: "image", maxCount: 10 },
    { name: "thumb", maxCount: 1 },
  ]),
  productController.handleCreateProduct
);
router.get("/", productController.handleGetAllProduct);
router.put("/rating", verifyJWT, productController.handleRatings);

router.put(
  "/variants/:pid",
  [verifyJWT, isAdmin],
  uploadCloud.fields([
    { name: "image", maxCount: 10 },
    { name: "thumb", maxCount: 1 },
  ]),
  productController.handelAddVariants
);

router.put(
  "/upload-img/:pid",
  [verifyJWT, isAdmin],
  uploadCloud.array("image", 10),
  productController.handleUploadImgProduct
);
router.put(
  "/:pid",
  [verifyJWT, isAdmin],
  uploadCloud.fields([
    { name: "image", maxCount: 10 },
    { name: "thumb", maxCount: 1 },
  ]),
  productController.handleUpdateProductById
);
router.delete(
  "/:pid",
  [verifyJWT, isAdmin],
  productController.handleDeleteProductById
);
router.get("/:pid", productController.handleGetProductById);

module.exports = router;
