'use-strict'

const api = require('./api/api');
const web = require('./web/web')

const routes = (router) => {

    router.get('/', (req, res) => {
        res.send('hello')

    })

    router.use('/api', api);
    router.use(web);


}

module.exports = routes;