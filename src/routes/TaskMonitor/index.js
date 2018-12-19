import {dynamicWrapper, createRoute} from '@/utils/core';

const routesConfig = app => ({
    path: '/taskMonitor',
    title: '任务监控',
    component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default (app) => createRoute(app, routesConfig);
