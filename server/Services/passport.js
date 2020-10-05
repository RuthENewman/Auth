const passport = require('passport');
const User = require('../Models/User');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    // Verify the username and password, call done with the user
    // If it is the correct username and password
    // Else call done with false
    User.findOne({ email: email }, function(error, user) {
        if (error) {
            return done(error);
        }

        if (!user) {
            return done(null, false);
        }

        // compare passwords
        user.comparePassword(password, function(error, isMatch) {
            if (error) {
                return done(error);
            }
            if (!isMatch) {
                return done(null, false);
            }
            return done(null, user);
        });
    });
});

// Set up options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // See if the user ID in the payload exists in the database
    User.findById(payload.sub, function(error, user) {
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
passport.use(localLogin);