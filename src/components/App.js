import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Redirect, Route } from 'react-router-dom';

import { getNotificationSelector } from '../redux/notifications/notificationSelector';

import Layout from './Layout/Layout';
import Loader from '../components/Loader/Loader';
import Notification from '../components/Notification/Notification';

import routes from '../utils/routes';
function App() {
  const notification = useSelector(getNotificationSelector);

  console.log(notification);
  return (
    <Suspense fallback={<Loader />}>
      <Layout>
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Redirect to="/home" />
        </Switch>
      </Layout>
      {notification &&
        notification.map((item) => {
          return (
            <Notification
              key={item.type}
              type={item.type}
              message={item.message}
            />
          );
        })}
    </Suspense>
  );
}

export default App;
