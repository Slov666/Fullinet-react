import { lazy } from 'react';
// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/home',
    label: 'home',
    component: lazy(() =>
      import('../views/HomeView/HomeView' /*webpackChunkName: "home" */)
    ),
  },
  {
    path: '/services',
    label: 'services',
    component: lazy(() =>
      import(
        '../views/ServicesView/ServicesView.js' /*webpackChunkName: "services" */
      )
    ),
  },
];
