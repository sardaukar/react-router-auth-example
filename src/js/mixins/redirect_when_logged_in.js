var auth = require('../services/auth');

var RedirectWhenLoggedIn = {
  statics: {
    willTransitionTo: function (transition) {
      if ( auth.loggedIn()) {
        transition.redirect('/dashboard');
      }
    }
  }
};

module.exports = RedirectWhenLoggedIn;