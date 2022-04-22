'use-strict'

const web = require('./web/web');
const api = require('./api/api');

const routes = (router) => {

    router.get('/', (req, res) => {
        res.render('pages/index', {
            title: 'Web Node Express',
            layout: false
        });
    })

    router.use('/api', api);



}

module.exports = routes;