import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

import Error from 'pages/Error';

const loading = () => {
  return <div>Loading...</div>;
};

const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Login = lazy(() => import('./pages/Login/Login'));
const Test = lazy(() => import('./pages/Test/Test'));
const Result = lazy(() => import('./pages/Result/Result'));

const RouteAuth = ({ ...props }) => {
  if (Cookies.get('authToken')) {
    return <Route {...props} />;
  }

  return <Route component={Login} />;
};

const RouteLogin = ({ ...props }) => {
  if (!Cookies.get('authToken')) {
    return <Route {...props} />;
  }

  return <Route component={Dashboard} />;
};

const App = () => {
  return (
    <Suspense fallback={loading}>
      <Switch>
        <RouteLogin exact path="/login" component={Login} />
        <RouteAuth exact path="/" component={Dashboard} />
        <RouteAuth exact path="/test" component={Test} />
        <RouteAuth exact path="/result" component={Result} />

        <Route render={() => <Error code={404} />} />
      </Switch>
    </Suspense>
  );
};

export default App;
