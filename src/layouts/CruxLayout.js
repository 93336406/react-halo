/**
 * Created by esong on 2018/12/19.
 */
import React from 'react';
import {connect} from 'dva';
import {Layout} from 'antd';
import {Switch, routerRedux} from 'dva/router';
import {LeftSideBar} from 'components/SideBar';
import NavBar from 'components/NavBar';
import pathToRegexp from 'path-to-regexp';
import {enquireIsMobile} from '@/utils/enquireScreen';
import './styles/basic.less';
import $$ from 'cmn-utils';
import cx from 'classnames';

const {Content, Header} = Layout;
@connect(({global}) => ({global}))
export default class CruxLayout extends React.PureComponent {
    constructor(props) {
        super(props);
        const user = $$.getStore('user', []);
        const theme = $$.getStore('theme', {
            leftSide: 'darkgrey', // 左边
            navbar: 'light' // 顶部
        });
        if (!theme.layout) {
            theme.layout = [];
        }
        this.state = {
            collapsedLeftSide: false,
            leftCollapsedWidth: 60,
            theme,
            user,
            currentMenu: {},
            isMobile: false
        };

        props.dispatch({
            type: 'global/getMenu'
        });
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
    }

    componentWillMount() {
        // 检查有户是否登录
        const user = $$.getStore('user');
        if (!user) {
            this.props.dispatch(routerRedux.replace('/sign/login'));
        } else {

        }
    }

    componentWillUnmount() {
        // 清理监听
        this.unregisterEnquire();
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.location.pathname !== this.props.location.pathname ||
            nextProps.global.flatMenu !== this.props.global.flatMenu
        ) {
            this.setState({
                currentMenu: this.getCurrentMenu(nextProps) || {}
            });
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

    getMeunMatchKeys = (flatMenu, path) => {
        return flatMenu.filter(item => {
            return pathToRegexp(item.path).test(path);
        });
    };

    /**
     * 顶部左侧菜单图标收缩控制
     */
    onCollapseLeftSide = _ => {
        const collapsedLeftSide =
            this.state.leftCollapsedWidth === 0
                ? true
                : !this.state.collapsedLeftSide;
        const collapsedRightSide =
            this.state.collapsedRightSide || !collapsedLeftSide;

        this.setState({
            collapsedLeftSide,
            collapsedRightSide,
            leftCollapsedWidth: 60
        });
    };

    /**
     * 完全关闭左边栏，即宽为0
     */
    onCollapseLeftSideAll = _ => {
        this.setState({
            collapsedLeftSide: true,
            leftCollapsedWidth: 0
        });
    };

    /**
     * 展开面包屑所在条中的多功能区
     */
    onExpandTopBar = _ => {
        this.setState({
            expandTopBar: true
        });
    };

    onChangeTheme = theme => {
        $$.setStore('theme', theme);
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
        const {menu, flatMenu} = global;
        const {childRoutes} = routerData;
        const classnames = cx('basic-layout', 'full-layout', 'fixed');
        return (
            <Layout className={classnames}>
                <Layout>
                    <LeftSideBar
                        collapsed={collapsedLeftSide}
                        leftCollapsedWidth={leftCollapsedWidth}
                        onCollapse={this.onCollapseLeftSide}
                        onCollapseAll={this.onCollapseLeftSideAll}
                        location={location}
                        theme={theme.leftSide}
                        flatMenu={flatMenu}
                        currentMenu={currentMenu}
                        menu={menu}
                        isMobile={isMobile}
                    />
                    <Content>
                        <Header className="fixed-header">
                            <NavBar
                                collapsed={collapsedLeftSide}
                                onCollapseLeftSide={this.onCollapseLeftSide}
                                onExpandTopBar={this.onExpandTopBar}
                                toggleSidebarHeader={this.toggleSidebarHeader}
                                theme={theme.navbar}
                                user={user}
                                isMobile={isMobile}
                            />
                        </Header>
                        <Content className="router-page">
                            <Switch>{childRoutes}</Switch>
                        </Content>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}