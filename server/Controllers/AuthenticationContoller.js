const User = require('../Models/User');

exports.signup = function(request, response, next) {
    // See if a user with the given email address exists already
    const email = request.body.email;
    const password = request.body.password;

    User.findOne({ email: email }, function(error, existingUser) {

    });

     // If a user with the same email address exists, return a relevant error
    
    // If a user with the same email does NOT exist, create a user record



    // Respond to the request indicating a user was created


}