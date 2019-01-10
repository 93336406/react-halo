/**
 * Created by esong on 2018/12/19.
 */
import React, {Suspense, Fragment} from 'react';
import {connect} from 'dva';
import {Layout, message} from 'antd';
import {Switch, routerRedux} from 'dva/router';
import DocumentTitle from 'react-document-title';
import intl from 'react-intl-universal';
import {LeftSideBar} from 'components/SideBar';
import NavBar from 'components/NavBar';
import PageLoading from 'components/Loading';
import pathToRegexp from 'path-to-regexp';
import {enquireIsMobile} from '@/utils/enquireScreen';
import TabsLayout from './TabsLayout';
import './styles/basic.less';
import $$ from 'cmn-utils';
import cx from 'classnames';
import config from '@/config';

const {Content, Header} = Layout;
@connect(({global}) => ({global}))
export default class CruxLayout extends React.PureComponent {
    constructor(props) {
        super(props);
        this.defaultTheme = {
            primarySkin: {key: "darkgrey", color: "#30363e"},
            tabLayout: false
        };
        const user = $$.getStore('user', []);
        const theme = $$.getStore('crux-theme', this.defaultTheme);
        this.state = {
            collapsedLeftSide: false,
            leftCollapsedWidth: 60,
            theme,
            user,
            flatMenu: [],
            currentMenu: {},
            isMobile: false
        };
        const loading = message.loading(intl.get("loading"), 0);
        props.dispatch({
            type: 'global/getMenu',
            loading: loading
        });
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.location.pathname !== this.props.location.pathname ||
            nextProps.global.flatMenu !== this.props.global.flatMenu
        ) {
            var menu = this.getCurrentMenu(nextProps);
            if (menu) {
                this.setState({
                    currentMenu: menu
                });
            }
        }
    }

    getCurrentMenu(props) {
        const {
            location: {pathname},
            global
        } = props || this.props;
        const menu = this.getMeunMatchKeys(global.flatMenu, pathname)[0];
        return menu;
    }

    componentDidMount() {
        this.unregisterEnquire = enquireIsMobile(ismobile => {
            const {isMobile} = this.state;
            if (isMobile !== ismobile) {
                this.setState({
                    isMobile: ismobile
                });
            }
        });
        // 检查有户是否登录
        const user = $$.getStore('user');
        if (!user) {
            this.props.dispatch(routerRedux.replace('/sign/login'));
        } else {
            this.setState({menu: this.props.global.menu});
        }
    }

    getMeunMatchKeys = (flatMenu, path) => {
        return flatMenu.filter(item => {
            return pathToRegexp(item.path).test(path);
        });
    };

    componentWillUnmount() {
        // 清理监听
        this.unregisterEnquire();
    }

    /**
     * 顶部左侧菜单图标收缩控制
     */
    onCollapseLeftSide = () => {
        const collapsedLeftSide =
            this.state.leftCollapsedWidth === 0
                ? true
                : !this.state.collapsedLeftSide;
        this.setState({
            collapsedLeftSide,
            leftCollapsedWidth: 60
        });
    };

    /**
     * 完全关闭左边栏，即宽为0
     */
    onCollapseLeftSideAll = () => {
        this.setState({
            collapsedLeftSide: true,
            leftCollapsedWidth: 0
        });
    };

    onChangeTheme = theme => {
        theme = theme || this.defaultTheme;
        $$.setStore('crux-theme', theme);
        this.setState({
            theme
        });
    };

    render() {
        const {
            collapsedLeftSide,
            leftCollapsedWidth,
            theme,
            user,
            currentMenu,
            isMobile
        } = this.state;
        const {routerData, location, global} = this.props;
        const {childRoutes} = routerData;
        const {menu, flatMenu} = global;
        const layout = (
            <Layout className={cx('basic-layout', 'full-layout', 'fixed')}>
                <Layout>
                    <LeftSideBar
                        collapsed={collapsedLeftSide}
                        leftCollapsedWidth={leftCollapsedWidth}
                        onCollapse={this.onCollapseLeftSide}
                        onCollapseAll={this.onCollapseLeftSideAll}
                        location={location}
                        theme={theme.primarySkin.key}
                        flatMenu={flatMenu}
                        menu={menu}
                        currentMenu={currentMenu}
                        isMobile={isMobile}
                    />
                    <Content>
                        {theme.tabLayout ? (
                            <TabsLayout
                                childRoutes={childRoutes}
                                location={location}
                                collapsed={collapsedLeftSide}
                                onCollapseLeftSide={this.onCollapseLeftSide}
                                onChangeTheme={this.onChangeTheme}
                                flatMenu={flatMenu}
                                theme={theme}
                                user={user}
                            />
                        ) : (
                            <Fragment>
                                <Header className="fixed-header">
                                    <NavBar
                                        collapsed={collapsedLeftSide}
                                        onCollapseLeftSide={this.onCollapseLeftSide}
                                        onChangeTheme={this.onChangeTheme}
                                        theme={theme}
                                        user={user}
                                        currentMenu={currentMenu}
                                        isMobile={isMobile}
                                    />
                                </Header>
                                < Content className="router-page">
                                    <Switch>{childRoutes}</Switch>
                                </Content>
                            </Fragment>
                        )}
                    </Content>
                </Layout>
            </Layout>
        );
        return (
            <React.Fragment>
                <DocumentTitle title={config.htmlTitle}>
                    {layout}
                </DocumentTitle>
                <Suspense fallback={<PageLoading/>}/>
            </React.Fragment>
        );
    }
};