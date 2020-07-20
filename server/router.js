const Authentication = require('./Controllers/AuthenticationContoller');
const passportService = require('./Services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
    app.get('/', requireAuth, function(request, response) {
        response.send({ hi: 'there' });
    })
    app.post('/login', requireLogin, Authentication.login);
    app.post('/signup', Authentication.signup);
}