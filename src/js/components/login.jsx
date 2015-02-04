var React = require('react'),
    Router = require('react-router'),
    { Route, RouteHandler, Link } = Router,
    auth = require('../services/auth'),
    RedirectWhenLoggedIn = require('../mixins/redirect_when_logged_in');

var Login = React.createClass({

  mixins: [ Router.Navigation, RedirectWhenLoggedIn ],

  statics: {
    attemptedTransition: null
  },

  getInitialState: function () {
    return {
      error: false
    };
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var email = this.refs.email.getDOMNode().value;
    var pass = this.refs.pass.getDOMNode().value;
    auth.login(email, pass, function (loggedIn) {
      if (!loggedIn)
        return this.setState({ error: true });
      if (Login.attemptedTransition) {
        var transition = Login.attemptedTransition;
        Login.attemptedTransition = null;
        transition.retry();
      } else {
        this.replaceWith('/dashboard'); // jump after login
      }
    }.bind(this));
  },

  render: function () {
    var errors = this.state.error ? <p>Bad login information</p> : '';
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input ref="email" placeholder="email" defaultValue="joe@example.com"/>
        </label>
        <label>
          <input ref="pass" placeholder="password"/>
        </label> (hint: password1)
        <br/>
        <button type="submit">login</button>
        {errors}
      </form>
    );
  }
});

module.exports = Login;