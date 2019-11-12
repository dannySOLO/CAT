import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from 'pages/Dashboard/Dashboard';
import Error from 'pages/Error';

const App = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route render={() => <Error code={404} />} />
  </Switch>
);

export default App;
