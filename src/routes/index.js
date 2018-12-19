import {createRoutes} from '@/utils/core';
import CruxLayout from '@/layouts/CruxLayout';
import UserLayout from '@/layouts/UserLayout';
import Login from './Login';
import Blank from './Blank';
import Dashboard from './Dashboard';
import EventMonitor from './EventMonitor';
import TaskMonitor from './TaskMonitor';
import NotFound from './Pages/404';
const routesConfig = (app) => ([
    {
        path: '/sign',
        title: '登录',
        indexRoute: '/sign/login',
        component: UserLayout,
        childRoutes: [
            Login(app),
            NotFound()  // 这个要放到最下面，当所有路由当没匹配到时会进入这个页面
        ]
    }, {
        path: '/',
        title: '系统中心',
        component: CruxLayout,
        indexRoute: '/dashboard',
        childRoutes: [
            Dashboard(app),
            TaskMonitor(app),
            EventMonitor(app),
            Blank(app),
            NotFound() // 这个要放到最下面，当所有路由当没匹配到时会进入这个页面
        ]
    }
]);

export default app => createRoutes(app, routesConfig);