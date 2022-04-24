const jwt = require('jsonwebtoken');
const Model = require('../models/index');
const User = Model.users;

module.exports.webReadDashboard = async (req, res) => {


    const user = await User.findOne({ where: { id: req.user.userId } });

    res.render('pages/dashboard/index', {
        title: 'Dashboard',
        layout: 'layouts/app',
        user: user
    })

}