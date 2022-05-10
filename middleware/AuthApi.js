const expressJwt = require('express-jwt');

function authJwt() {

    const secret = process.env.SECRET;
    const api = process.env.API_URL;

    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            { url: /\/api\/category(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/product(.*)/, methods: ['GET', 'OPTIONS'] },
            `${'/'}`,
            `${api}`,
            `${api}/login`,
            `${api}/register`,
        ]
    })
}


async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null, true)

    }
    done();
}

module.exports = authJwt;

