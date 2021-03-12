import { lazy } from 'react';
// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/tariffs',
    label: 'tariffs',
    component: lazy(() =>
      import(
        '../views/TariffsView/TariffsView' /*webpackChunkName: "tariffs" */
      )
    ),
  },
  {
    path: '/tariff/',
    label: 'tariff',
    component: lazy(() =>
      import('../views/TariffView/TariffView' /*webpackChunkName: "tariff" */)
    ),
  },
  {
    path: '/home',
    label: 'home',
    component: lazy(() =>
      import('../views/HomeView/HomeView' /*webpackChunkName: "home" */)
    ),
  },
  {
    path: '/connect',
    label: 'connect',
    component: lazy(() =>
      import(
        '../views/ConnectView/ConnectView' /*webpackChunkName: "connect" */
      )
    ),
  },
  {
    path: '/license',
    label: 'license',
    component: lazy(() =>
      import(
        '../views/LicenseView/LicenseView' /*webpackChunkName: "license" */
      )
    ),
  },
  {
    path: '/contacts',
    label: 'contacts',
    component: lazy(() =>
      import(
        '../views/ContactsView/ContactsView' /*webpackChunkName: "contacts" */
      )
    ),
  },
];
