import React, {PureComponent} from 'react';
import Icon from '../Icon';
import {Menu, Dropdown, Badge, Avatar, Breadcrumb} from 'antd';
import {Link, withRouter} from 'dva/router';
import cx from 'classnames';
import './style/index.less';

const {Item, Divider} = Menu;

/**
 * 其本本局头部区域
 */
class NavBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getRouteLevel = pathName => {
        const orderPaths = [];
        pathName.split('/').reduce((prev, next) => {
            const path = [prev, next].join('/');
            orderPaths.push(path);
            return path;
        });

        return orderPaths
            .map(item => window.dva_router_pathMap[item])
            .filter(item => !!item);
    };

    render() {
        const {
            theme,
            onCollapseLeftSide,
            collapsed,
            user,
            currentMenu,
            isMobile
        } = this.props;
        const classnames = cx('navbar', {
            'navbar-sm': isMobile ? true : collapsed,
            ['bg-' + theme]: !!theme
        });

        return (
            <header className={classnames}>
                <div className="navbar-branding">
                  <span className="toggle_sidemenu_l" onClick={onCollapseLeftSide}>
                    <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} antd/>
                  </span>
                </div>
                <div className="nav navbar-nav navbar-left clearfix">
                    <Breadcrumb>
                        <Breadcrumb.Item className="first">
                            费用管理
                        </Breadcrumb.Item>
                        <Breadcrumb.Item className="icon">
                            <Icon type="home"/>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {currentMenu.name}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <ul className="nav navbar-nav navbar-right clearfix">
                    <li className="dropdown">
                        <Dropdown
                            overlay={userMenu}
                            trigger={["click"]}
                        >
                            <a className="dropdown-toggle">
                                <Badge dot>
                                    <Avatar icon="user" size="small">
                                        {user.userName}
                                    </Avatar>
                                </Badge>
                                <span className={cx('account-name')}>{user.userName}</span>
                            </a>
                        </Dropdown>
                    </li>
                    <li>
                        <a className="navbar-btn">
                            <Icon type="global" antd/>
                        </a>
                    </li>
                </ul>
            </header>
        );
    }
}

const userMenu = (
    <Menu className={cx('account-menu')} selectedKeys={[]}>
        <Item key="userCenter">
            <a className="animated animated-short">
                <Icon type="mail"/> 信息
                <Badge count={5} className="label"/>
            </a>
        </Item>
        <Item key="userinfo">
            <a className="animated animated-short">
                <Icon type="gear"/> 个人设置
            </a>
        </Item>
        <Item key="triggerError">
            <a className="animated animated-short">
                <Icon type="ring"/> 通知
            </a>
        </Item>
        <Divider/>
        <Item key="logout">
            <Link to="/sign/login">
                <Icon type="poweroff"/> 退出工作区
            </Link>
        </Item>
    </Menu>
);

export default withRouter(NavBar);
