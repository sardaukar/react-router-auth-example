var React = require('react'),
    auth = require('../services/auth');

var Logout = React.createClass({

  statics: {
    willTransitionTo: function (transition) {
      if ( !auth.loggedIn()) {
        transition.redirect('/');
      }
    }
  },

  componentDidMount: function () {
    auth.logout();
  },
  render: function () {
    return <p>You are now logged out</p>;
  }
});

module.exports = Logout;