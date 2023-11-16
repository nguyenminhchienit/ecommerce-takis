const asyncHandler = require("express-async-handler");
const ProductCateGory = require("../models/productCategory");
const slugify = require("slugify");

const handleCreateProductCategory = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new Error("Missing input");
  }
  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const productCategory = await ProductCateGory.create(req.body);
  return res.status(200).json({
    success: productCategory ? true : false,
    mes: productCategory
      ? "Create a product category successfully"
      : "Create a product category failed",
  });
});

const handleGetAllProductCategory = asyncHandler(async (req, res) => {
  const productCategory = await ProductCateGory.find();
  return res.status(200).json({
    success: productCategory ? true : false,
    productCategories: productCategory
      ? productCategory
      : "Create a product category failed",
  });
});

const handleUpdateProductCategoryById = asyncHandler(async (req, res) => {
  const { pc_id } = req.params;
  if (!pc_id) {
    throw new Error("Missing product category id");
  }
  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const productCategory = await ProductCateGory.findByIdAndUpdate(
    pc_id,
    req.body,
    { new: true }
  );
  return res.status(200).json({
    success: productCategory ? true : false,
    productCategory: productCategory
      ? productCategory
      : "Update a product category failed",
  });
});

const handleDeleteProductCategoryById = asyncHandler(async (req, res) => {
  const { pc_id } = req.params;
  if (!pc_id) {
    throw new Error("Missing product id");
  }
  const productCategory = await ProductCateGory.findByIdAndDelete(pc_id);
  return res.status(200).json({
    success: productCategory ? true : false,
    mes: productCategory
      ? "Delete a product category successfully"
      : "Delete a product category failed",
  });
});

module.exports = {
  handleCreateProductCategory,
  handleGetAllProductCategory,
  handleUpdateProductCategoryById,
  handleDeleteProductCategoryById,
};
