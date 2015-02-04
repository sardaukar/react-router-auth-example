var React = require('react'),
    Router = require('react-router'),
    { Route, RouteHandler, Link, DefaultRoute } = Router,
    App = require('./components/app'),
    Home = require('./components/home'),
    Login = require('./components/login'),
    Logout = require('./components/logout'),
    Dashboard = require('./components/dashboard');

var routes = (
  <Route handler={App} path='/'>
    <Route name="login" handler={Login}/>
    <Route name="logout" handler={Logout}/>
    <Route name="dashboard" handler={Dashboard}/>
    <DefaultRoute handler={Home}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});