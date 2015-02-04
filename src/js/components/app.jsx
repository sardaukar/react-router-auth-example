var React = require('react'),
    Router = require('react-router'),
    { Route, RouteHandler, Link } = Router,
    auth = require('../services/auth');

var App = React.createClass({

  getInitialState: function () {
    return {
      loggedIn: auth.loggedIn()
    };
  },

  setStateOnAuth: function (loggedIn) {
    this.setState({
      loggedIn: loggedIn
    });
  },

  componentWillMount: function () {
    auth.onChange = this.setStateOnAuth;
    auth.login();
  },

  render: function () {
    var loginOrOut = this.state.loggedIn ?
      <Link to="logout">Log out</Link> :
      <Link to="login">Sign in</Link>;

    return (
      <div>
        <ul>
          <li>{loginOrOut}</li>
          <li><Link to="dashboard">Dashboard</Link> (authenticated)</li>
        </ul>
        <RouteHandler/>
      </div>
    );
  }

});

module.exports = App;
