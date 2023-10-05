const { notFound, errorHandler } = require('../middleware/errorHandle');
const UserRoute = require('./user')

const initRoute = (app) => {
    app.use('/api/v1/user', UserRoute);


    //Middleware handle error
    app.use(notFound);
    app.use(errorHandler);
}

module.exports = initRoute