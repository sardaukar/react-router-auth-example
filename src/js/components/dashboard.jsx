var React = require('react'),
    Authentication = require('../mixins/authentication'),
    auth = require('../services/auth');

var Dashboard = React.createClass({

  mixins: [ Authentication ],

  render: function () {
    var token = auth.getToken();
    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>Token: {token}</p>
      </div>
    );
  }
});

module.exports = Dashboard;