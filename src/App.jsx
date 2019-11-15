import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from 'pages/Dashboard/Dashboard';
import Error from 'pages/Error';
import Login from 'pages/Login/Login';
import Test from 'pages/Test/Test';

// const RouteAuth = (exact, path, component) => {
//   if ()
// }

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/test" component={Test} />
      <Route render={() => <Error code={404} />} />
    </Switch>
  );
};

export default App;
