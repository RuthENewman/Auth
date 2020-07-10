const Authentication = require('./Controllers/AuthenticationContoller');

module.exports = function(app) {
    app.post('/signup', Authentication.signup);
}