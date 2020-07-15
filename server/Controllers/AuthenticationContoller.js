const jwt = require('jwt-simple');
const User = require('../Models/User');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(request, response, next) {
    // See if a user with the given email address exists already
    const email = request.body.email;
    const password = request.body.password;

    if (!email || !password) {
        return response.status(422).send({ error: "Both email and password are required" });
    }

    User.findOne({ email: email }, function(error, existingUser) {
        if (error) {
            return next(error);
        }
        if (existingUser) {
            return response.status(422).send({ error: "Email address already in use."});
        }

        const user = new User({
            email: email,
            password: password
        });

        user.save(function(error) {
            if (error) {
                return next(error);
            }
        // Respond to the request indicating a user was created
            response.json({ token: tokenForUser(user) });
        });
    });
}