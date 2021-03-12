import React, { Suspense } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';


import Layout from './Layout/Layout';
import Loader from '../components/Loader/Loader';

import routes from '../utils/routes';
function App() {


  return (
    <Suspense fallback={<Loader />}>
      <Layout >
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Redirect to="/home" />
        </Switch>
      </Layout>
    </Suspense>
  );
}

export default App;
