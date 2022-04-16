'use-strict'

const api = require('./api/api');

const routes = (router) => {

    router.use('/api', api);

    router.get('/', (req, res) => {
        res.send('Hello from root')
    })

}

module.exports = routes;