const { notFound, errorHandler } = require('../middleware/errorHandle');
const UserRoute = require('./user')
const ProductRoute = require('./product')

const initRoute = (app) => {
    app.use('/api/v1/user', UserRoute);
    app.use('/api/v1/product', ProductRoute);


    //Middleware handle error
    app.use(notFound);
    app.use(errorHandler);
}

module.exports = initRoute