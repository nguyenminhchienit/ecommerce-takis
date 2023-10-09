const asyncHandler = require('express-async-handler')
const BlogCateGory = require('../models/blogCategory');
const slugify = require('slugify')

const handleCreateBlogCategory = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        throw new Error('Missing input');
    }
    if (req.body && req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    const blogCategory = await BlogCateGory.create(req.body);
    return res.status(200).json({
        success: blogCategory ? true : false,
        mes: blogCategory ? 'Create a blog category successfully' : 'Create a blog category failed'
    })
})

const handleGetAllBlogCategory = asyncHandler(async (req, res) => {
    const blogCategory = await BlogCateGory.find();
    return res.status(200).json({
        success: blogCategory ? true : false,
        blogCategory: blogCategory ? blogCategory : 'Create a blog category failed'
    })
})

const handleUpdateBlogCategoryById = asyncHandler(async (req, res) => {
    const { bc_id } = req.params;
    if (!bc_id) {
        throw new Error('Missing blog category id');
    }
    if (req.body && req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    const blogCategory = await BlogCateGory.findByIdAndUpdate(bc_id, req.body, {new: true});
    return res.status(200).json({
        success: blogCategory ? true : false,
        data: blogCategory ? blogCategory : 'Update a blog category failed'
    })
})

const handleDeleteBlogCategoryById = asyncHandler(async (req, res) => {
    const { bc_id } = req.params;
    if (!bc_id) {
        throw new Error('Missing blog category id');
    }
    const blogCategory = await BlogCateGory.findByIdAndDelete(bc_id);
    return res.status(200).json({
        success: blogCategory ? true : false,
        mes: blogCategory ? 'Delete a blog category successfully' : 'Delete a blog category failed'
    })
})


module.exports = {
    handleCreateBlogCategory,
    handleGetAllBlogCategory,
    handleUpdateBlogCategoryById,
    handleDeleteBlogCategoryById
}
