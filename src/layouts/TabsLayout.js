import './styles/tabs.less';
import React from 'react';
import {Layout, Tabs} from 'antd';
import intl from 'react-intl-universal';
import Icon from 'components/Icon';
import {Redirect} from 'dva/router';
import BaseComponent from 'components/BaseComponent';
import {Switch, Route} from 'dva/router';
import SelectLang from 'components/SelectLang';
import SkinToolbox from 'components/SkinToolbox';
import GlobalAvatarUser from 'components/GlobalAvatarUser';
import TabAction from './TabAction';
import NotFound from 'components/Pages/404';
import cx from 'classnames';

const {Content} = Layout;
const TabPane = Tabs.TabPane;


export default class TabsLayout extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            activeKey: '',
            panes: [],
            needUpdate: true,
            currTabCanClose: false,
            noMatch: false
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.flatMenu && nextProps.flatMenu instanceof Array && nextProps.flatMenu.length > 0) {
            const pathname = nextProps.location.pathname;
            if (pathname !== prevState.activeKey) {
                let noMatch;
                let newPanes = [], currTabCanClose = false;
                const menus = nextProps.flatMenu.filter(menu => menu.path === pathname);
                const existPane = prevState.panes.some(item => item.key === pathname);
                if (!existPane) {
                    const nextPanes = nextProps.childRoutes.filter(item => item.key === pathname);
                    noMatch = !nextPanes.length;
                    if (menus.length === 1 && nextPanes.length === 1) {
                        var defaultPane = Object.assign({closable: !menus[0].isHome}, nextPanes[0]);
                        defaultPane.title = intl.get(menus[0].key);
                    }
                    newPanes = prevState.panes.concat([defaultPane]);
                } else {
                    newPanes = prevState.panes;
                    noMatch = false;
                }
                if (menus.length === 1) {
                    currTabCanClose = !menus[0].isHome;
                }
                return {
                    panes: newPanes,
                    currTabCanClose,
                    activeKey: pathname,
                    noMatch
                };
            }
        }
        return null;
    }

    onChange = activeKey => {
        this.history.push(activeKey);
    };

    onRemove = targetKey => {
        let {activeKey, panes} = this.state;
        let lastIndex, currTabCanClose = false;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && activeKey === targetKey) {
            activeKey = lastIndex >= 0 ? newPanes[lastIndex].key : newPanes[0].key;
            const menus = this.props.flatMenu.filter(menu => menu.path === activeKey);
            if (menus.length === 1) {
                currTabCanClose = !menus[0].isHome;
            }
        }
        this.setState({panes: newPanes,needUpdate:false, activeKey, currTabCanClose},() => {
            if (activeKey !== targetKey) this.onChange(activeKey);
        });
    };

    onRemoveOther = (activeKey, panes) => {
        const newPanes = panes.filter(pane => pane.key === activeKey || !pane.closable);
        this.setState({panes: newPanes});
    };

    onRemoveAll = (activeKey, panes) => {
        const newPanes = panes.filter(pane => !pane.closable);
        this.setState({
            panes: newPanes,
            activeKey: newPanes.length ? newPanes[0].key : ""
        });
    };

    onTabsActions = ({key}) => {
        const {activeKey, panes} = this.state;
        switch (key) {
            case 'close':
                this.onRemove(activeKey);
                break;
            case 'closeother':
                this.onRemoveOther(activeKey, panes);
                break;
            case 'closeall':
                this.onRemoveAll(activeKey, panes);
                break;
            default:
                break;
        }
    };

    render() {
        const {
            theme,
            onCollapseLeftSide,
            onChangeTheme,
            collapsed,
            location,
            user,
        } = this.props;
        const {panes, activeKey, noMatch, currTabCanClose} = this.state;
        const className = cx("full-layout", "tabs-layout", theme.primarySkin.key);
        return (
            <Layout className={className}>
                <Content>
                    <Switch>
                        {noMatch ? (
                            <Route component={NotFound}/>
                        ) : (
                            <Tabs
                                hideAdd
                                type="editable-card"
                                className="layout-tabs-content"
                                tabBarExtraContent={
                                    <React.Fragment>
                                        <ul className="collapse-left">
                                            <div className="navbar-branding">
                                              <span className="toggle_sidemenu_l" onClick={onCollapseLeftSide}>
                                                <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} antd/>
                                              </span>
                                            </div>
                                        </ul>
                                        <ul className="nav-tool-box">
                                            <li>
                                                <TabAction
                                                    currTabCanClose={currTabCanClose}
                                                    onTabsActions={this.onTabsActions}
                                                />
                                            </li>
                                            <li>
                                                <SkinToolbox onChangeTheme={onChangeTheme} theme={theme}/>
                                            </li>
                                            <li>
                                                <GlobalAvatarUser theme={theme} user={user}/>
                                            </li>
                                            <li>
                                                <SelectLang/>
                                            </li>
                                        </ul>
                                    </React.Fragment>
                                }
                                onEdit={this.onRemove}
                                onChange={this.onChange}
                                activeKey={activeKey}
                            >
                                {panes.map(item => (
                                    <TabPane tab={item.title} closable={item.closable} key={item.key}>
                                        {item}
                                    </TabPane>
                                ))}
                            </Tabs>
                        )}
                    </Switch>
                </Content>
            </Layout>
        );
    }
}
