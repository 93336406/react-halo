import React, {PureComponent} from 'react';
import Icon from '../Icon';
import intl from 'react-intl-universal';
import {Breadcrumb} from 'antd';
import SelectLang from '../SelectLang';
import SkinToolbox from '../SkinToolbox';
import GlobalAvatarUser from '../GlobalAvatarUser';
import {Link} from 'dva/router';
import cx from 'classnames';
import './style/index.less';

/**
 * 其本本局头部区域
 */
class NavBar extends PureComponent {

    render() {
        const {
            theme,
            onCollapseLeftSide,
            onChangeTheme,
            collapsed,
            user,
            currentMenu,
            isMobile
        } = this.props;
        const classnames = cx('navbar', {
            'navbar-sm': isMobile ? true : collapsed
        }, theme.primarySkin.key);
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
                            {currentMenu.key ? intl.get(currentMenu.key) : ""}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <ul className="nav navbar-nav navbar-right clearfix">
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
            </header>
        );
    }
}

export default NavBar;
