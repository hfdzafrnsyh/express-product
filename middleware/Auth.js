const jwt = require('jsonwebtoken');



const authMiddleware = (req, res, next) => {

    const token = req.cookies['jwt'];
    const secret = process.env.SECRET;
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            res.redirect('/')
        }
        req.user = user;
        next()
    })

}


module.exports = authMiddleware;