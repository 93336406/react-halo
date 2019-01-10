import React from 'react';
import intl from 'react-intl-universal';
import dva from 'dva';
import dynamic from 'dva/dynamic';
import createLoading from 'dva-loading';
import {Router} from 'dva/router';
import createHistory from 'history/createHashHistory';
import request from 'cmn-utils/lib/request';
import createRoutes from '@/routes';
import 'assets/styles/index.less';
import config from './config';
import {LocaleProvider} from 'antd';
import {baseURL} from '../package.json';

const defaultAntd = require('antd/lib/locale-provider/zh_CN');

const localeInfo = {
    'en-US': {
        locale: 'en-US',
        antd: require('antd/lib/locale-provider/en_US')
    },
    'zh-CN': {
        locale: 'zh-CN',
        antd: require('antd/lib/locale-provider/zh_CN'),
        momentLocale: 'zh-cn',
    }
};

let appLocale = {
    locale: 'zh-CN',
    momentLocale: 'zh-cn',
};
if (localStorage.getItem('crux_local') && localeInfo[localStorage.getItem('crux_local')]) {
    appLocale = localeInfo[localStorage.getItem('crux_local')];
} else if (localeInfo[navigator.language]) {
    appLocale = localeInfo[navigator.language];
} else {
    appLocale = localeInfo['zh-CN'] || appLocale;
}
intl.init({
    currentLocale: appLocale.locale,
    locales: {
        [appLocale.locale]: require(`./locales/${appLocale.locale}`)
    }
});
// -> 初始化
const app = dva({
    history: createHistory({
        basename: baseURL
    })
});

// -> 插件
app.use(createLoading());
app.use({onError: config.exception.global});

// -> 请求
request.config(config.request);

// 使用mock数据
// -> Developer mock data
require('./__mocks');
// if (process.env.NODE_ENV === 'development') {
//     require('./__mocks');
// }

// -> loading
dynamic.setDefaultLoadingComponent(() => config.router.loading);

// -> 注册全局模型
app.model(require('./models/global').default);

// -> 初始化路由
app.router(({history, app}) => (
    <LocaleProvider locale={appLocale.antd || defaultAntd}>
        <Router history={history}>{createRoutes(app)}</Router>
    </LocaleProvider>
));

// -> Start
app.start('#app');
// export global
export default {
    app,
    store: app._store,
    dispatch: app._store.dispatch
};
