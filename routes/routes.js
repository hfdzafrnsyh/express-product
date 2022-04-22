'use-strict'

const api = require('./api/api');

const routes = (router) => {

    router.get('/', (req, res) => {
        res.send('hello')
    })

    router.use('/api', api);



}

module.exports = routes;