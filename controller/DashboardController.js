const jwt = require('jsonwebtoken');

module.exports.webReadDashboard = (req, res) => {



    const jwtUser = req.cookies['jwt'];

    if (jwtUser) {
        res.render('pages/dashboard/index', {
            title: 'Dashboard',
            layout: 'layouts/app',
            users: req.cookies['jwt']
        })
    } else {
        res.redirect('/')
    }



}