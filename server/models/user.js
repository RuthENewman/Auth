const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

// On save hook, encrypt password
userSchema.pre('save', function(next) {
    // Get access to the user model
    const user = this;

    // Generate a salt
    bcrypt.genSalt(10, function(error, salt) {
        if (error) {
            return next(error);
        }

        // Hash password using the salt
        bcrypt.hash(user.password, salt, null, function(error, hash) {
            if (error) {
                return next(error);
            }

            user.password = hash;
            next();
        })
    });
});

// Create the model class
const ModelClass = mongoose.model('User', userSchema);

// Export the model
module.exports = ModelClass;