module.exports = (req, res, next) => {
    res.header('X-Hello', 'World')
    next()
}

   // "start": "json-server --watch db.json --middlewares ./hello.js",
    // "test": "echo \"Error: no test specified\" && exit 1"
