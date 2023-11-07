const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
const ProductCategory = require("../models/productCategory");
const slugify = require("slugify");
const data = require("../../../data/data2.json");
const dataCate = require("../../../data/cate_brand");

const fProduct = asyncHandler(async (p) => {
  await ProductCategory.create({
    title: p?.name,
    slug: slugify(p?.name) + Math.round(Math.random() * 100) + "",
    description: p?.description,
    brand: p?.brand,
    price: Math.round(Number(p?.price?.match(/\d/g).join("")) / 100),
    category: p?.category[1],
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: p?.images,
    color: p?.variants?.find((el) => el.label === "Color")?.variants[0],
  });
});

const insertDataProduct = asyncHandler(async (req, res) => {
  const promises = [];
  for (let item of data) {
    promises.push(fProduct(item));
  }
  await Promise.all(promises);
  return res.json("Done");
});

const fCate = asyncHandler(async (c) => {
  console.log(c?.cate);
  await ProductCategory.create({
    title: c?.cate,
    brand: c?.brand,
    slug: slugify(c?.cate) + Math.round(Math.random() * 100) + "",
  });
});

const insertDataCate = asyncHandler(async (req, res) => {
  const promises = [];
  for (let item of dataCate) {
    promises.push(fCate(item));
  }
  await Promise.all(promises);
  return res.json("Done");
});

module.exports = {
  insertDataProduct,
  insertDataCate,
};
