module.exports.webReadDashboard = (req, res) => {

    res.render('pages/dashboard/index', {
        title: 'Dashboard',
        layout: 'layouts/app'
    })

}