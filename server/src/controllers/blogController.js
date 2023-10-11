const asyncHandler = require('express-async-handler')
const BlogSchema = require('../models/blog');

const handleCreateBlog = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;
    if (!title || !description || !category) {
        throw new Error('Missing input');
    }
    const blog = await BlogSchema.create(req.body);
    return res.status(200).json({
        success: blog ? true : false,
        mes: blog ? blog : 'Create blog failed'
    })
})

const handleUpdateBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    if (Object.keys(req.body).length === 0) {
        throw new Error('Missing input');
    }
    const blog = await BlogSchema.findByIdAndUpdate(bid,req.body,{new: true});
    return res.status(200).json({
        success: blog ? true : false,
        mes: blog ? blog : 'Update blog failed'
    })
})

const handleGetAllBlog = asyncHandler(async (req, res) => {
    const blog = await BlogSchema.find();
    return res.status(200).json({
        success: blog ? true : false,
        mes: blog ? blog : 'Get blog failed'
    })
})

const handleLikeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bid } = req.params;
    if (!bid) {
        throw new Error('Missing input');
    }
    const blog = await BlogSchema.findById(bid);
    //Kiem tra xem user nay da co dislike hay chua
    const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id);
    if (alreadyDisliked) {
        //Huy bo dislike
        const response = await BlogSchema.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true })
        // return res.status(200).json({
        //     success: response ? true : false,
        //     response
        // })
    }

    const alreadyLiked = blog?.likes?.find(el => el.toString() === _id);
    if (alreadyLiked) {
        const response = await BlogSchema.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            response
        })
    } else {
        const response = await BlogSchema.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            response
        })
    }

})

const handleDislikeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bid } = req.params;
    if (!bid) {
        throw new Error('Missing input');
    }
    const blog = await BlogSchema.findById(bid);
    //Kiem tra xem user nay da co dislike hay chua
    const alreadyLiked = blog?.likes?.find(el => el.toString() === _id);
    if (alreadyLiked) {
        //Huy bo like
        const response = await BlogSchema.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true })
        // return res.status(200).json({
        //     success: response ? true : false,
        //     response
        // })
    }

    const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id);
    if (alreadyDisliked) {
        const response = await BlogSchema.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            response
        })
    } else {
        const response = await BlogSchema.findByIdAndUpdate(bid, { $push: { dislikes: _id } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            response
        })
    }

})

const handleGetOneBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (!bid) {
        throw new Error('Missing input');
    }
    const blog = await BlogSchema.findByIdAndUpdate(bid, { $inc: { numberViews: 1 } }, { new: true })
        .populate('likes', 'firstName lastName')
        .populate('dislikes', 'firstName lastName')
    return res.status(200).json({
        success: blog ? true : false,
        blog: blog ? blog : 'Something wrong'
    })

})

const handleDeleteBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (!bid) {
        throw new Error('Missing input');
    }
    const blog = await BlogSchema.findByIdAndDelete(bid);
    return res.status(200).json({
        success: blog ? true : false,
        mes: blog ? 'Delete blog successfully' : 'Delete blog failed'
    })
})

module.exports = {
    handleCreateBlog,
    handleUpdateBlog,
    handleGetAllBlog,
    handleLikeBlog,
    handleDislikeBlog,
    handleGetOneBlog,
    handleDeleteBlog
}