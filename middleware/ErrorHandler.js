function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            message: "Please Login!",
            error: err
        })

    } else if (err.name === 'ValidationError') {
        return res.status(401).json({
            message: "Please Login!",
            error: err
        })
    } else {
        next();
    }

    return res.status(500).json({
        message: "500 Internal Server Error",
        error: err
    })
}

module.exports = errorHandler;