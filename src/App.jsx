import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Error from 'pages/Error';

// const RouteAuth = (exact, path, component) => {
//   if ()
// }

const loading = () => {
  return <div>Loading...</div>;
};

const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Login = lazy(() => import('./pages/Login/Login'));
const Test = lazy(() => import('./pages/Test/Test'));
const Result = lazy(() => import('./pages/Result/Result'));

const App = () => {
  return (
    <Suspense fallback={loading}>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/result" component={Result} />
        <Route render={() => <Error code={404} />} />
      </Switch>
    </Suspense>
  );
};

export default App;
