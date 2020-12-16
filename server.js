var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('db.json')
var middlewares = jsonServer.defaults()

function simpleAuth(req, res, next) {

    if (req.headers.authorization) {

        // user and password are stored in the authorization header
        // do whatever you want with them
        var user_and_password = new Buffer(req.headers.authorization.split(" ")[1], 'base64').toString();

        // for example, get the username
        var user_only = user_and_password.split(':')[0];
        var password_only = user_and_password.split(':')[1];

        /*
         *  I am not sure if you want to only send the user as a simple confirmation
         *  or you want to apply your own logic, like, really authenticate/validate
         *  the user against users database, static users .. etc
         *
         *  in production, it is recommended to validate the user by somehow.
         */
        if (user_only === "admin" & password_only === "admin") {
            next();
        } else {
            // it is not recommended in REST APIs to throw errors,
            // instead, we send 401 response with whatever erros
            // we want to expose to the client
            res.status(401).send({ error: 'unauthorized' })
        }

        // and save it in the request for later use in the `router.render` method
        // req.user = user_only;

        // continue doing json-server magic

    } else {
        // it is not recommended in REST APIs to throw errors,
        // instead, we send 401 response with whatever erros
        // we want to expose to the client
        res.status(401).send({ error: 'unauthorized' })
    }
}

// start setting up json-server middlewares
server.use(middlewares)

// before proceeding with any request, run `simpleAuth` function
// which should check for basic authentication header .. etc
server.use(simpleAuth);

// continue doing json-server magic
server.use(router);

// start listening to port 5000
server.listen(5000, function () {
    console.log('JSON Server is running on port 5000');
})
