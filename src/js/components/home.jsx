var React = require('react'),
    RedirectWhenLoggedIn = require('../mixins/redirect_when_logged_in');

var Home = React.createClass({

  mixins: [RedirectWhenLoggedIn],

  render: function () {
    return (
      <div>
        Home
      </div>
    );
  }

});

module.exports = Home;
