import {dynamicWrapper, createRoute} from '@/utils/core';

const routesConfig = app => ({
    path: '/eventMonitor',
    title: '事件监控',
    component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default (app) => createRoute(app, routesConfig);
