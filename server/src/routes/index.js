const UserRoute = require('./user')

const initRoute = (app) => {
    app.use('/api/v1/user', UserRoute);
}

module.exports = initRoute