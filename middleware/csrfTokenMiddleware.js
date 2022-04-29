const csurf = require('csurf');
const csrfTokenMiddleware = csurf({ cookie: true })


module.exports = csrfTokenMiddleware;