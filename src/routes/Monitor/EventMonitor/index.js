import {dynamicWrapper, createRoute} from '@/utils/core';

const routesConfig = app => ({
    path: '/monitor/eventMonitor',
    component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default (app) => createRoute(app, routesConfig);
