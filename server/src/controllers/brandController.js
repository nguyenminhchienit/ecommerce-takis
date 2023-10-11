const asyncHandler = require('express-async-handler')
const Brand = require('../models/brand');
const slugify = require('slugify')

const handleCreateBrand = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        throw new Error('Missing input');
    }
    if (req.body && req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    const brand = await Brand.create(req.body);
    return res.status(200).json({
        success: brand ? true : false,
        mes: brand ? 'Create a brand successfully' : 'Create a brand failed'
    })
})

const handleGetAllBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.find();
    return res.status(200).json({
        success: brand ? true : false,
        brand: brand ? brand : 'Create a brand failed'
    })
})

const handleUpdateBrandById = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (!bid) {
        throw new Error('Missing brand id');
    }
    if (req.body && req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    const brand = await Brand.findByIdAndUpdate(bid, req.body, {new: true});
    return res.status(200).json({
        success: brand ? true : false,
        brand: brand ? brand : 'Update a brand failed'
    })
})

const handleDeleteBrandById = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (!bid) {
        throw new Error('Missing brand id');
    }
    const brand = await Brand.findByIdAndDelete(bid);
    return res.status(200).json({
        success: brand ? true : false,
        mes: brand ? 'Delete a brand successfully' : 'Delete a brand failed'
    })
})

const handleGetBrandById = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (!bid) {
        throw new Error('Missing brand id');
    }
    const brand = await Brand.findById(bid);
    return res.status(200).json({
        success: brand ? true : false,
        brand: brand ? brand : 'Get a brand failed'
    })
})


module.exports = {
    handleCreateBrand,
    handleDeleteBrandById,
    handleGetAllBrand,
    handleGetBrandById,
    handleUpdateBrandById
}
