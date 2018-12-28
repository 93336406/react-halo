import React, {PureComponent} from 'react';
import intl from 'react-intl-universal';
import {Avatar, Icon, Menu, Badge} from 'antd';
import {Link} from 'dva/router';
import cx from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import './index.less';

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
export default class GlobalAvatarUser extends PureComponent {
    state = {
        visible: false,
    };
    handleVisibleChange = visible => {
        this.setState({visible});
    };
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
        const {visible} = this.state;
        const {user} = this.props;
        return (
            <HeaderDropdown overlay={this.getMenuItem(userMenuData)} onVisibleChange={this.handleVisibleChange}>
                <span className={cx("dropDown", {opened: visible})}>
                    <Badge dot>
                        <Avatar icon="user" size="small">
                            {user.userName}
                        </Avatar>
                    </Badge>
                    <span className={cx('account-name')}>{user.userName}</span>
                </span>
            </HeaderDropdown>
        );
    }
}
