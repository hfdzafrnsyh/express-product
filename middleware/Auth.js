const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {

    const token = req.cookies['jwt'];
    const secret = process.env.SECRET;
    jwt.verify(token, secret, (err, user) => {

        req.user = user;

        if (err) {
            res.redirect('/')
        } else if (req.user.isAdmin == false) {
            res.redirect('/')
        }

        next()
    })

}


module.exports = authMiddleware;