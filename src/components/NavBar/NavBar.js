import React, {PureComponent} from 'react';
import Icon from '../Icon';
import intl from 'react-intl-universal';
import {Menu, Dropdown, Badge, Avatar, Breadcrumb} from 'antd';
import SelectLang from '../SelectLang';
import {Link} from 'dva/router';
import cx from 'classnames';
import './style/index.less';

const {Item, Divider} = Menu;
const userMenuData = [{
    icon: "mail",
    title: "mail",
    key: "mail"
}, {
    icon: "gear",
    key: "setting",
    title: "setting"
}, {
    icon: "ring",
    key: "notice",
    title: "notice"
}, "-", {
    icon: "poweroff",
    key: "signOut",
    path: "/sign/login",
    title: "signOut"
}];

/**
 * 其本本局头部区域
 */
class NavBar extends PureComponent {
    getMenuItem = (menus) => {
        return (
            <Menu className={cx('account-menu')} selectedKeys={[]}>
                {
                    menus.map((m, idx) => {
                        if (typeof m === "string") {
                            return (<Divider key={"um_" + idx}/>)
                        } else {
                            if (m.path) {
                                return (<Item key={"um_" + idx}>
                                    <Link to={m.path}>
                                        <Icon type={m.icon}/> {intl.get(m.key)}
                                    </Link>
                                </Item>)
                            } else {
                                return (<Item key={"um_" + idx}>
                                    <a className="animated animated-short">
                                        <Icon type={m.icon}/> {intl.get(m.key)}
                                    </a>
                                </Item>)
                            }
                        }

                    })
                }
            </Menu>
        );
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
                            {intl.get("expense")}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item className="icon">
                            <Icon type="home"/>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/">{intl.get("home")}</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {currentMenu.name ? intl.get(currentMenu.key) : ""}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <ul className="nav navbar-nav navbar-right clearfix">
                    <li className="dropdown">
                        <Dropdown
                            overlay={this.getMenuItem(userMenuData)}
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
                        <SelectLang/>
                    </li>
                </ul>
            </header>
        );
    }
}

export default NavBar;
