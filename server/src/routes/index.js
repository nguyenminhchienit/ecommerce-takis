const { notFound, errorHandler } = require('../middleware/errorHandle');
const UserRoute = require('./user')
const ProductRoute = require('./product')
const ProductCategoryRoute = require('./productCategory')
const BlogCategoryRoute = require('./blogCategory')
const BlogRoute = require('./blog');
const BrandRoute = require('./brand');
const CouponRoute = require('./coupon');


const initRoute = (app) => {
    app.use('/api/v1/user', UserRoute);
    app.use('/api/v1/product', ProductRoute);
    app.use('/api/v1/product-category', ProductCategoryRoute);
    app.use('/api/v1/blog-category', BlogCategoryRoute);
    app.use('/api/v1/blog', BlogRoute);
    app.use('/api/v1/brand', BrandRoute);
    app.use('/api/v1/coupon', CouponRoute);
    
    //Middleware handle error
    app.use(notFound);
    app.use(errorHandler);
}

module.exports = initRoute