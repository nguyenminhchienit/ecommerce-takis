const asyncHandler = require('express-async-handler')
const Product = require('../models/product');
const slugify = require('slugify')

const handleCreateProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        throw new Error('Missing input');
    }
    if (req.body && req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    const product = await Product.create(req.body);
    return res.status(200).json({
        success: product ? true : false,
        mes: product ? 'Create a product successfully' : 'Create a product failed'
    })
})

const handleGetProductById = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (!pid) {
        throw new Error('Missing product id');
    }
    const product = await Product.findById({ _id: pid });
    return res.status(200).json({
        success: product ? true : false,
        data: product ? product : 'Get a product failed'
    })
})

const handleGetAllProduct = asyncHandler(async (req, res) => {
    const products = await Product.find();
    return res.status(200).json({
        success: products ? true : false,
        data: products ? products : 'Get all product failed'
    })
})

const handleUpdateProductById = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (!pid) {
        throw new Error('Missing product id');
    }
    if (req.body && req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    const product = await Product.findByIdAndUpdate({ _id: pid }, req.body, {new: true});
    return res.status(200).json({
        success: product ? true : false,
        data: product ? product : 'Update a product failed'
    })
})

const handleDeleteProductById = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (!pid) {
        throw new Error('Missing product id');
    }
    const product = await Product.findByIdAndDelete({ _id: pid });
    return res.status(200).json({
        success: product ? true : false,
        mes: product ? 'Delete a product successfully' : 'Delete a product failed'
    })
})

module.exports = {
    handleCreateProduct,
    handleGetProductById,
    handleGetAllProduct,
    handleUpdateProductById,
    handleDeleteProductById
}
