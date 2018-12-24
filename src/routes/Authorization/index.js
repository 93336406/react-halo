import { dynamicWrapper, createRoute } from '@/utils/core';
import SubRoute from './routes/SubRoute';

const routesConfig = (app) => ({
  path: '/authorization',
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  childRoutes: [
    SubRoute(app),
  ]
});

export default (app) => createRoute(app, routesConfig);
