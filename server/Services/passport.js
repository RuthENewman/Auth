const passport = require('passport');
const User = require('../Models/User');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Set up options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // See if the user ID in the payload exists in the database
    User.findById(payload.sub, funtion(error, user){
        if (error) {
            return done(error, false)
        }
    });
    // If it doesn't call done without a user object
    if (user) {
        done(null, user);
    // If it does, call done with the user
    } else {
        done(null, false);
    }
});

// Tell passport to use this strategy
passport.use(jwtLogin);