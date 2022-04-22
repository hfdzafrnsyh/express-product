const jwt = require('jsonwebtoken');

module.exports.webReadDashboard = (req, res) => {

    const secret = process.env.SECRET;
    jwt.verify(req.cookies['jwt'], secret, (err, decoded) => {

        if (err) {
            res.redirect('/')
        } else {
            res.render('pages/dashboard/index', {
                title: 'Dashboard',
                layout: 'layouts/app',
                user: decoded
            })
        }
    })




}