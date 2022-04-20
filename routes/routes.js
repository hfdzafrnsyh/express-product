'use-strict'

const web = require('./web/web');
const api = require('./api/api');

const routes = (router) => {

    router.use(web);
    router.use('/api', api);

    router.get('/', (req, res) => {
        res.render('pages/index', {
            title: 'Web Node Express',
            layout: false
        });
    })

}

module.exports = routes;