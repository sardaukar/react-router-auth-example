var React = require('react'),
    Router = require('react-router'),
    { Route, RouteHandler, Link } = Router,
    App = require('./components/app'),
    Login = require('./components/login'),
    Logout = require('./components/logout'),
    Dashboard = require('./components/dashboard');

var routes = (
  <Route handler={App}>
    <Route name="login" handler={Login}/>
    <Route name="logout" handler={Logout}/>
    <Route name="dashboard" handler={Dashboard}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});